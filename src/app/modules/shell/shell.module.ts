import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShellComponent } from './shell.component';
import { MaterialModule } from '../material/material.module';
import { GlobalPanierNgrxModule } from '../global-panier-ngrx/global-panier-ngrx.module';
import { GlobalProfilNgrxModule } from '../global-profil-ngrx/global-profil-ngrx.module';
import {  FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ShellComponent, HeaderComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MaterialModule,
    GlobalPanierNgrxModule,
    GlobalProfilNgrxModule,
    FlexLayoutModule
  ],
})
export class ShellModule {}
