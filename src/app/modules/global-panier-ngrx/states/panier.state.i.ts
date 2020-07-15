import { IArticle } from '../../shared/models/article.model.i';

export interface IPanierState {
  panierContent: IArticle[];
  panierAmount: number;
  panierContentCount: number;
  successFullyAddArticle: boolean;
  successFullyRemoveArticle: boolean;
  errorAddArticle: boolean;
  errorRemoveArticle: boolean;
  commercialOffer: number;
}
