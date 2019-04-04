import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Cart, OrderRequest, SimpleCartItem } from './cart.model';

export enum CartActionTypes {
  LoadCarts = '[Cart] Load Carts',
  AddCart = '[Cart] Add Cart',
  UpsertCart = '[Cart] Upsert Cart',
  AddCarts = '[Cart] Add Carts',
  UpsertCarts = '[Cart] Upsert Carts',
  UpdateCart = '[Cart] Update Cart',
  UpdateCarts = '[Cart] Update Carts',
  DeleteCart = '[Cart] Delete Cart',
  DeleteCarts = '[Cart] Delete Carts',
  ClearCarts = '[Cart] Clear Carts',
  CheckExistedId = '[Cart] Check existed id',
  FetchFromCart = '[Cart] Fetch from cart',
  MakeOrder = '[Order] Make Order'
}

export class LoadCarts implements Action {
  readonly type = CartActionTypes.LoadCarts;

  constructor(public payload: { carts: Cart[] }) { }
}

export class AddCart implements Action {
  readonly type = CartActionTypes.AddCart;

  constructor(public payload: { cart: Cart }) { }
}

export class UpsertCart implements Action {
  readonly type = CartActionTypes.UpsertCart;

  constructor(public payload: { cart: Cart }) { }
}

export class AddCarts implements Action {
  readonly type = CartActionTypes.AddCarts;

  constructor(public payload: { carts: Cart[] }) { }
}

export class UpsertCarts implements Action {
  readonly type = CartActionTypes.UpsertCarts;

  constructor(public payload: { carts: Cart[] }) { }
}

export class UpdateCart implements Action {
  readonly type = CartActionTypes.UpdateCart;

  constructor(public payload: { cart: Update<Cart> }) { }
}

export class UpdateCarts implements Action {
  readonly type = CartActionTypes.UpdateCarts;

  constructor(public payload: { carts: Update<Cart>[] }) { }
}

export class DeleteCart implements Action {
  readonly type = CartActionTypes.DeleteCart;

  constructor(public payload: { id: string }) { }
}

export class DeleteCarts implements Action {
  readonly type = CartActionTypes.DeleteCarts;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearCarts implements Action {
  readonly type = CartActionTypes.ClearCarts;
}

export class CheckExistedId implements Action {
  readonly type = CartActionTypes.CheckExistedId;

  constructor(public payload: string) { }
}

export class MakeOrder implements Action {
  readonly type = CartActionTypes.MakeOrder;

  constructor(public payload: OrderRequest) { }
}

export class FetchFromCart implements Action {
  readonly type = CartActionTypes.FetchFromCart;

  constructor(public payload: SimpleCartItem) { }
}

export type CartActions =
  LoadCarts
  | AddCart
  | UpsertCart
  | AddCarts
  | UpsertCarts
  | UpdateCart
  | UpdateCarts
  | DeleteCart
  | DeleteCarts
  | ClearCarts
  | CheckExistedId
  | MakeOrder
  | FetchFromCart;
