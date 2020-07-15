import { IArticle } from '../../shared/models/article.model.i';

export interface IPanierAction {
  article: IArticle;
  removeIndex: number;
  commercialOffer: number;
}
