import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product, AddProductRequestModel, ProductUpdateModel, ProductDeleteModel } from './product.model';

export enum ProductActionTypes {
  LoadProducts = '[Product] Load Products',
  AddProduct = '[Product] Add Product',
  UpsertProduct = '[Product] Upsert Product',
  AddProducts = '[Product] Add Products',
  UpsertProducts = '[Product] Upsert Products',
  UpdateProduct = '[Product] Update Product',
  UpdateProducts = '[Product] Update Products',
  DeleteProduct = '[Product] Delete Product',
  DeleteProducts = '[Product] Delete Products',
  ClearProducts = '[Product] Clear Products',
  AddProductRequest = '[Product] Add Product Request',
  LoadAllProductsRequest = '[Product] Load All Products Request',
  UpdatePaginationInfo = '[Product] Update Pagination Info',
  LoadProductsByCategoryRequest = '[Product] Load Products By Category Request',
  FetchProduct = '[Product] Fetch Product',
  FetchProductSuccessful = '[Product] Fetch Product Successful',
  FetchProductFailed = '[Product] Fetch Product Failed',
  UpdateProductWithoutImageRequest = '[Product] Update Product Without Image Request',
  UpdateProductWithImageRequest = '[Product] Update Product With Image Request',
  DeleteProductRequest = '[Product] Delete Product Request'
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProducts;

  constructor(public payload: { products: Product[] }) { }
}

export class AddProduct implements Action {
  readonly type = ProductActionTypes.AddProduct;

  constructor(public payload: { product: Product }) { }
}

export class UpsertProduct implements Action {
  readonly type = ProductActionTypes.UpsertProduct;

  constructor(public payload: { product: Product }) { }
}

export class AddProducts implements Action {
  readonly type = ProductActionTypes.AddProducts;

  constructor(public payload: { products: Product[] }) { }
}

export class UpsertProducts implements Action {
  readonly type = ProductActionTypes.UpsertProducts;

  constructor(public payload: { products: Product[] }) { }
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: { product: Update<Product> }) { }
}

export class UpdateProducts implements Action {
  readonly type = ProductActionTypes.UpdateProducts;

  constructor(public payload: { products: Update<Product>[] }) { }
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DeleteProduct;

  constructor(public payload: { id: string }) { }
}

export class DeleteProducts implements Action {
  readonly type = ProductActionTypes.DeleteProducts;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearProducts implements Action {
  readonly type = ProductActionTypes.ClearProducts;
}

export class AddProductRequest implements Action {
  readonly type = ProductActionTypes.AddProductRequest;
  constructor(public payload: AddProductRequestModel) { }
}

export class LoadAllProductsRequest implements Action {
  readonly type = ProductActionTypes.LoadAllProductsRequest;
  constructor(public payload: { sortBy?: string, page?: string, size?: string }) { }
}

export class LoadProductsByCategoryRequest implements Action {
  readonly type = ProductActionTypes.LoadProductsByCategoryRequest;
  constructor(public payload: { categoryId: string, sortBy?: string, page?: string, size?: string }) { }
}

export class UpdatePaginationInfo implements Action {
  readonly type = ProductActionTypes.UpdatePaginationInfo;
  constructor(public payload: {
    currentPage: string;
    nextPage: string,
    size: string,
    sortBy: string,
    totalPages: string,
    currentCategoryId: string
  }) { }
}

export class FetchProduct implements Action {
  readonly type = ProductActionTypes.FetchProduct;
  constructor(public payload: string) { }
}

export class FetchProductSuccessful implements Action {
  readonly type = ProductActionTypes.FetchProductSuccessful;
  constructor(public payload: Product) { }
}

export class FetchProductFailed implements Action {
  readonly type = ProductActionTypes.FetchProductFailed;
}

export class UpdateProductWithoutImageRequest implements Action {
  readonly type = ProductActionTypes.UpdateProductWithoutImageRequest;
  constructor(public payload: ProductUpdateModel) { }
}

export class UpdateProductWithImageRequest implements Action {
  readonly type = ProductActionTypes.UpdateProductWithImageRequest;
  constructor(public payload: ProductUpdateModel) { }
}

export class DeleteProductRequest implements Action {
  readonly type = ProductActionTypes.DeleteProductRequest;
  constructor(public payload: ProductDeleteModel) {}
}

export type ProductActions =
  LoadProducts
  | AddProduct
  | UpsertProduct
  | AddProducts
  | UpsertProducts
  | UpdateProduct
  | UpdateProducts
  | DeleteProduct
  | DeleteProducts
  | ClearProducts
  | AddProductRequest
  | LoadAllProductsRequest
  | UpdatePaginationInfo
  | LoadProductsByCategoryRequest
  | FetchProduct
  | FetchProductSuccessful
  | FetchProductFailed
  | UpdateProductWithoutImageRequest
  | UpdateProductWithImageRequest
  | DeleteProductRequest;
