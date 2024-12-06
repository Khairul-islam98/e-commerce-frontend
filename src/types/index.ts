export interface IColor {
  id: string;
  productId: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface ISize {
  id: string;
  productId: string;
  name: string;
  value: string;
  createdAt: string;
  updatedAt: string;
}

export interface IShopInfo {
  id: string;
  name: string;
  description: string;
  logo: string;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryInfo {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IProduct {
  id: string;
  name: string;
  image: string[];
  rating: number;
  shopId: string;
  stock: number;
  isDeleted: boolean;
  price: number;
  discount: number;
  description: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  shopInfo: IShopInfo;
  categoryInfo: ICategoryInfo;
  colors: IColor[];
  sizes: ISize[];
}

export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface IProductResponse {
  success: boolean;
  status: number;
  message: string;
  meta: IMeta;
  data: IProduct[];
}

export interface ICart {
  cartId: string;
  productId: string;
  quantity: number;
  colorId: string;
  sizeId: string;
  colorName: any;
  sizeName: any;
  price: number;
  image: string;
  name: string;
  shopId: string;
  shopName: string;
  discount?: number;
  isOutOfStock: boolean;
}
