import { ICard } from '../models/card.model.i';

export interface IProfilState {
  cards: ICard[];
  selectedCard: ICard;
  cardsCount: number;
  successSaveCard: boolean;
  successRemoveCard: boolean;
  errorSavecard: boolean;
  errorRemoveCard: boolean;
  successUpdateSelectedCard: boolean;
  successDoTransaction: boolean;
  errorDoTransaction: boolean;
}
