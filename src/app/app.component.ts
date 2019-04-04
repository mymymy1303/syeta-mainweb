import { Component, OnInit } from '@angular/core';
import * as cartSelectors from './pages/cart/store/cart.selectors';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { Cart } from './pages/cart/store/cart.model';
import { FetchFromCart } from './pages/cart/store/cart.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Syeta';

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.select(cartSelectors.getCartItems).subscribe(
      (data: Cart[]) => {
        if (data.length) {
          const cartItems = {};
          data.forEach(cart => {
            cartItems[cart.id] = cart.quantity;
          });
          this.store.dispatch(new FetchFromCart(cartItems));
        }
      }
    );
  }

  onLogout() {

  }
}
