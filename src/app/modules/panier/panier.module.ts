import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanierRoutingModule } from './panier.routing.module';
import { PanierComponent } from './panier.component';
import { GlobalPanierNgrxModule } from '../global-panier-ngrx/global-panier-ngrx.module';
import { MaterialModule } from '../material/material.module';



@NgModule({
  declarations: [PanierComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PanierRoutingModule,
    GlobalPanierNgrxModule
  ]
})
export class PanierModule { }
