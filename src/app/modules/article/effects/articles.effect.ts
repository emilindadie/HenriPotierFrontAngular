import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { BookService } from '../services/book.service';

@Injectable()
export class ArticlesEffect {
  constructor(private actions$: Actions, private bookService: BookService) {}

  loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType('LOAD_BOOKS'),
      mergeMap(() =>
        this.bookService.loadBooks().pipe(
          map(response => ({
            type: 'SUCCESSFFULLY_LOAD_BOOKS',
            payload: { articles: response },
          })),
          catchError(() => of({ type: 'FAILED_LOAD_BOOKS' })),
        ),
      ),
    ),
  );
}
