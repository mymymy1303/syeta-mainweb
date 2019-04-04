import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { CheckExistedId, CartActionTypes, MakeOrder, ClearCarts, FetchFromCart } from './cart.actions';
import { map, exhaustMap, withLatestFrom, mergeMap, switchMap } from 'rxjs/operators';
import * as cartSelectors from './cart.selectors';
import { of, empty } from 'rxjs';
import { OrderRequest, SimpleCartItem, CartItem, Cart } from './cart.model';
import { CartService } from '../cart.service';
import { Router } from '@angular/router';
import { Product } from '../../product/store/product.model';

@Injectable()
export class CartEffects {

    @Effect()
    makeOrder$ = this.action$.pipe(
        ofType<MakeOrder>(CartActionTypes.MakeOrder),
        map(action => action.payload),
        exhaustMap(
            (orderRequest: OrderRequest) => {
                return this.cartService.makeOrder(orderRequest).pipe(
                    mergeMap(
                        (response) => {
                            this.router.navigateByUrl('/checkout/buoc-3');
                            localStorage.removeItem('cartFeature');
                            return of(new ClearCarts());
                        }
                    )
                );
            }
        )
    );

    @Effect()
    fetchFromCart$ = this.action$.pipe(
        ofType<FetchFromCart>(CartActionTypes.FetchFromCart),
        map(action => action.payload),
        exhaustMap(
            (payload: SimpleCartItem) => {
                return this.cartService.fetchFromCart(payload).pipe(
                    mergeMap(
                        (response: { [key: string]: Cart }) => {
                            const cartFeatureFromLocalStorage = JSON.parse(localStorage.getItem('cartFeature'));
                            const ids: string[] = cartFeatureFromLocalStorage.ids;
                            const localCartItem = cartFeatureFromLocalStorage.entities;
                            ids.forEach(id => {
                                if (response[id] !== undefined) {
                                    console.log(response[id]);
                                    console.log(localCartItem[id]);
                                    if (response[id] !== localCartItem[id]) {
                                        console.log(123);
                                    }
                                }
                            });
                            return empty();
                        }
                    )
                );
            }
        )
    );


    constructor(
        private action$: Actions,
        private store: Store<any>,
        private router: Router,
        private cartService: CartService
    ) {
    }

    private constructHtmlForProductChangesDialog(fetchedCartItem: Cart, localCartItem: Cart): string {
        const html = `
            <div class="item-compare">
                <div class="old-item">
                    <div class="image">
                        <img src="${localCartItem.product.imageUrl}" alt="${localCartItem.product.title}">
                    </div>
                    <h2>${localCartItem.product.title}</h2>
                    <div class="price">
                        {{ ${localCartItem.product.title} | VndCurrency }}
                    </div>
                </div>
                <div class="new-item">
                    <div class="image">
                        <img src="${fetchedCartItem.product.imageUrl}" alt="${fetchedCartItem.product.title}">
                    </div>
                    <h2>${fetchedCartItem.product.title}</h2>
                    <div class="price">
                        {{ ${fetchedCartItem.product.title} | VndCurrency }}
                    </div>
                </div>
            </div>
        `;
        return '';
    }
}

