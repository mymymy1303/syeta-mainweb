import { Component, OnInit } from '@angular/core';
import * as cartSelectors from './../../cart/store/cart.selectors';
import { Store } from '@ngrx/store';
import { UpdateCart, DeleteCart } from '../../cart/store/cart.actions';
import { take } from 'rxjs/operators';
import { CartItem } from '../../cart/store/cart.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout-step-one',
  templateUrl: './checkout-step-one.component.html',
  styleUrls: ['./checkout-step-one.component.css']
})
export class CheckoutStepOneComponent implements OnInit {
  cartItems: any;
  totalPrices: any;
  isEmptyCart = false;

  constructor(private store: Store<any>, private router: Router) { }

  ngOnInit() {
    this.cartItems = this.store.select(cartSelectors.getCartItems);
    this.totalPrices = this.store.select(cartSelectors.getTotalPrices);
  }

  onQuantityChange($event, id) {
    const value = $event.target.value;
    if (value >= 1) {
      this.store.dispatch(new UpdateCart({
        cart: {
          id,
          changes: {
            quantity: value
          }
        }
      }));
    } else {
      this.store.dispatch(new DeleteCart({
        id
      }));
    }
  }

  deleteCartItem(id, $event) {
    $event.preventDefault();
    this.store.dispatch(new DeleteCart({
      id
    }));

    this.store.select(cartSelectors.getCartState).pipe(
      take(1)
    ).subscribe(
      (data) => localStorage.setItem('cartFeature', JSON.stringify(data))
    );
  }

  onQuantityIncrease($event, id) {
    const value = parseInt($event.target.previousSibling.value, 10);
    if (value >= 1) {
      this.store.dispatch(new UpdateCart({
        cart: {
          id,
          changes: {
            quantity: value + 1
          }
        }
      }));
    } else {
      this.store.dispatch(new DeleteCart({
        id
      }));
    }

    this.store.select(cartSelectors.getCartState).pipe(
      take(1)
    ).subscribe(
      (data) => localStorage.setItem('cartFeature', JSON.stringify(data))
    );
  }

  onQuantityDecrease($event, id) {
    const value = parseInt($event.target.nextSibling.value, 10);
    if (value > 1) {
      this.store.dispatch(new UpdateCart({
        cart: {
          id,
          changes: {
            quantity: value - 1
          }
        }
      }));
    } else {
      this.store.dispatch(new DeleteCart({
        id
      }));
    }

    this.store.select(cartSelectors.getCartState).pipe(
      take(1)
    ).subscribe(
      (data) => localStorage.setItem('cartFeature', JSON.stringify(data))
    );
  }


  onNextStepClick() {
    this.cartItems.pipe(
      take(1)
    ).subscribe(
      (data: CartItem[]) => {
        const itemsCount = data.length;
        if (itemsCount >= 1) {
          this.router.navigate(['checkout/buoc-2']);
        } else {
          this.isEmptyCart = true;
        }
      }
    );
  }

}
