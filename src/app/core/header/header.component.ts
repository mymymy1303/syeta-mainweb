import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as cartSelectors from './../../pages/cart/store/cart.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  quantity: any;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.quantity = this.store.select(cartSelectors.getTotalItemsQuantity);
  }

}
