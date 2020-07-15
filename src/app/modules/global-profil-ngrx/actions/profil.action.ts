import { ICard } from '../models/card.model.i';
import { ISaveCard } from '../models/card-save.model.i';

export interface IProfilAction {
  selectedCardId: number;
  card: ICard;
  saveCard: ISaveCard;
  removeCardId: number;
  paymentAmount: number;
}
