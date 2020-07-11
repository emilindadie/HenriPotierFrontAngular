import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { BookService } from './services/book.service';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { ArticlesListReducer } from './reducers/articles.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticlesEffect } from './effects/articles.effect';

@NgModule({
  declarations: [ArticlesListComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MaterialModule,
    StoreModule.forFeature('articlesListReducer', ArticlesListReducer),
    EffectsModule.forFeature([ArticlesEffect]),
  ],
  providers: [BookService]
})
export class ArticleModule { }
