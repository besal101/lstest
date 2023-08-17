import AddCartDesktop from "@components/Element/Button/AddCartDesktop";
import AddToCartMobile from "@components/Element/Button/AddCartMobile";
import Heading from "@components/Element/Heading";
import ProductFeatures from "@components/Features";
import { OpenTopBar } from "@features/cart/CartTopbar/cartTopbarSlice";
import { cartAddItems } from "@features/cart/cartSlice";
import { setOpenDrawer } from "@features/theme/themeSlice";
import { useAppDispatch } from "@hooks/useRedux";
import ThumbnailCarousel from "@libs/Thumbnail-Carousel";
import { Product, SpecificationsType, WeightsType } from "@query/types";
import { ROUTES } from "@utils/routes";
import usePrice, { formatPrice } from "@utils/usePrice";
import useProduct from "@utils/useProduct";
import useWindowSize from "@utils/useWindowSize";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useState } from "react";
import AnimateHeight from "react-animate-height";
import { AiFillStar } from "react-icons/ai";
import { HiMinusSm, HiPlusSm } from "react-icons/hi";
import Color from "./ColorVariation";
import ProductLoader from "./Loader";
import Size from "./SizeVariation";

interface IProductDetailProps {
  product: Product;
}

const ProductDetail: React.FC<IProductDetailProps> = ({ product }) => {
  let CurrencyCode = "aed";
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [currentMenu, setCurrentMenu] = useState<string>("features");
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? "" : value;
    });
  };
  const router = useRouter();
  const [productLoading, setProductLoading] = useState<boolean>(false);
  const {
    discountPrice,
    reviews,
    category,
    shortDesc,
    longDesc,
    specifications,
    weightDimension,
    variationType,
    id: productId,
  } = product;

  const {
    productImages,
    productStock,
    productPrice,
    productCode,
    variationColor,
    productQuantity,
    variationSize,
    availableColors,
    availableSizes,
    variationId,
    productQuantityIncrement,
    productQuantityDecrement,
  } = useProduct(product);

  const { price, basePrice, discountedAmount, amount } = usePrice({
    basePrice: productPrice,
    discount: discountPrice,
    currencyCode: CurrencyCode,
    locale: locale as string,
  });

  const addToCartHandler = () => {
    width! < 768
      ? dispatch(
          OpenTopBar({
            isOpen: true,
            data: {
              productName: product.name as string,
              productPrice: price,
              productImage: productImages[0],
            },
          })
        )
      : dispatch(setOpenDrawer(true));

    dispatch(
      cartAddItems({
        ItemCode: productCode as string,
        productName: product.name as string,
        productPrice: price,
        productAmount: discountedAmount !== 0 ? amount : productPrice,
        productSlug: product.slug,
        productQuantity: +productQuantity,
        productImage: productImages[0],
        availableStock: productStock,
        productID: productId as number,
        variationId: variationId as number,
        currency: CurrencyCode,
      })
    );
  };

  const buyNowHandler = useCallback(() => {
    dispatch(
      cartAddItems({
        ItemCode: productCode as string,
        productName: product.name as string,
        productPrice: price,
        productAmount: discountedAmount !== 0 ? amount : productPrice,
        productSlug: product.slug,
        productQuantity: +productQuantity,
        productImage: productImages[0],
        availableStock: productStock,
        productID: productId as number,
        variationId: variationId as number,
        currency: CurrencyCode,
      })
    );
    router.push(ROUTES.CHECKOUT);
  }, [
    CurrencyCode,
    amount,
    discountedAmount,
    dispatch,
    price,
    product.name,
    product.slug,
    productCode,
    productId,
    productImages,
    productPrice,
    productQuantity,
    productStock,
    router,
    variationId,
  ]);

  return (
    <>
      {productLoading ? (
        <ProductLoader />
      ) : (
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 pt-3 md:py-8">
          <aside className="top-4 sm:top-8 md:top-20 lg:sticky h-fit bottom-0">
            <ThumbnailCarousel gallery={productImages} />
          </aside>
          <div className="flex flex-col w-full relative -mt-6 md:mt-0">
            <div className="flex flex-col gap-y-1">
              <Heading variant="productHeading">{product.name}</Heading>
              <div className="flex  mt-1 md:mt-3 space-x-4 sm:space-x-5">
                <div>
                  <span className="text-brand text-xl md:text-2xl font-bold">
                    {price}
                  </span>
                  {discountedAmount !== 0 && (
                    <span className=" text-gray-500 font-semibold md:font-bold text-xs md:text-lg line-through ml-2">
                      {basePrice}
                    </span>
                  )}
                </div>

                {reviews && reviews.length > 0 && (
                  <>
                    <div className="h-7 border-l border-slate-300" />
                    <div className="flex items-center">
                      <a
                        href="#reviews"
                        className="flex items-center text-sm font-medium"
                      >
                        <AiFillStar className="w-5 h-5 pb-[1px] text-yellow-400" />

                        <div className="ml-1 flex">
                          <span>(4.5)</span>
                          <span className="mx-2 hidden md:block">·</span>
                          <span className="text-slate-600 underline hidden md:block">
                            148 reviews
                          </span>
                        </div>
                      </a>
                    </div>
                  </>
                )}
              </div>
              {discountedAmount !== 0 && (
                <div className="flex items-center space-x-1">
                  <span className="text-xs md:text-sm font-medium text-brand-gray">
                    Saving:
                  </span>
                  <span className="text-xs md:text-sm font-bold text-black ml-2">
                    {formatPrice({
                      basePrice: discountedAmount,
                      currencyCode: "AED",
                      locale: locale as string,
                    })}
                  </span>
                </div>
              )}
              <div className="flex flex-col md:flex-row mt-2 gap-2">
                <div className="flex items-center space-x-1">
                  <span className="text-xs md:text-sm font-medium text-brand-gray">
                    Item Code:
                  </span>
                  <span className="text-xs md:text-sm font-medium text-black ml-2">
                    {productCode}
                  </span>
                </div>
                <div className="h-6 border-l border-slate-300 hidden md:block"></div>
                <div className=" items-center space-x-1 hidden md:block">
                  <Link
                    className="text-sm font-medium text-brand-gray"
                    href={`/category/${category?.slug}`}
                  >
                    {category?.name}
                  </Link>
                </div>
              </div>
            </div>

            {/* product variations colors */}
            {(variationType === "variationbycolor" ||
              variationType === "variationbymulti") && (
              <Color
                variations={availableColors}
                productName={variationColor}
              />
            )}

            {(variationType === "variationbysize" ||
              variationType === "variationbymulti") && (
              <Size variations={availableSizes} productSize={variationSize} />
            )}

            {/* ADD TO CART BUTTON */}
            {width! < 768 ? (
              <AddToCartMobile
                stock={productStock}
                quantity={productQuantity}
                QtyIncrement={productQuantityIncrement}
                QtyDecrement={productQuantityDecrement}
                addToCartHandler={addToCartHandler}
                buyNowHandler={buyNowHandler}
              />
            ) : (
              <AddCartDesktop
                stock={productStock}
                quantity={productQuantity}
                QtyIncrement={productQuantityIncrement}
                QtyDecrement={productQuantityDecrement}
                addToCartHandler={addToCartHandler}
                buyNowHandler={buyNowHandler}
              />
            )}
            <div className="border-t border-slate-200 mt-8 lg:mt-12" />

            {/* disclosures */}
            <div className="flex flex-col gap-y-4 py-8 lg:py-12">
              <div>
                <div
                  onClick={() => toggleMenu("features")}
                  className="flex items-center justify-between w-full px-4 py-2.5 md:py-3 font-medium text-left bg-slate-100/80 rounded-lg  "
                >
                  <span className="text-lg font-bold">Features</span>
                  <span className="text-slate-500">
                    {currentMenu === "features" ? (
                      <HiMinusSm className="h-5 w-5 text-slate-500" />
                    ) : (
                      <HiPlusSm className="h-5 w-5 text-slate-500" />
                    )}
                  </span>
                </div>
                <AnimateHeight
                  duration={300}
                  height={currentMenu === "features" ? "auto" : 0}
                >
                  <ProductFeatures shortDesc={shortDesc} />
                </AnimateHeight>
              </div>
              {weightDimension.length > 0 && (
                <div>
                  <div
                    onClick={() => toggleMenu("weightsanddimensions")}
                    className="flex items-center justify-between w-full px-4 py-3 font-medium text-left bg-slate-100/80 rounded-lg  "
                  >
                    <span className="text-lg font-bold">
                      Weights & Dimension
                    </span>
                    <span className="text-slate-500">
                      {currentMenu === "weightsanddimensions" ? (
                        <HiMinusSm className="h-5 w-5 text-slate-500" />
                      ) : (
                        <HiPlusSm className="h-5 w-5 text-slate-500" />
                      )}
                    </span>
                  </div>
                  <AnimateHeight
                    duration={300}
                    height={currentMenu === "weightsanddimensions" ? "auto" : 0}
                  >
                    <table className="w-full px-4 mt-4 pb-2 text-sm md:text-base text-gray-600 text-center">
                      <tbody>
                        {weightDimension?.map(
                          (weight: WeightsType, index: number) => (
                            <tr className="border-t border-b" key={index}>
                              <td className="py-1 bg-brand-lightOne">
                                {weight.title}
                              </td>
                              <td className="py-1"> {weight.description}</td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </AnimateHeight>
                </div>
              )}

              {specifications.length > 0 && (
                <div>
                  <div
                    onClick={() => toggleMenu("specification")}
                    className="flex items-center justify-between w-full px-4 py-3 font-medium text-left bg-slate-100/80 rounded-lg  "
                  >
                    <span className="text-lg font-bold">Specification</span>
                    <span className="text-slate-500">
                      {currentMenu === "specification" ? (
                        <HiMinusSm className="h-5 w-5 text-slate-500" />
                      ) : (
                        <HiPlusSm className="h-5 w-5 text-slate-500" />
                      )}
                    </span>
                  </div>
                  <AnimateHeight
                    duration={300}
                    height={currentMenu === "specification" ? "auto" : 0}
                  >
                    <table className="w-full px-4 mt-4 pb-2 text-sm md:text-base text-gray-600 text-center">
                      <tbody>
                        {specifications?.map(
                          (
                            specification: SpecificationsType,
                            index: number
                          ) => (
                            <tr className="border-t border-b" key={index}>
                              <td className="py-1 bg-brand-lightOne">
                                {specification.title}
                              </td>
                              <td className="py-1">
                                {" "}
                                {specification.description}
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </AnimateHeight>
                </div>
              )}

              <div>
                <div
                  onClick={() => toggleMenu("moreinfo")}
                  className="flex items-center justify-between w-full px-4 py-3 font-medium text-left bg-slate-100/80 rounded-lg  "
                >
                  <span className="text-lg font-bold">
                    More About This Product
                  </span>
                  <span className="text-slate-500">
                    {currentMenu === "moreinfo" ? (
                      <HiMinusSm className="h-5 w-5 text-slate-500" />
                    ) : (
                      <HiPlusSm className="h-5 w-5 text-slate-500" />
                    )}
                  </span>
                </div>
                <AnimateHeight
                  duration={300}
                  height={currentMenu === "moreinfo" ? "auto" : 0}
                >
                  <div
                    className="px-4 pt-4 pb-2 text-sm md:text-base text-gray-600"
                    dangerouslySetInnerHTML={{ __html: longDesc }}
                  ></div>
                </AnimateHeight>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetail;
