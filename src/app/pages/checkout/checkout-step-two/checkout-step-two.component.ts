import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidatorUtil } from 'src/app/utils/validator.util';
import * as cartSelectors from './../../cart/store/cart.selectors';
import { Store } from '@ngrx/store';
import { VAT_PERCENTAGE } from './../../../app-properties';
import { take } from 'rxjs/operators';
import { MakeOrder } from '../../cart/store/cart.actions';

@Component({
  selector: 'app-checkout-step-two',
  templateUrl: './checkout-step-two.component.html',
  styleUrls: ['./checkout-step-two.component.css']
})
export class CheckoutStepTwoComponent implements OnInit {
  checkoutStepTwoForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, this.validator.NameValidator]),
    phoneNumber: new FormControl('', [Validators.required, this.validator.PhoneNumberValidator]),
    email: new FormControl('', [Validators.required, this.validator.EmailValidator]),
    address: new FormControl('', [Validators.required]),
    note: new FormControl('')
  });


  get fullName() {
    return this.checkoutStepTwoForm.get('fullName');
  }
  get phoneNumber() {
    return this.checkoutStepTwoForm.get('phoneNumber');
  }
  get email() {
    return this.checkoutStepTwoForm.get('email');
  }
  get address() {
    return this.checkoutStepTwoForm.get('address');
  }
  get note() {
    return this.checkoutStepTwoForm.get('note');
  }

  cartItems: any;
  totalPrices: any;
  vat = VAT_PERCENTAGE;
  totalPricesWithVat: number;
  totalQuantity: any;

  constructor(private validator: ValidatorUtil, private store: Store<any>) { }

  ngOnInit() {
    this.totalQuantity = this.store.select(cartSelectors.getTotalItemsQuantity);
    this.cartItems = this.store.select(cartSelectors.getCartItems);
    this.totalPrices = this.store.select(cartSelectors.getTotalPrices);
    this.totalPrices.subscribe(
      (data: number) => {
        this.totalPricesWithVat = Math.trunc(data + data * this.vat / 100);
      }
    );
  }

  onSubmit() {
    if (this.checkoutStepTwoForm.valid) {
      let productId = '';
      this.store.select(cartSelectors.getCartItems).pipe(
        take(1)
      ).subscribe(
        // tslint:disable-next-line:no-shadowed-variable
        (data) => {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < data.length; i++) {
            let j = 0;
            for (j; j < data[i].quantity; j++) {
              productId = productId + data[i].id + ';';
            }
          }
          productId = productId.substring(0, productId.length - 1);
        }
      );
      const data = {
        ...this.checkoutStepTwoForm.value,
        productId,
        totalPrice: this.totalPricesWithVat
      };
      this.store.dispatch(new MakeOrder(data));
    }
  }

}
