import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from './product.model';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends EntityState<Product> {
  paginationInfo: {
    currentPage: string;
    nextPage: string,
    size: string,
    sortBy: string,
    totalPages: string,
    currentCategoryId: string,
  };
  currentProduct: Product;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: State = adapter.getInitialState({
  paginationInfo: {
    currentPage: '1',
    nextPage: '-1',
    size: '5',
    sortBy: '1',
    totalPages: '1',
    currentCategoryId: ''
  },
  currentProduct: null
});

export function reducer(
  state = initialState,
  action: ProductActions
): State {
  switch (action.type) {
    case ProductActionTypes.AddProduct: {
      return adapter.addOne(action.payload.product, state);
    }

    case ProductActionTypes.UpsertProduct: {
      return adapter.upsertOne(action.payload.product, state);
    }

    case ProductActionTypes.AddProducts: {
      return adapter.addMany(action.payload.products, state);
    }

    case ProductActionTypes.UpsertProducts: {
      return adapter.upsertMany(action.payload.products, state);
    }

    case ProductActionTypes.UpdateProduct: {
      return adapter.updateOne(action.payload.product, state);
    }

    case ProductActionTypes.UpdateProducts: {
      return adapter.updateMany(action.payload.products, state);
    }

    case ProductActionTypes.DeleteProduct: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ProductActionTypes.DeleteProducts: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ProductActionTypes.LoadProducts: {
      return adapter.addAll(action.payload.products, state);
    }

    case ProductActionTypes.ClearProducts: {
      return adapter.removeAll(state);
    }

    case ProductActionTypes.UpdatePaginationInfo: {
      return {
        ...state,
        paginationInfo: {
          currentPage: action.payload.currentPage,
          nextPage: action.payload.nextPage,
          size: action.payload.size,
          sortBy: action.payload.sortBy,
          totalPages: action.payload.totalPages,
          currentCategoryId: action.payload.currentCategoryId
        }
      };
    }

    case ProductActionTypes.FetchProductSuccessful: {
      return {
        ...state,
        currentProduct: action.payload
      };
    }

    case ProductActionTypes.FetchProductFailed: {
      return {
        ...state,
        currentProduct: null
      };
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
