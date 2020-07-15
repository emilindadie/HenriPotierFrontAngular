import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProfilState } from '../states/profil.state.i';

export const getProfilFeatureState = createFeatureSelector<IProfilState>(
  'profilReducer',
);

export const cardsSelector = createSelector(
  getProfilFeatureState,
  state => state.cards,
);

export const selectedCardSelector = createSelector(
  getProfilFeatureState,
  state => state.selectedCard,
);

export const successSaveCardSelector = createSelector(
  getProfilFeatureState,
  state => state.successSaveCard,
);

export const successUpdateSelectedCardSelector = createSelector(
  getProfilFeatureState,
  state => state.successUpdateSelectedCard,
);

export const successDoTransactionSelector = createSelector(
  getProfilFeatureState,
  state => state.successDoTransaction,
);

export const errorDoTransactionSelector = createSelector(
  getProfilFeatureState,
  state => state.errorDoTransaction,
);
