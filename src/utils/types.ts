import { QueryKey } from "@tanstack/react-query";

export type BannerImageType = {
  id: number;
  title: string;
  slug: string;
  image: {
    mobile: {
      url: string;
      width: number;
      height: number;
    };
    desktop: {
      url: string;
      width: number;
      height: number;
    };
  };
};

export type BannersType = {
  sliderBanner: BannerImageType[];
  fixedBanner: BannerImageType;
};

export type CategoryType = {
  id: number;
  slug: string;
  name: string;
  image: string;
};

export type cartItem = {
  ItemCode: string;
  availableStock: number;
  productAmount: number;
  productID: number;
  productImage: string;
  productName: string;
  productPrice: string;
  productQuantity: number;
  productSlug: string;
  variationId: number;
  currency: string;
};

export type DeliveryModalState =
  | "VIEW_ADDRESS_MODAL"
  | "ADD_ADDRESS_FROM_MAP"
  | "";
