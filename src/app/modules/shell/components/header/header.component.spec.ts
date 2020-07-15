import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { IPanierState } from 'src/app/modules/global-panier-ngrx/states/panier.state.i';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { panierContentCountSelector } from 'src/app/modules/global-panier-ngrx/selectors/panier.selector';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  let mockStore: MockStore;

  let mockPanierContentCountSelector: MemoizedSelector<
    IPanierState,
    number
  >;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        provideMockStore(),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    mockStore = TestBed.inject(MockStore);
    mockPanierContentCountSelector = mockStore.overrideSelector(
      panierContentCountSelector,
      8
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
