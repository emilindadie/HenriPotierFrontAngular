import { Component, OnInit, Inject, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProfilComponent } from '../../profil.component';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';
import { Observable, Subject } from 'rxjs';
import { ICard } from 'src/app/modules/global-profil-ngrx/models/card.model.i';
import { tap, takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

const moment = _moment;

// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  selector: 'app-add-card-dialog',
  templateUrl: './add-card-dialog.component.html',
  styleUrls: ['./add-card-dialog.component.scss'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class AddCardDialogComponent implements OnInit, OnDestroy {
  form: FormGroup;
  @ViewChild(MatDatepicker) picker;
  cards$: Observable<ICard[]> = new Observable();
  notifier = new Subject();

  constructor(
    public dialogRef: MatDialogRef<ProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
  ) {
    this.cards$ = data.cards$;
    this.form = new FormGroup({
      number: new FormControl('', [
        Validators.required,
        Validators.min(100000000),
        Validators.max(999999999),
      ]),
      expiration: new FormControl(moment()),
      cryptogramme: new FormControl('', [
        Validators.required,
        Validators.min(100),
        Validators.max(999),
      ]),
    });
  }

  ngOnInit(): void {}

  confirmDialog(value: any) {
    this.cards$
      .pipe(
        tap(
          cards => {
            const card = cards.find(cardP => cardP.cardNumber === value.number);
            if (card) {
              this.snackBar.open('Card number already registered', '', {
                duration: 2000,
              });
            } else {
              this.dialogRef.close(value);
            }
          },
        ),
        takeUntil(this.notifier),
      )
      .subscribe();
  }

  cancelDialog() {
    this.dialogRef.close(null);
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.form.get('expiration').value;
    ctrlValue.year(normalizedYear.year());
    this.form.get('expiration').setValue(ctrlValue);
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>,
  ) {
    const ctrlValue = this.form.get('expiration').value;
    ctrlValue.month(normalizedMonth.month());
    this.form.get('expiration').setValue(ctrlValue);
    datepicker.close();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
}
