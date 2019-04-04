import * as fromAppReducers from './app.reducers';
import { createSelector } from '@ngrx/store';
import * as fromRouter from '@ngrx/router-store';


export const getStateFromRouterState = createSelector(
    fromAppReducers.getRouterState,
    (state: fromRouter.RouterReducerState<fromAppReducers.RouterStateUrl>) => state.state
);

export const getQueryParamsFromRouterState = createSelector(
    getStateFromRouterState,
    (state: fromAppReducers.RouterStateUrl) => state.queryParams
);

export const getParamsFromRouterState = createSelector(
    getStateFromRouterState,
    (state: fromAppReducers.RouterStateUrl) => state.params
);
