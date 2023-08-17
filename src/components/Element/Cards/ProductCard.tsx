import { Product, ProductVariation } from "@query/types";
import * as React from "react";
import Image from "next/image";
import cn from "classnames";
import { productPlaceholder } from "@components/Loaders/LoaderImage";
import { useRouter } from "next/router";
import { CDN_URL_PRODUCT } from "@utils/routes";
import { countUniqueNamesAndSizes } from "@utils/functions";
import usePrice from "@utils/usePrice";
import Link from "next/link";

interface IProductCardProps {
  product: Product;
  className?: string;
}

const ProductCard: React.FC<IProductCardProps> = ({ product, className }) => {
  const {
    name,
    mainImage,
    slug,
    discountPrice,
    variationType,
    variations,
    price: total,
    reviews,
  } = product;

  const { locale } = useRouter();
  const { color, size } = countUniqueNamesAndSizes(
    variations as ProductVariation[]
  );

  const { price, basePrice, discountedAmount, amount } = usePrice({
    basePrice: total,
    discount: discountPrice,
    currencyCode: "AED",
    locale: locale as string,
  });

  const [images, setImages] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (mainImage) {
      JSON.parse(mainImage).map((item: string) => {
        setImages((images) => [...images, item]);
      });
    }
  }, [mainImage, product]);

  return (
    <Link href={`/product/${slug}`}>
      <article
        className={cn(
          "flex flex-col group overflow-hidden rounded-lg cursor-pointer transition-all duration-300 shadow-featured hover:shadow-cardHover  h-full",
          className
        )}
        title={name}
      >
        <div className="relative flex-shrink-0">
          <div className="flex aspect-w-11 aspect-h-12 w-full h-0">
            <Image
              src={
                `${CDN_URL_PRODUCT}/thumbnail/${images[0]}` ??
                productPlaceholder
              }
              alt={name || "Product Image"}
              width={230}
              height={200}
              quality={100}
              className="object-cover bg-skin-thumbnail"
              style={{ filter: "brightness(0.96)" }}
            />
          </div>
          {discountPrice !== 0 && (
            <div className="w-full h-full absolute top-0 -left-1">
              <span className="text-[11px]  bg-brand-tertiary md:text-xs font-medium text-white inline-block rounded-tl-lg rounded-tr-none rounded-br-xl rounded-bl-none  px-2.5 pt-1 pb-[3px] mx-0.5 sm:mx-1">
                {discountPrice}% off
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-col px-3 md:px-4 lg:px-[18px] pb-5 lg:pb-6 lg:pt-1.5 h-full">
          <div className="mb-1 lg:mb-1.5">
            <span className="font-semibold text-xs sm:text-5px lg:text-brand-gray">
              {variations !== undefined &&
                (variationType === "variationbycolor"
                  ? `+${variations?.length} Colors`
                  : variationType === "variationbysize"
                  ? `+${variations?.length} Sizes`
                  : variationType === "variationbymulti"
                  ? `+${color} Colors / +${size} Sizes`
                  : null)}
            </span>
          </div>
          <div className="mb-1 lg:mb-1.5">
            <h2 className="text-xs sm:text-15px lg:text-sm text-brand-title leading-5 sm:leading-6 line-clamp-2">
              {name}
            </h2>
          </div>
          <div className="flex flex-row mt-1 justify-start mb-6">
            <span className="text-md text-black font-bold ml-0.5">{price}</span>
            {price !== basePrice && (
              <span>
                <del className="text-xs text-black text-opacity-70 ml-1">
                  {basePrice}
                </del>
              </span>
            )}
          </div>
          <div className="flex flex-row justify-between items-center mt-auto">
            <div className="text-xs bg-brand-green px-2 sm:px-3.5 text-center py-1 rounded-tr-md rounded-br-xl rounded-tl-xl rounded-bl-md text-white">
              Free Delivery
            </div>
            {/* {reviews.length > 0 && <span className="text-sm">⭐4.2</span>} */}
          </div>
        </div>
      </article>
    </Link>
  );
};

export default ProductCard;
