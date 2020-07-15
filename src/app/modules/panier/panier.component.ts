import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  Observable,
  Subject,
  BehaviorSubject,
  Subscription,
} from 'rxjs';
import { IArticle } from '../shared/models/article.model.i';
import { IPanierState } from '../global-panier-ngrx/states/panier.state.i';
import { Store, select } from '@ngrx/store';
import {
  panierContentSelector,
  panierAmountSelector,
  panierAmountWithoutCommercialOfferSelector,
} from '../global-panier-ngrx/selectors/panier.selector';
import { IProfilState } from '../global-profil-ngrx/states/profil.state.i';
import { ICard } from '../global-profil-ngrx/models/card.model.i';
import {
  selectedCardSelector,
  successDoTransactionSelector,
  errorDoTransactionSelector,
} from '../global-profil-ngrx/selectors/profil.selector';
import { map, tap, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MediaObserver } from '@angular/flex-layout';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss'],
})
export class PanierComponent implements OnInit, OnDestroy {
  watcher: Subscription;
  articles$: Observable<IArticle[]> = new Observable();
  panierAmountWithReduction$: Observable<number> = new Observable();
  panierAmountWithoutReduction$: Observable<number> = new Observable();
  selectedCard$: Observable<ICard> = new Observable();
  notifier = new Subject();
  gridCols: BehaviorSubject<number> = new BehaviorSubject<number>(4);

  constructor(
    private panierStore: Store<IPanierState>,
    private cardStore: Store<IProfilState>,
    private snackBar: MatSnackBar,
    private mediaObserver: MediaObserver,
  ) {}

  ngOnInit(): void {
    this.mediaObserver.asObservable().pipe(
      tap(change => {
        if (change[0].mqAlias === 'xs') {
          this.gridCols.next(1);
        } else if (change[0].mqAlias === 'sm') {
          this.gridCols.next(2);
        } else if (change[0].mqAlias === 'md') {
          this.gridCols.next(3);
        } else {
          this.gridCols.next(4);
        }
      }),
      takeUntil(this.notifier),
    )
    .subscribe();

    this.articles$ = this.panierStore.pipe(select(panierContentSelector));
    this.selectedCard$ = this.cardStore.pipe(select(selectedCardSelector));
    this.panierAmountWithReduction$ = this.panierStore.pipe(
      select(panierAmountSelector),
    );
    this.panierAmountWithoutReduction$ = this.panierStore.pipe(
      select(panierAmountWithoutCommercialOfferSelector),
    );

    this.cardStore
      .pipe(
        select(successDoTransactionSelector),
        tap(success => {
          if (success) {
            this.snackBar.open(
              'Transaction done successfully',
              '',
              {
                duration: 2000,
              },
            );
            this.panierStore.dispatch({ type: 'REMOVE_ALL' });
            this.cardStore.dispatch({ type: 'INIT_ACTION_STATE' });
          }
        }),
        takeUntil(this.notifier),
      )
      .subscribe();

    this.cardStore
      .pipe(
        select(errorDoTransactionSelector),
        tap(success => {
          if (success) {
            this.snackBar.open(
              'Transaction failed, please contact your bank!',
              '',
              {
                duration: 2000,
              },
            );
            this.cardStore.dispatch({ type: 'INIT_ACTION_STATE' });
          }
        }),
        takeUntil(this.notifier),
      )
      .subscribe();
  }

  removeArticleIntoPanier(index: number) {
    this.panierStore.dispatch({
      type: 'REMOVE_ARTICLE',
      payload: { removeIndex: Number(index) },
    });
  }

  doTransaction() {
    this.panierAmountWithReduction$
      .pipe(
        map(amount =>
          this.cardStore.dispatch({
            type: 'DO_TRANSACTION',
            payload: { paymentAmount: Number(`-${amount}`) },
          }),
        ),
        takeUntil(this.notifier),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
