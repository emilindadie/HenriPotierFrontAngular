import { IArticlesListState } from '../states/articles.state.i';
import { IBaseAction } from '../../shared/actions/base.action.i';
import { IArticleListAction } from '../actions/article.action.i';
import { IArticle } from '../../shared/models/article.model.i';
import * as _ from 'lodash';

export const initialState: IArticlesListState = {
  articles: [],
  articlesItemsCount: 0,
  hasLoadingError: false,
  hasSuccessLoadingArticles: false,
  filteredArticles: [],
  filteredArticlesItemsCount: 0,
  searchPattern: '',
};

export function ArticlesListReducer(
  state: IArticlesListState = initialState,
  action: IBaseAction<IArticleListAction>,
): IArticlesListState {
  switch (action.type) {
    case 'LOAD_BOOKS':
      return {
        ...state,
      };
    case 'SUCCESSFFULLY_LOAD_BOOKS':
      return {
        ...state,
        articles: [...arrayWithUniqueValue(state.articles, action.payload.articles)],
        filteredArticles: [...arrayWithUniqueValue(state.articles, action.payload.articles)],
        articlesItemsCount:
          state.articles.length + action.payload.articles.length,
        filteredArticlesItemsCount:
          state.articles.length + action.payload.articles.length,
        hasSuccessLoadingArticles: true,
      };
    case 'LOAD_ALL_ARTICLES':
      return {
        ...state,
      };
    case 'SUCCESSFFULLY_LOAD_ALL_ARTICLES':
      return {
        ...state,
        articles: action.payload.articles,
        filteredArticles: action.payload.articles,
        articlesItemsCount: action.payload.articles.length,
        filteredArticlesItemsCount: action.payload.articles.length,
        hasSuccessLoadingArticles: true,
      };

    case 'FAILED_LOAD_BOOKS':
      return {
        ...state,
        hasLoadingError: true,
      };

    case 'FAILED_LOAD_ALL_ARTICLES':
      return {
        ...state,
        hasLoadingError: true,
      };

    case 'FILTERED_ARTICLES':
      return {
        ...state,
        filteredArticles: state.articles.filter(p =>
          p.title.toLowerCase().includes(action.payload.searchPattern.toLowerCase()),
        ),
      };
    default:
      return state;
  }
}

export function arrayWithUniqueValue(itemsState: IArticle[], itemsAction: IArticle[]) {
    const data: IArticle[] = [...itemsState, ...itemsAction];
    return _.uniqBy(data, 'isbn');
}
