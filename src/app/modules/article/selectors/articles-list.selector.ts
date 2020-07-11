import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IArticlesListState } from '../states/articles.state.i';

export const getArticlesListFeatureState = createFeatureSelector<IArticlesListState>('articlesListReducer');

export const filteredArticlesSelector = createSelector(
    getArticlesListFeatureState,
    state => state.filteredArticles
);


