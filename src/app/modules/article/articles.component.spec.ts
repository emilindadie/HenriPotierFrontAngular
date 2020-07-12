
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { IArticle } from 'src/app/modules/shared/models/article.model.i';
import { mockGetAllbooks } from 'test-files/book';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { ArticlesComponent } from './articles.component';
import { IArticlesListState } from './states/articles.state.i';
import { BookService } from './services/book.service';
import { filteredArticlesSelector } from './selectors/articles-list.selector';

class FakeBookService {
  loadBooks(): Observable<IArticle[]> {
    return of(mockGetAllbooks);
  }
}

describe('ArticlesComponent', () => {
  let component: ArticlesComponent;
  let fixture: ComponentFixture<ArticlesComponent>;
  let mockStore: MockStore;

  let mockFilteredArticlesSelector: MemoizedSelector<IArticlesListState, IArticle[]>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesComponent ],
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: BookService,
          useClass: FakeBookService
        },
        provideMockStore()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticlesComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockFilteredArticlesSelector =  mockStore.overrideSelector(filteredArticlesSelector, mockGetAllbooks);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display array of article when loading the component (if api has book)', async () => {
    fixture.detectChanges();
    const element = fixture.debugElement.queryAll(By.css('.articles-list-container-item'));
    expect(element.length > 0).toBe(true);
  });
});
