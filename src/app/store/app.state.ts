import { RouterReducerState } from '@ngrx/router-store';
export interface IAppState {
    router?: RouterReducerState;
}

export const initialAppState: IAppState = {
};

export function getInitialState(): IAppState {
    return initialAppState;
}
