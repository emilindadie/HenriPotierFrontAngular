import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './profil.component';
import { MaterialModule } from '../material/material.module';
import { AddCardDialogComponent } from './components/add-card-dialog/add-card-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProfilComponent, AddCardDialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ProfilRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class ProfilModule {}
