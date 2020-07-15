import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription, BehaviorSubject, of } from 'rxjs';
import { IArticle } from '../shared/models/article.model.i';
import { Store, select } from '@ngrx/store';
import { IArticlesListState } from './states/articles.state.i';
import { filteredArticlesSelector } from './selectors/articles-list.selector';
import { successAddArticleSelector } from '../global-panier-ngrx/selectors/panier.selector';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, takeUntil, debounceTime, switchMap } from 'rxjs/operators';
import { IPanierState } from '../global-panier-ngrx/states/panier.state.i';
import { MediaObserver } from '@angular/flex-layout';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
})
export class ArticlesComponent implements OnInit, OnDestroy {
  articles$: Observable<IArticle[]> = new Observable();
  notifier = new Subject();
  watcher: Subscription;
  gridCols: BehaviorSubject<number> = new BehaviorSubject<number>(4);
  form: FormGroup;

  constructor(
    private articleStore: Store<IArticlesListState>,
    private panierStore: Store<IPanierState>,
    private snackBar: MatSnackBar,
    private mediaObserver: MediaObserver,
  ) {
    this.form = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.form
      .get('search')
      .valueChanges.pipe(
        debounceTime(300),
        switchMap(pattern =>
          of(
            this.articleStore.dispatch({
              type: 'FILTERED_ARTICLES',
              payload: { searchPattern: pattern },
            }),
          ),
        ),
        takeUntil(this.notifier),
      )
      .subscribe();

    this.mediaObserver
      .asObservable()
      .pipe(
        tap(change => {
          if (change[0].mqAlias === 'xs') {
            this.gridCols.next(1);
          } else if (change[0].mqAlias === 'sm') {
            this.gridCols.next(2);
          } else if (change[0].mqAlias === 'md') {
            this.gridCols.next(3);
          } else {
            this.gridCols.next(4);
          }
        }),
        takeUntil(this.notifier),
      )
      .subscribe();

    this.articleStore.dispatch({ type: 'LOAD_BOOKS' });
    this.articles$ = this.articleStore.pipe(select(filteredArticlesSelector));
    this.panierStore
      .pipe(
        select(successAddArticleSelector),
        tap(success => {
          if (success) {
            this.snackBar.open('Added into the basket', '', {
              duration: 2000,
            });
            this.panierStore.dispatch({ type: 'INIT_ACTION_STATE' });
          }
        }, takeUntil(this.notifier)),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }

  public addArticleIntoPanier(article: IArticle) {
    this.panierStore.dispatch({ type: 'ADD_ARTICLE', payload: { article } });
  }
}
