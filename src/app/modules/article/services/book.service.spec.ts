import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
} from '@angular/common/http/testing';
import { BookService } from './book.service';
import { of } from 'rxjs';
import { mockGetAllbooks } from 'test-files/book';
import { IBook } from '../models/book.model.i';

describe('BookService', () => {
    let service: BookService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                BookService,
            ]
        });
        service = TestBed.inject(BookService);
    });

    it('should be initialized', () => {
      expect(service).toBeTruthy();
    });

    it('should load books', async () => {
        spyOn(service, 'loadBooks').and.returnValue(of(mockGetAllbooks));
        service.loadBooks().subscribe((res: IBook[]) => {
            expect(res).toBeInstanceOf(Array);
        });
    });
});
