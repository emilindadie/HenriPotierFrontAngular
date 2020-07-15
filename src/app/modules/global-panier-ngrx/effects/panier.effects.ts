import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { PanierService } from '../services/panier.service';
import { IPanierState } from '../states/panier.state.i';
import { Store } from '@ngrx/store';
import { ICommercialOffers } from '../models/commercial-offers.model.i';
import { panierContentSelector } from '../selectors/panier.selector';

@Injectable()
export class PanierEffect {
  constructor(
    private store$: Store<IPanierState>,
    private actions$: Actions,
    private panierService: PanierService,
  ) {}

  addArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType('ADD_ARTICLE'),
      withLatestFrom(this.store$.select(panierContentSelector)),
      mergeMap(([action, panier]) =>
        this.panierService.calculateCommercialOffers(panier).pipe(
          map((response: ICommercialOffers) => ({
            type: 'UPDATE_COMMERCIAL_OFFER',
            payload: {
              commercialOffer: this.calculBestCommercialOffers(response),
            },
          })),
          catchError(() => of({ type: 'FAILED_ADD_ARTICLE' })),
        ),
      ),
    ),
  );

  removeArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType('REMOVE_ARTICLE'),
      withLatestFrom(this.store$.select(panierContentSelector)),
      mergeMap(([action, panier]) =>
        this.panierService.calculateCommercialOffers(panier).pipe(
          map((response: ICommercialOffers) => ({
            type: 'UPDATE_COMMERCIAL_OFFER',
            payload: {
              commercialOffer: this.calculBestCommercialOffers(response),
            },
          })),
          catchError(() => of({ type: 'FAILED_REMOVE_ARTICLE' })),
        ),
      ),
    ),
  );

  applyArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType('UPDATE_COMMERCIAL_OFFER'),
      map(() => ({ type: 'APPLY_COMMERCIAL_OFFER' })),
    ),
  );

  private calculBestCommercialOffers(input: ICommercialOffers) {
    return Math.max.apply(
      Math,
      input.offers.map(offer => offer.value),
    );
  }
}
