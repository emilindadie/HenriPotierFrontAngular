import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierReducer } from './reducers/panier.reducer';
import { PanierEffect } from './effects/panier.effects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { PanierService } from './services/panier.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('panierReducer', PanierReducer),
    EffectsModule.forFeature([PanierEffect]),
  ],
  providers: [PanierService],
})
export class GlobalPanierNgrxModule {}
