export interface Cart {
  id: string;
  product: CartItem;
  quantity: number;
  totalPrice: number;
}

export interface CartItem {
  title: string;
  imageUrl: string;
  price: number;
}

export interface OrderRequest {
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  note: string;
  productId: string;
  totalPrice: string;
}

export interface Order {
  id: string;
  fullName: string;
  phoneNumber: string;
  email: string;
  address: string;
  note: string;
  createdUtc: string;
  productId: string;
}

export interface SimpleCartItem {
  [key: string]: number;
}
