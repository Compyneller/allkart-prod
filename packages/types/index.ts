import { Prisma } from "@repo/db";

export interface StoreTypes {
  id: number;
  shop_name: string;
  categoryId: string;
  category: CategoryType;
  home_delivery?: boolean | false;
  handling_charge?: number;
  delivery_charge?: number;
  free_delivery_after?: number;
  isActive?: boolean;
  address: StoreAddressTypes | null;
  razorpayAccountId?: string;
  ownerId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserType {
  id: string;
  createdAt?: Date;
  updatedAt?: Date;
  email: string;
  emailVerified: boolean;
  banned: boolean;
  banReason: string | null;
  banExpires: Date;
  name: string;
  image: string | null;
  role: "admin" | "seller" | "user";
}

export interface addressTypes {
  id: string;
  name: string;
  contact: string;
  address: string;
  pincode: string;
  city: string;
  userId: string;
  state: string;
  landmark: string;
  createdAt: Date;
  updatedAt: Date;
}
export interface StoreAddressTypes {
  id: string;
  name: string;
  contact: string;
  address: string;
  pincode: string;
  district: string;
  city: string;
  state: string;
  lat: number;
  long: number;
  landmark: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface sellerDocumentsType {
  aadhar: string;
  pancard: string;
  gst?: string;
}

export interface ProductType {
  id: number;
  storeId: number;
  title: string;
  description: string;
  categoryId: string;
  category?: {
    id: string;
    name: string;
  };
  variants: ProductVariant[];
}

export interface ProductImage {
  id?: string;
  url: string;
  original_filename: string;
  bytes: number;
  publicId: string;
}

export interface ProductVariant {
  id?: string;
  selling_price: number | Prisma.Decimal;
  mrp: number | Prisma.Decimal;
  unit: string;
  unit_value: string;
  stock: number;
  sku: string;
  prod_img: ProductImage[];
  Product?: ProductType;
}

export interface ProductResponseType {
  Product: ProductType;
  id: string;
  selling_price: number | Prisma.Decimal;
  mrp: number | Prisma.Decimal;
  unit: string;
  unit_value: string;
  stock: number;
  sku: string;
  prod_img: ProductImage[];
}

export interface CartType {
  productId: number;
  variantId: string;
  quantity: number;
}

export interface CartProductType {
  productId: number;
  variantId: string;
  quantity: number;
  variant: ProductVariant;
}

export interface CategoryType {
  id?: string;
  name: string;
  url: string;
  publicId: string;
  original_filename: string;
  bytes: number;
  products: ProductType[];
}
