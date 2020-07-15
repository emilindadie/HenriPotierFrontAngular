import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { ProfilReducer } from './reducers/profil.reducer';
import { EffectsModule } from '@ngrx/effects';
import { ProfilEffect } from './effects/profil.effects';
import { ProfilService } from './services/profil.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature('profilReducer', ProfilReducer),
    EffectsModule.forFeature([ProfilEffect]),
  ],
  providers: [ProfilService],
})
export class GlobalProfilNgrxModule {}
