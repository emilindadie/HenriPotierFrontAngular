import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArticlesListComponent } from './articles-list.component';
import { By } from '@angular/platform-browser';
import { BookService } from '../../services/book.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of } from 'rxjs';
import { IArticle } from 'src/app/modules/shared/models/article.model.i';
import { mockGetAllbooks } from 'test-files/book';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IArticlesListState } from '../../states/articles.state.i';
import { MemoizedSelector } from '@ngrx/store';
import { filteredArticlesSelector } from '../../selectors/articles-list.selector';

class FakeBookService {
  loadBooks(): Observable<IArticle[]> {
    return of(mockGetAllbooks);
  }
}

describe('ArticlesListComponent', () => {
  let component: ArticlesListComponent;
  let fixture: ComponentFixture<ArticlesListComponent>;
  let mockStore: MockStore;

  let mockFilteredArticlesSelector: MemoizedSelector<IArticlesListState, IArticle[]>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticlesListComponent ],
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
    fixture = TestBed.createComponent(ArticlesListComponent);
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
