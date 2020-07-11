import { IArticle } from '../../shared/models/article.model.i';

export interface IArticlesListState {
    articles: IArticle[];
    articlesItemsCount: number;
    serachPattern: string;
    filteredArticles: IArticle[];
    filteredArticlesItemsCount: number;
    hasSuccessLoadingArticles: boolean;
    hasLoadingError: boolean;
}
