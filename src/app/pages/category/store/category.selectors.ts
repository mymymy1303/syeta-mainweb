import * as fromReducers from './category.reducer';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { Category } from './category.model';

export const getCategoryState = createFeatureSelector<fromReducers.State>('categoryFeature');

export const selectCategoryEntities = createSelector(fromReducers.selectEntities);
export const selectAllCategories = createSelector(
    getCategoryState,
    fromReducers.selectAll
);

export const selectCategoryEntityById = (id: string) => createSelector(
    getCategoryState,
    state => state.entities[id]
);

export const selectCategoryTitleAndId = createSelector(
    selectAllCategories,
    state => state.map((category: Category) => {
        return {
            id: category.id,
            title: category.title
        };
    })
);
