import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material';

import { SuccessDialogComponent } from './success-dialog/success-dialog.component';
import { EffectsModule } from '@ngrx/effects';
import { DialogEffects } from './store/dialog.effects';
import { WarningDialogComponent } from './warning-dialog/warning-dialog.component';
import { FailedDialogComponent } from './failed-dialog/failed-dialog.component';
import { DeleteConfirmDialogComponent } from './delete-confirm-dialog/delete-confirm-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  entryComponents: [
    SuccessDialogComponent,
    WarningDialogComponent,
    FailedDialogComponent,
    DeleteConfirmDialogComponent
  ],
  declarations: [SuccessDialogComponent, WarningDialogComponent, FailedDialogComponent, DeleteConfirmDialogComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([DialogEffects])
  ]
})
export class DialogModule { }
