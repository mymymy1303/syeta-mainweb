import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { CheckoutStepOneComponent } from './checkout-step-one/checkout-step-one.component';
import { CheckoutStepTwoComponent } from './checkout-step-two/checkout-step-two.component';
import { CheckoutStepThreeComponent } from './checkout-step-three/checkout-step-three.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { MatIconModule } from '@angular/material';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidatorUtil } from 'src/app/utils/validator.util';

@NgModule({
  declarations: [LayoutComponent, CheckoutStepOneComponent, CheckoutStepTwoComponent, CheckoutStepThreeComponent],
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    MatIconModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers: [ValidatorUtil]
})
export class CheckoutModule { }
