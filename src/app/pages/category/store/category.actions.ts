import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Category, CategoryRequestModel, CategoryUpdateRequestModel } from './category.model';

export enum CategoryActionTypes {
  LoadCategoriesRequest = '[Admin page/List categories - Sidemenu] Load categories request',
  LoadCategories = '[Category] Load Categories',
  AddCategoryRequest = '[Admin page/Add category] Add Category Request',
  AddCategory = '[Category] Add Category',
  UpsertCategory = '[Category] Upsert Category',
  AddCategories = '[Category] Add Categories',
  UpsertCategories = '[Category] Upsert Categories',
  UpdateCategoryWithImageRequest = '[Admin Page/Edit Category] Update Category With Image Request',
  UpdateCategoryWithoutImageRequest = '[Admin Page/Edit Category] Update Category Without Request',
  UpdateCategory = '[Category] Update Category',
  UpdateCategories = '[Category] Update Categories',
  DeleteCategory = '[Category] Delete Category',
  DeleteCategories = '[Category] Delete Categories',
  ClearCategories = '[Category] Clear Categories',
  FetchCategory = '[Category] Fetch Category',
}

export class LoadCategoriesRequest implements Action {
  readonly type = CategoryActionTypes.LoadCategoriesRequest;
}

export class LoadCategories implements Action {
  readonly type = CategoryActionTypes.LoadCategories;

  constructor(public payload: { categories: Category[] }) { }
}

export class AddCategoryRequest implements Action {
  readonly type = CategoryActionTypes.AddCategoryRequest;

  constructor(public payload: CategoryRequestModel) { }
}

export class AddCategory implements Action {
  readonly type = CategoryActionTypes.AddCategory;

  constructor(public payload: { category: Category }) { }
}

export class UpsertCategory implements Action {
  readonly type = CategoryActionTypes.UpsertCategory;

  constructor(public payload: { category: Category }) { }
}

export class AddCategories implements Action {
  readonly type = CategoryActionTypes.AddCategories;

  constructor(public payload: { categories: Category[] }) { }
}

export class UpsertCategories implements Action {
  readonly type = CategoryActionTypes.UpsertCategories;

  constructor(public payload: { categories: Category[] }) { }
}

export class UpdateCategoryWithImageRequest implements Action {
  readonly type = CategoryActionTypes.UpdateCategoryWithImageRequest;
  constructor(public payload: CategoryUpdateRequestModel) { }
}
export class UpdateCategoryWithoutImageRequest implements Action {
  readonly type = CategoryActionTypes.UpdateCategoryWithoutImageRequest;
  constructor(public payload: CategoryUpdateRequestModel) { }
}

export class UpdateCategory implements Action {
  readonly type = CategoryActionTypes.UpdateCategory;

  constructor(public payload: { category: Update<Category> }) { }
}

export class UpdateCategories implements Action {
  readonly type = CategoryActionTypes.UpdateCategories;

  constructor(public payload: { categories: Update<Category>[] }) { }
}

export class DeleteCategory implements Action {
  readonly type = CategoryActionTypes.DeleteCategory;

  constructor(public payload: { id: string }) { }
}

export class DeleteCategories implements Action {
  readonly type = CategoryActionTypes.DeleteCategories;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearCategories implements Action {
  readonly type = CategoryActionTypes.ClearCategories;
}

export class FetchCategory implements Action {
  readonly type = CategoryActionTypes.FetchCategory;
  constructor(public payload: string) { }
}

export type CategoryActions =
  LoadCategories
  | AddCategoryRequest
  | AddCategory
  | UpsertCategory
  | AddCategories
  | UpsertCategories
  | UpdateCategoryWithImageRequest
  | UpdateCategoryWithoutImageRequest
  | UpdateCategory
  | UpdateCategories
  | DeleteCategory
  | DeleteCategories
  | ClearCategories
  | FetchCategory;
