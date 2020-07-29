import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { PanierService } from '../services/panier.service';
import { IPanierState } from '../states/panier.state.i';
import { Store } from '@ngrx/store';
import { ICommercialOffers } from '../models/commercial-offers.model.i';
import { getPanierFeatureState } from '../selectors/panier.selector';

@Injectable()
export class PanierEffect {
  constructor(
    private store$: Store<IPanierState>,
    private actions$: Actions,
    private panierService: PanierService,
  ) { }

  addArticle$ = createEffect(() =>
    this.actions$.pipe(
      ofType('ADD_ARTICLE'),
      withLatestFrom(this.store$.select(getPanierFeatureState)),
      mergeMap(([action, panier]) =>
        this.panierService.calculateCommercialOffers(panier.panierContent).pipe(
          map((response: ICommercialOffers) => ({
            type: 'UPDATE_COMMERCIAL_OFFER',
            payload: {
              commercialOffer: this.calculBestCommercialOffers(panier.panierAmount + panier.commercialOffer, response),
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
      withLatestFrom(this.store$),
      mergeMap(([action, panier]) =>
        this.panierService.calculateCommercialOffers(panier.panierContent).pipe(
          map((response: ICommercialOffers) => ({
            type: 'UPDATE_COMMERCIAL_OFFER',
            payload: {
              commercialOffer: this.calculBestCommercialOffers(panier.panierAmount, response),
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

  public calculBestCommercialOffers(actualPrice: number, input: ICommercialOffers) {
    const resultPrice = input.offers.map(offer => {
      if (offer.type === 'percentage') {
        const p = offer.value / 100;
        return actualPrice * p;
      } else if (offer.type === 'minus') {
        return offer.value;
      } else {
        const nbTranche = actualPrice / 100;
        const priceTranche = offer.value * nbTranche;
        return priceTranche;
      }
    });

    return Math.max.apply(
      Math,
      resultPrice,
    );
  }
}
