import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { BookService } from './services/book.service';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ArticlesListComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MaterialModule
  ],
  providers: [BookService]
})
export class ArticleModule { }
