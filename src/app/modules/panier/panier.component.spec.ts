import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierComponent } from './panier.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MemoizedSelector } from '@ngrx/store';
import { IPanierState } from '../global-panier-ngrx/states/panier.state.i';
import { IArticle } from '../shared/models/article.model.i';
import { IProfilState } from '../global-profil-ngrx/states/profil.state.i';
import { ICard } from '../global-profil-ngrx/models/card.model.i';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  selectedCardSelector,
  successDoTransactionSelector,
  errorDoTransactionSelector,
} from '../global-profil-ngrx/selectors/profil.selector';
import { mockGetAllbooks } from 'test-files/book';
import {
  panierContentSelector,
  panierAmountSelector,
  panierAmountWithoutCommercialOfferSelector,
} from '../global-panier-ngrx/selectors/panier.selector';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

describe('PanierComponent', () => {
  let component: PanierComponent;
  let fixture: ComponentFixture<PanierComponent>;
  let mockStore: MockStore;

  let mockPanierContentSelector: MemoizedSelector<IPanierState, IArticle[]>;

  let mockPanierAmountWithReductionSelector: MemoizedSelector<
    IPanierState,
    number
  >;

  let mockPanierAmountWithoutReductionSelector: MemoizedSelector<
    IPanierState,
    number
  >;

  let mockSuccessDoTransactionSelector: MemoizedSelector<IProfilState, boolean>;

  let mockErrorDoTransactionSelector: MemoizedSelector<IProfilState, boolean>;

  let mockSelectedCardSelector: MemoizedSelector<IProfilState, ICard>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PanierComponent],
      imports: [
        MatSnackBarModule,
        MatGridListModule,
        MatCardModule,
        BrowserAnimationsModule,
      ],
      providers: [provideMockStore()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanierComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(MockStore);
    mockSelectedCardSelector = mockStore.overrideSelector(
      selectedCardSelector,
      {
        cardNumber: 1222,
        cryptogramme: 456,
        expiration: 167272772,
        id: 2,
        solde: 466666,
        uniqueToken: '',
      },
    );

    mockPanierContentSelector = mockStore.overrideSelector(
      panierContentSelector,
      mockGetAllbooks,
    );

    mockPanierAmountWithReductionSelector = mockStore.overrideSelector(
      panierAmountSelector,
      599,
    );

    mockPanierAmountWithoutReductionSelector = mockStore.overrideSelector(
      panierAmountWithoutCommercialOfferSelector,
      599,
    );

    mockSuccessDoTransactionSelector = mockStore.overrideSelector(
      successDoTransactionSelector,
      true,
    );

    mockErrorDoTransactionSelector = mockStore.overrideSelector(
      errorDoTransactionSelector,
      true,
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
