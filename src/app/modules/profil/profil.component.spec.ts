import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilComponent } from './profil.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { IProfilState } from '../global-profil-ngrx/states/profil.state.i';
import { MemoizedSelector } from '@ngrx/store';
import { ICard } from '../global-profil-ngrx/models/card.model.i';
import {
  selectedCardSelector,
  successUpdateSelectedCardSelector,
  successSaveCardSelector,
  cardsSelector,
} from '../global-profil-ngrx/selectors/profil.selector';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';

describe('ProfilComponent', () => {
  let component: ProfilComponent;
  let fixture: ComponentFixture<ProfilComponent>;

  let mockStore: MockStore;

  let mockCardSelector: MemoizedSelector<IProfilState, ICard[]>;

  let mockSelectedCardSelector: MemoizedSelector<IProfilState, ICard>;

  let mockSuccessUpdateSelectedCardSelector: MemoizedSelector<
    IProfilState,
    boolean
  >;

  let mockSuccessSaveCardCardSelector: MemoizedSelector<IProfilState, boolean>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatCardModule,
        MatSnackBarModule,
      ],
      declarations: [ProfilComponent],
      providers: [provideMockStore()],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilComponent);
    component = fixture.componentInstance;

    mockStore = TestBed.inject(MockStore);

    mockCardSelector = mockStore.overrideSelector(cardsSelector, [
      {
        cardNumber: 1222,
        cryptogramme: 456,
        expiration: 167272772,
        id: 2,
        solde: 466666,
        uniqueToken: '',
      },
    ]);

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

    mockSuccessUpdateSelectedCardSelector = mockStore.overrideSelector(
      successUpdateSelectedCardSelector,
      true,
    );

    mockSuccessSaveCardCardSelector = mockStore.overrideSelector(
      successSaveCardSelector,
      true,
    );

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
