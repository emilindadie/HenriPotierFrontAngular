import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IArticle } from '../../shared/models/article.model.i';

@Injectable()
export class BookService {
  constructor(private http: HttpClient) {}

  loadBooks(): Observable<IArticle[]> {
    return this.http.get<IArticle[]>('http://henri-potier.xebia.fr/books');
  }
}
