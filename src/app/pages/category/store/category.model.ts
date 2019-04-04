export interface Category {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  url: string;
  createdUtc: string;
  lastModifiedUtc: string;
  lastModifiedByAdminId: string;
  createdByAdminId: string;
  version: number;
  versionError?: boolean;
}

export interface CategoryRequestModel {
  title: string;
  subtitle: string;
  image?: any;
  createdByAdminId: string;
}

export interface CategoryUpdateRequestModel {
  id: string;
  title: string;
  subtitle: string;
  image?: any;
  adminId: string;
  isNewImage: string;
  version: string;
}
