import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducers from './cart.reducer';

export const getCartState = createFeatureSelector<fromReducers.State>('cartFeature');

export const getCartItemById = (id: string) => createSelector(
    getCartState,
    state => state.entities[id]
);

export const getIds = createSelector(
    getCartState,
    state => state.ids
);

export const getTotalItemsQuantity = createSelector(
    getCartState,
    (state) => {
        let sum = 0;
        for (const id in state.entities) {
            if (state.entities.hasOwnProperty(id)) {
                const element = state.entities[id];
                sum += element.quantity;
            }
        }
        return sum;
    }
);

export const getTotalPrices = createSelector(
    getCartState,
    (state) => {
        let sum = 0;
        for (const id in state.entities) {
            if (state.entities.hasOwnProperty(id)) {
                const element = state.entities[id];
                sum += element.quantity * element.product.price;
            }
        }
        return sum;
    }
);

export const getCartItems = createSelector(
    getCartState,
    fromReducers.selectAll
);
