import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtcToLocalDatePipe } from './pipe/UtcToLocalDatePipe';
import { VndCurrency } from './pipe/VndCurrency';

@NgModule({
  declarations: [UtcToLocalDatePipe, VndCurrency],
  imports: [
    CommonModule
  ],
  exports: [UtcToLocalDatePipe, VndCurrency]
})
export class SharedModule { }
