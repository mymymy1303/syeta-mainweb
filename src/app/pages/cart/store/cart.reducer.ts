import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Cart } from './cart.model';
import { CartActions, CartActionTypes } from './cart.actions';

export interface State extends EntityState<Cart> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Cart> = createEntityAdapter<Cart>();

export const initialState: State = JSON.parse(localStorage.getItem('cartFeature')) !== null ?
  JSON.parse(localStorage.getItem('cartFeature')) : adapter.getInitialState({

  });

export function reducer(
  state = initialState,
  action: CartActions
): State {
  switch (action.type) {
    case CartActionTypes.AddCart: {
      return adapter.addOne(action.payload.cart, state);
    }

    case CartActionTypes.UpsertCart: {
      return adapter.upsertOne(action.payload.cart, state);
    }

    case CartActionTypes.AddCarts: {
      return adapter.addMany(action.payload.carts, state);
    }

    case CartActionTypes.UpsertCarts: {
      return adapter.upsertMany(action.payload.carts, state);
    }

    case CartActionTypes.UpdateCart: {
      return adapter.updateOne(action.payload.cart, state);
    }

    case CartActionTypes.UpdateCarts: {
      return adapter.updateMany(action.payload.carts, state);
    }

    case CartActionTypes.DeleteCart: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CartActionTypes.DeleteCarts: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CartActionTypes.LoadCarts: {
      return adapter.addAll(action.payload.carts, state);
    }

    case CartActionTypes.ClearCarts: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
