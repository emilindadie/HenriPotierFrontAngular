import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { BookService } from './services/book.service';
import { MaterialModule } from '../material/material.module';
import { StoreModule } from '@ngrx/store';
import { ArticlesListReducer } from './reducers/articles.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ArticlesEffect } from './effects/articles.effect';
import { ArticlesComponent } from './articles.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    StoreModule.forFeature('articlesListReducer', ArticlesListReducer),
    EffectsModule.forFeature([ArticlesEffect]),
  ],
  providers: [BookService],
})
export class ArticleModule {}
