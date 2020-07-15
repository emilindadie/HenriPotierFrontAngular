import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddCardDialogComponent } from './components/add-card-dialog/add-card-dialog.component';
import { IProfilState } from '../global-profil-ngrx/states/profil.state.i';
import { Store, select } from '@ngrx/store';
import { ISaveCard } from '../global-profil-ngrx/models/card-save.model.i';
import * as moment from 'moment';
import { ICard } from '../global-profil-ngrx/models/card.model.i';
import { Observable, Subject } from 'rxjs';
import {
  cardsSelector,
  selectedCardSelector,
  successSaveCardSelector,
  successUpdateSelectedCardSelector,
} from '../global-profil-ngrx/selectors/profil.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss'],
})
export class ProfilComponent implements OnInit, OnDestroy {
  notifier = new Subject();
  cards$: Observable<ICard[]> = new Observable();
  selectedCard$: Observable<ICard> = new Observable();
  selectedCard: ICard = null;
  constructor(
    public dialog: MatDialog,
    private store: Store<IProfilState>,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.cards$ = this.store.pipe(select(cardsSelector));
    this.selectedCard$ = this.store.pipe(
      select(selectedCardSelector),
      tap(card => (this.selectedCard = card)),
    );

    this.store
      .pipe(
        select(successSaveCardSelector),
        tap(success => {
          if (success) {
            this.snackBar.open('Card successfully added:)', '', {
              duration: 2000,
            });
            this.store.dispatch({ type: 'INIT_ACTION_STATE' });
          }
        }, takeUntil(this.notifier)),
      )
      .subscribe();

    this.store
      .pipe(
        select(successUpdateSelectedCardSelector),
        tap(success => {
          if (success) {
            this.snackBar.open('Selected card changed', '', {
              duration: 2000,
            });
            this.store.dispatch({ type: 'INIT_ACTION_STATE' });
          }
        }, takeUntil(this.notifier)),
      )
      .subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddCardDialogComponent, {
      width: '40%',
      data: { cards$: this.cards$ },
    });

    dialogRef.afterClosed().subscribe((data: ISaveCard) => {
      if (data) {
        this.store.dispatch({
          type: 'SAVE_SECURE_CARD',
          payload: {
            saveCard: {
              cardNumber: data.number,
              cryptogramme: data.cryptogramme,
              expiration: moment(data.expiration)
                .date(1)
                .hours(0)
                .minutes(0)
                .seconds(0)
                .milliseconds(0)
                .valueOf(),
            },
          },
        });
      }
    });
  }

  updateSelectedCard(card: ICard) {
    if (this.selectedCard !== card) {
      this.store.dispatch({
        type: 'UPDATE_SELECTED_CARD',
        payload: { selectedCardId: card.id },
      });
    }
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
