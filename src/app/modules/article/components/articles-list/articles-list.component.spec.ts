import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticlesListComponent } from './articles-list.component';
import { By } from '@angular/platform-browser';
import { BookService } from '../../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { IArticle } from 'src/app/modules/shared/models/article.model.i';
import { mockGetAllbooks } from 'test-files/book';



class FakeBookService {
  loadBooks(): Observable<IArticle[]> {
    return of(mockGetAllbooks);
  }
}

describe('ArticlesListComponent', () => {
  let component: ArticlesListComponent;
  let fixture: ComponentFixture<ArticlesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesListComponent ],
      imports: [HttpClientTestingModule],
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
    fixture = TestBed.createComponent(ArticlesListComponent);
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
