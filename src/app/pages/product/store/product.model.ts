export interface Product {
  id: string;
  title: string;
  subtitle: string;
  briefContent: string;
  fullContent: string;
  imageUrl: string;
  images: string[];
  price: number;
  quantity: number;
  sale: boolean;
  salePrice: number;
  isDeleted: boolean;
  createdUtc: string;
  lastModifiedUtc: string;
  createdByAdminId: string;
  lastModifiedByAdminId: string;
  version: number;
  pageId: string;
  versionError: boolean;
}

export interface ProductUpdateModel {
  id: string;
  title: string;
  subtitle: string;
  briefContent: string;
  fullContent: string;
  price: number;
  quantity: number;
  pageId: string;
  version: number;
  adminId: string;
  image?: File;
  isNewImage: boolean;
}

export interface ProductDeleteModel {
  id: string;
  adminId: string;
}

export interface AddProductRequestModel {
  title: string;
  subtitle: string;
  briefContent: string;
  fullContent: string;
  price: string;
  quantity: string;
  createdByAdminId: string;
  pageId: string;
  image: any;
}

export interface LoadProductResponse {
  productList: Product[];
  paginationInfo: {
    currentPage: string;
    nextPage: string,
    size: string,
    sortBy: string,
    totalPages: string,
    currentCategoryId: string
  };
}
