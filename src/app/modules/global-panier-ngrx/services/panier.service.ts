import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ICommercialOffers } from '../models/commercial-offers.model.i';
import { IArticle } from '../../shared/models/article.model.i';

@Injectable()
export class PanierService {
  constructor(private http: HttpClient) {}

  calculateCommercialOffers(
    articles: IArticle[],
  ): Observable<ICommercialOffers> {
    const isbns = articles.map((article: IArticle) => article.isbn).join(',');
    return this.http.get<ICommercialOffers>(
      `http://henri-potier.xebia.fr/books/${isbns}/commercialOffers`,
    );
  }
}
