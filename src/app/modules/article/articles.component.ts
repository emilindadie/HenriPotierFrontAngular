import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from '../shared/models/article.model.i';
import { Store, select } from '@ngrx/store';
import { IArticlesListState } from './states/articles.state.i';
import { filteredArticlesSelector } from './selectors/articles-list.selector';
import { successAddArticleSelector } from '../global-panier-ngrx/selectors/panier.selector';
import {MatSnackBar} from '@angular/material/snack-bar';
import { tap, takeWhile } from 'rxjs/operators';
import { IPanierState } from '../global-panier-ngrx/states/panier.state.i';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit, OnDestroy {

  articles$: Observable<IArticle[]> = new Observable();
  componentIsActive = true;

  constructor(
    private articleStore: Store<IArticlesListState>, private panierStore: Store<IPanierState>,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.articleStore.dispatch({type: 'LOAD_BOOKS'});
    this.articles$ = this.articleStore.pipe(select(filteredArticlesSelector));

    this.panierStore.pipe(select(successAddArticleSelector), tap((success) => {
      if (success) {
        this.snackBar.open('Ajouté au panier :)', '', {
          duration: 2000,
        });
        this.panierStore.dispatch({type: 'INIT_ACTION_STATE'});
      }
    }, takeWhile(() => this.componentIsActive
    ))).subscribe();
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

  public addArticleIntoPanier(article: IArticle) {
    this.panierStore.dispatch({type: 'ADD_ARTICLE', payload: { article }});
  }
}
