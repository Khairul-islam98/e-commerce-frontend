import { IconType } from "react-icons";
export type TRole = "ADMIN" | "CUSTOMER" | "VENDOR";
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

export interface Icoupon {
  id?: string;
  code?: string;
  discountType?: string;
  discountValue?: number;
  isActive?: boolean;
  minimumSpend?: number;
}

export interface IShopInfo {
  id: string;
  name: string;
  description: string;
  logo: string;
  owner: string;
  isBlacklist: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ICategoryInfo {
  id?: string;
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
  coupon?: Icoupon[];
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

export interface ICheckout {
  productId: string;
  quantity: number;
  colorId: string;
  sizeId: string;
  colorName: string;
  sizeName: string;
  price: number;
  image: string;
  name: string;
  shopId: string;
  shopName: string;
  discount?: number;
}

export interface NavItem {
  children?: NavItem[];
  href: string;
  title: string;
  Icon: IconType;
}
