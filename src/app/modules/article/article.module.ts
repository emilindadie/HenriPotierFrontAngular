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
import { GlobalPanierNgrxModule } from '../global-panier-ngrx/global-panier-ngrx.module';

@NgModule({
  declarations: [ArticlesComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MaterialModule,
    StoreModule.forFeature('articlesListReducer', ArticlesListReducer),
    EffectsModule.forFeature([ArticlesEffect]),
    GlobalPanierNgrxModule
  ],
  providers: [BookService]
})
export class ArticleModule { }
