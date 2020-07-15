import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProfilService } from '../services/profil.service';
import { IBaseAction } from '../../shared/actions/base.action.i';
import { IProfilAction } from '../actions/profil.action';
import { SecureApiResponse } from '../../shared/models/secure-api.response.i';
import { ICard } from '../models/card.model.i';
import { Store } from '@ngrx/store';
import { IProfilState } from '../states/profil.state.i';
import { selectedCardSelector } from '../selectors/profil.selector';

@Injectable()
export class ProfilEffect {
  constructor(
    private actions$: Actions,
    private store$: Store<IProfilState>,
    private profilService: ProfilService,
  ) {}

  saveCard$ = createEffect(() =>
    this.actions$.pipe(
      ofType('SAVE_SECURE_CARD'),
      mergeMap((data: IBaseAction<IProfilAction>) =>
        this.profilService.saveCard(data.payload.saveCard).pipe(
          map((response: SecureApiResponse<ICard>) => ({
            type: 'SUCCESSFULLY_SAVE_SECURE_CARD',
            payload: {
              card: {
                cardNumber: response.data.cardNumber,
                cryptogramme: response.data.cryptogramme,
                expiration: response.data.expiration,
                id: response.data.id,
                solde: response.data.solde,
                uniqueToken: response.accessToken,
              } as ICard,
            },
          })),
          catchError(() => of({ type: 'FAILED_AVE_SECURE_CARD' })),
        ),
      ),
    ),
  );

  securePayment$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType('DO_TRANSACTION'),
        map((action: IBaseAction<IProfilAction>) => action),
      )
      .pipe(
        withLatestFrom(this.store$.select(selectedCardSelector)),
        mergeMap(([action, card]) =>
          this.profilService
            .paymentByCard(
              card.id,
              action.payload.paymentAmount,
              card.uniqueToken,
            )
            .pipe(
              map(
                (response: SecureApiResponse<ICard>) =>
                  response.data
                    ? {
                        type: 'SUCCESSFULLY_DO_TRANSACTION',
                      }
                    : {
                        type: 'FAILED_DO_TRANSACTION',
                      },
                catchError(() => of({ type: 'FAILED_DO_TRANSACTION' })),
              ),
              catchError(() => of({ type: 'FAILED_DO_TRANSACTION' })),
            ),
        ),
      ),
  );
}
