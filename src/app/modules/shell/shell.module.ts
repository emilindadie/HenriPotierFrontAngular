import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellRoutingModule } from './shell-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { ShellComponent } from './shell.component';
import { MaterialModule } from '../material/material.module';


@NgModule({
  declarations: [ShellComponent, HeaderComponent],
  imports: [
    CommonModule,
    ShellRoutingModule,
    MaterialModule
  ]
})
export class ShellModule { }
