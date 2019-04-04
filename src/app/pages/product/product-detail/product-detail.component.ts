import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { FetchProduct } from '../store/product.actions';
import * as routeSelectors from './../../../store/app.selectors';
import * as productSelectors from './../../product/store/product.selectors';
import { OpenAddedSuccessfullyDialog } from 'src/app/dialog/store/dialog.actions';
import { AddedSuccessfullyDialog } from 'src/app/dialog/store/dialog.model';
import { AddCart, UpdateCart } from '../../cart/store/cart.actions';
import { CartItem } from '../../cart/store/cart.model';
import { Product } from '../store/product.model';
import * as cartSelectors from './../../cart/store/cart.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  currentProduct: any;
  routeParams: Subscription;
  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.routeParams = this.store.select(routeSelectors.getParamsFromRouterState).subscribe(
      (data) => {
        this.currentProduct = this.store.select(productSelectors.selectProductEntityById(data.id));
        this.store.dispatch(new FetchProduct(data.id));
        this.currentProduct = this.store.select(productSelectors.getCurrentProduct);
      },
      (error) => {
      }
    );
  }

  ngOnDestroy() {
    this.routeParams.unsubscribe();
  }

  onAddToCartClick(product: Product, $event) {
    $event.preventDefault();
    const cartItem: CartItem = {
      imageUrl: product.imageUrl,
      price: product.price,
      title: product.title
    };
    this.store.select(cartSelectors.getIds).pipe(
      take(1)
    ).subscribe(
      (data: string[]) => {
        if (data.includes(product.id)) {
          this.store.select(cartSelectors.getCartItemById(product.id)).pipe(
            take(1)
          ).subscribe(
            (cart) => {
              const currentQuantity = cart.quantity;
              this.store.dispatch(new UpdateCart({
                cart: {
                  id: product.id,
                  changes: {
                    quantity: currentQuantity + 1
                  }
                }
              }));
              const dialog: AddedSuccessfullyDialog = {
                navigateUrl: '/checkout',
                title: product.title,
                content: '',
                imageUrl: product.imageUrl,
                closeText: 'Tiếp tục mua hàng',
                navigateText: 'Tiến hành thanh toán',
                heading: 'Thêm sản phẩm thành công'
              };
              this.store.dispatch(new OpenAddedSuccessfullyDialog(dialog));
            }
          );
        } else {
          this.store.dispatch(new AddCart({
            cart: {
              id: product.id,
              product: cartItem,
              quantity: 1,
              totalPrice: product.price * 1
            }
          }));
          const dialog: AddedSuccessfullyDialog = {
            navigateUrl: '/checkout',
            title: product.title,
            content: '',
            imageUrl: product.imageUrl,
            closeText: 'Tiếp tục mua hàng',
            navigateText: 'Tiến hành thanh toán',
            heading: 'Thêm sản phẩm thành công'
          };
          this.store.dispatch(new OpenAddedSuccessfullyDialog(dialog));
        }
      }
    );

    this.store.select(cartSelectors.getCartState).pipe(
      take(1)
    ).subscribe(
      (data) => localStorage.setItem('cartFeature', JSON.stringify(data))
    );
  }

}
