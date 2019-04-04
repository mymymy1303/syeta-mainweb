import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromReducers from './product.reducer';

export const getProductState = createFeatureSelector<fromReducers.State>('productFeature');

export const getPaginationInfo = createSelector(
    getProductState,
    state => state.paginationInfo
);

export const getCurrentProduct = createSelector(
    getProductState,
    state => state.currentProduct
);

export const selectAll = createSelector(
    getProductState,
    fromReducers.selectAll
);

export const selectProductEntityById = (id: string) => createSelector(
    getProductState,
    state => state.entities[id]
);

