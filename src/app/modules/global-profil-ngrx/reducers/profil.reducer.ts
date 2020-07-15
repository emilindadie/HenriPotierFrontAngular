import { IBaseAction } from '../../shared/actions/base.action.i';
import { IProfilState } from '../states/profil.state.i';
import { IProfilAction } from '../actions/profil.action';

export const initialState: IProfilState = {
  cards: [],
  cardsCount: 0,
  errorRemoveCard: false,
  errorSavecard: false,
  selectedCard: null,
  successRemoveCard: false,
  successSaveCard: false,
  successUpdateSelectedCard: false,
  successDoTransaction: false,
  errorDoTransaction: false,
};

export function ProfilReducer(
  state: IProfilState = initialState,
  action: IBaseAction<IProfilAction>,
): IProfilState {
  switch (action.type) {
    case 'SAVE_SECURE_CARD':
      return {
        ...state,
      };
    case 'SUCCESSFULLY_SAVE_SECURE_CARD':
      return {
        ...state,
        cards: [...state.cards, action.payload.card],
        successSaveCard: true,
        cardsCount: Number(state.cardsCount) + 1,
        selectedCard:
          Number(state.cardsCount) === 0
            ? action.payload.card
            : state.selectedCard,
      };

    case 'UPDATE_SELECTED_CARD':
      return {
        ...state,
        selectedCard: state.cards.find(
          item => item.id === action.payload.selectedCardId,
        ),
        successUpdateSelectedCard: true,
      };

    case 'REMOVE_CARD':
      return {
        ...state,
        cards: state.cards.filter(
          item => item.id !== action.payload.removeCardId,
        ),
        successRemoveCard: true,
      };
    case 'FAILED_SAVE_SECURE_CARD':
      return {
        ...state,
        errorSavecard: true,
      };

    case 'DO_TRANSACTION':
      return {
        ...state,
      };

    case 'SUCCESSFULLY_DO_TRANSACTION':
      return {
        ...state,
        successDoTransaction: true,
      };

    case 'FAILED_DO_TRANSACTION':
      return {
        ...state,
        errorDoTransaction: true,
      };

    case 'INIT_ACTION_STATE':
      return {
        ...state,
        successSaveCard: false,
        successRemoveCard: false,
        errorRemoveCard: false,
        errorSavecard: false,
        successUpdateSelectedCard: false,
        successDoTransaction: false,
        errorDoTransaction: false
      };
    default:
      return state;
  }
}
