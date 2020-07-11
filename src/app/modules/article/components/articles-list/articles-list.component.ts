import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { IArticle } from 'src/app/modules/shared/models/article.model.i';

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss']
})
export class ArticlesListComponent implements OnInit {
  articles$: Observable<IArticle[]> = new Observable();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.articles$ = this.bookService.loadBooks();
  }

}
