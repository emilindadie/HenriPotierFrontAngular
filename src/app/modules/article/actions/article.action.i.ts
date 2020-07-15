import { IArticle } from '../../shared/models/article.model.i';

export interface IArticleListAction {
  articles: IArticle[];
  searchPattern: '';
}
