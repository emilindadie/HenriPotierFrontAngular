import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/modules/shared/models/article.model.i';
import { Store, select } from '@ngrx/store';
import { IArticlesListState } from '../../states/articles.state.i';
import { filteredArticlesSelector } from '../../selectors/articles-list.selector';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles$: Observable<IArticle[]> = new Observable();


  constructor(private store: Store<IArticlesListState>) {}


  ngOnInit(): void {
    this.store.dispatch({type: 'LOAD_BOOKS'});
    this.articles$ = this.store.pipe(select(filteredArticlesSelector));
  }

}
