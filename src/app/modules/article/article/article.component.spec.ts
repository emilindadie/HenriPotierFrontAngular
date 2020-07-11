import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleComponent } from './article.component';
import { BookService } from '../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { IBook } from '../models/book.model.i';
import { mockGetAllbooks } from 'test-files/book';

class FakeBookService {
  loadBooks(): Observable<IBook[]> {
    return of(mockGetAllbooks);
  }
}

describe('ArticleComponent', () => {
  let component: ArticleComponent;
  let fixture: ComponentFixture<ArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ ArticleComponent ],
      providers: [
        {
          provide: BookService,
          useClass: FakeBookService
       }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display array of article when loading the component (if api has book)', async () => {
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('.article-item'));
    expect(element.length > 0).toBe(true);
  });
});
