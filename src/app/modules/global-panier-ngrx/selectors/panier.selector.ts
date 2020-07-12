import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IPanierState } from '../states/panier.state.i';

export const getPanierFeatureState = createFeatureSelector<IPanierState>('panierReducer');

export const panierContentSelector = createSelector(
    getPanierFeatureState,
    state => state.panierContent
);

export const successAddArticleSelector = createSelector(
    getPanierFeatureState,
    state => state.successFullyAddArticle
);

export const successRemoveArticleSelector = createSelector(
    getPanierFeatureState,
    state => state.successFullyRemoveArticle
);

