import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardDialogComponent } from './add-card-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';

describe('AddCardDialogComponent', () => {
  let component: AddCardDialogComponent;
  let fixture: ComponentFixture<AddCardDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatSnackBarModule, MatDialogModule],
      declarations: [AddCardDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: {} },
        provideMockStore(),
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
