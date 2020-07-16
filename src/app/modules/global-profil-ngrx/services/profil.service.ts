import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ICard } from '../models/card.model.i';
import { SecureApiResponse } from '../../shared/models/secure-api.response.i';
import { ISaveCard } from '../models/card-save.model.i';

@Injectable()
export class ProfilService {
  constructor(private http: HttpClient) {}

  saveCard(card: ISaveCard): Observable<SecureApiResponse<ICard>> {
    return this.http.post<SecureApiResponse<ICard>>('/api/cards/secure', card);
  }

  paymentByCard(
    cardId: number,
    amount: number,
    token: string,
  ): Observable<SecureApiResponse<ICard>> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    const options = { headers };
    return this.http.post<SecureApiResponse<ICard>>(
      '/api/cards/transaction',
      { cardId, amount },
      options,
    );
  }
}
