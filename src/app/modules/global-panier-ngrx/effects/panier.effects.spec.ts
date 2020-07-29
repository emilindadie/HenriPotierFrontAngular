import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PanierEffect } from './panier.effects';
import { ICommercialOffers } from '../models/commercial-offers.model.i';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { PanierService } from '../services/panier.service';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';


describe('PanierEffect', () => {
    let service: PanierEffect;
    let mockStore: MockStore;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [PanierEffect,
                PanierService,
                {
                    provide: Actions,
                    useValue: of(),
                },
                provideMockStore()
            ],
        });
        mockStore = TestBed.inject(MockStore);
        service = TestBed.inject(PanierEffect);
    });

    it('should be initialized', () => {
        expect(service).toBeTruthy();
    });

    it('should take best commercial offer', async () => {
        const inputOffer: ICommercialOffers = {
            offers: [
                { type: 'percentage', value: 5 },
                { type: 'minus', value: 15 },
                { type: 'slice', sliceValue: 100, value: 12 }
            ]
        };
        const panierAmount = 65;

        const bestOffer = service.calculBestCommercialOffers(panierAmount, inputOffer);
        const finalPrice = panierAmount - bestOffer;
        expect(finalPrice).toBe(50);
    });
});
