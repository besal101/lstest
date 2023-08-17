export type CategoryType = {
  id: number;
  name: string;
  slug: string;
  arName?: string;
  ruName?: string;
  image: string;
  title?: string;
  description?: string;
  parentCategoryId?: number;
  published: boolean;
  createdAt: Date;
  createdById: number;
  subcategories?: CategoryType[];
};

export type QueryOptionsType = {
  text?: string;
  category?: string;
  status?: string;
  limit?: number;
};

export type ApiResponse<T> = {
  message: string;
  data: T;
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  arName?: string;
  ruName?: string;
  image: string;
  title?: string;
  description?: string;
  parentCategoryId?: number;
  published: boolean;
  createdAt: Date;
  createdById: number;
  subcategories?: Category[];
};

export type CategoryOptionType = {
  limit?: number;
  page?: number;
};

export type VariationType =
  | "single"
  | "variationbycolor"
  | "variationbysize"
  | "variationbymulti";

export type SpecificationsType = {
  title: string;
  description: string;
};

export type WeightsType = {
  title: string;
  description: string;
};

export type Product = {
  id: number;
  categoryId: number;
  category: Category;
  name: string;
  nameAr: string;
  slug: string;
  published: boolean;
  shortDesc: string;
  shortDescAr: string;
  longDesc: string;
  longDescAr: string;
  price: number;
  discountPrice: number;
  badge: string;
  quantity: number;
  weightDimension: WeightsType[];
  weightDimensionAr: WeightsType[];
  specifications: SpecificationsType[];
  specificationsAr: SpecificationsType[];
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
  itemCode: string;
  itemSeries: string;
  variationType: VariationType;
  mainImage: string;
  variations?: ProductVariation[];
  reviews: Review[];
  createdAt: Date;
  updatedAt: Date;
  createdById: number;
  selected?: ProductVariation[];
};

export type ProductVariation = {
  id: number;
  name: string;
  productId: number;
  colorImage?: string;
  images?: string;
  size?: string;
  price: number;
  quantity: number;
  itemCode: string;
};

export type Review = {
  id: number;
  productId: number;
  name: string;
  content: string;
  rating: number;
  createdAt: Date;
};

export type Coupon = {
  id: number;
  code: string;
  device: string;
  discountPercent: number;
  status: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type CategoryFilter = {
  slug: string;
  subcategory: string[] | string;
  color: string[] | string;
  size: string[] | string;
  minprice: string;
  maxprice: string;
  onsale: string;
  sort: string;
};

export type SearchFilter = {
  searchQuery: string;
  subcategory: string[] | string;
  color: string[] | string;
  size: string[] | string;
  minprice: string;
  maxprice: string;
  onsale: string;
  sort: string;
};

export type cartItem = {
  ItemCode: string;
  availableStock?: number;
  productAmount: number;
  productID: number;
  productImage: string;
  productName: string;
  productPrice?: string;
  productQuantity: number;
  productSlug: string;
  variationId?: number;
  currency: string;
};

export type AddressInput = {
  userId: string;
  fullname: string;
  phone: string;
  apartment?: string;
  address?: string;
  city?: string;
  latitude?: number;
  longitude?: number;
  country?: string;
};

export interface UpdateUserType {
  firstName: string;
  lastName: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  shareProfileData: boolean;
  setAdsPerformance: boolean;
}

export interface ChangePasswordInputType {
  newPassword: string;
  oldPassword: string;
}
