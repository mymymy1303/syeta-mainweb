import { Component, OnInit } from '@angular/core';
import * as productSelectors from './../store/product.selectors';
import * as categorySelectors from './../../category/store/category.selectors';
import * as cartSelectors from './../../cart/store/cart.selectors';
import { Store } from '@ngrx/store';
import { LoadAllProductsRequest, ClearProducts, LoadProductsByCategoryRequest } from '../store/product.actions';
import { take } from 'rxjs/operators';
import { LoadCategoriesRequest } from '../../category/store/category.actions';
import { Product } from '../store/product.model';
import { CartItem } from '../../cart/store/cart.model';
import { AddCart, CheckExistedId, UpdateCart } from '../../cart/store/cart.actions';
import { AddedSuccessfullyDialog } from 'src/app/dialog/store/dialog.model';
import { OpenAddedSuccessfullyDialog } from 'src/app/dialog/store/dialog.actions';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  productList: any;
  paginationInfo: any;
  categoryList: any;

  sortBy = '1';
  size = '5';

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.store.dispatch(new LoadCategoriesRequest());
    this.store.dispatch(new ClearProducts());
    this.store.dispatch(new LoadAllProductsRequest({ sortBy: '1', page: '1', size: '5' }));
    this.productList = this.store.select(productSelectors.selectAll);
    this.paginationInfo = this.store.select(productSelectors.getPaginationInfo);
    this.categoryList = this.store.select(categorySelectors.selectCategoryTitleAndId);
  }

  onViewMore() {
    this.store.select(productSelectors.getPaginationInfo).pipe(
      take(1),
    ).subscribe(
      (data) => {
        this.store.dispatch(new LoadAllProductsRequest({ sortBy: data.sortBy, page: data.nextPage, size: data.size }));
      }
    );
  }

  onViewOptionChange() {
    this.store.select(productSelectors.getPaginationInfo).pipe(
      take(1),
    ).subscribe(
      (data) => {
        this.store.dispatch(new ClearProducts());
        if (data.currentCategoryId.length > 0) {
          this.store.dispatch(new LoadProductsByCategoryRequest({
            categoryId: data.currentCategoryId,
            sortBy: this.sortBy,
            page: '1',
            size: this.size
          }));
        } else {
          this.store.dispatch(new LoadAllProductsRequest({ sortBy: this.sortBy, page: '1', size: this.size }));
        }
      }
    );
  }

  onCategoryClick(id: string, $event) {
    $event.preventDefault();
    this.store.dispatch(new ClearProducts());
    if (id.length > 0) {
      this.store.dispatch(new LoadProductsByCategoryRequest({
        categoryId: id,
        sortBy: this.sortBy,
        page: '1',
        size: this.size
      }));
    } else {
      this.store.dispatch(new LoadAllProductsRequest({ sortBy: this.sortBy, page: '1', size: this.size }));
    }
  }

  onRefreshClick($event) {
    $event.preventDefault();
    this.store.dispatch(new LoadCategoriesRequest());
    this.store.dispatch(new ClearProducts());
    this.store.dispatch(new LoadAllProductsRequest({ sortBy: this.sortBy, page: '1', size: this.size }));
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
