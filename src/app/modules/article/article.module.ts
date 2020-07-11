import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleRoutingModule } from './article-routing.module';
import { ArticlesListComponent } from './components/articles-list/articles-list.component';
import { BookService } from './services/book.service';


@NgModule({
  declarations: [ArticlesListComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule
  ],
  providers: [BookService]
})
export class ArticleModule { }
