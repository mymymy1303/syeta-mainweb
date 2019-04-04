import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Category } from './category.model';
import { CategoryActions, CategoryActionTypes } from './category.actions';

export interface State extends EntityState<Category> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: CategoryActions
): State {
  switch (action.type) {
    case CategoryActionTypes.AddCategory: {
      return adapter.addOne(action.payload.category, state);
    }

    case CategoryActionTypes.UpsertCategory: {
      return adapter.upsertOne(action.payload.category, state);
    }

    case CategoryActionTypes.AddCategories: {
      return adapter.addMany(action.payload.categories, state);
    }

    case CategoryActionTypes.UpsertCategories: {
      return adapter.upsertMany(action.payload.categories, state);
    }

    case CategoryActionTypes.UpdateCategory: {
      return adapter.updateOne(action.payload.category, state);
    }

    case CategoryActionTypes.UpdateCategories: {
      return adapter.updateMany(action.payload.categories, state);
    }

    case CategoryActionTypes.DeleteCategory: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CategoryActionTypes.DeleteCategories: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CategoryActionTypes.LoadCategories: {
      return adapter.addAll(action.payload.categories, state);
    }

    case CategoryActionTypes.ClearCategories: {
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
