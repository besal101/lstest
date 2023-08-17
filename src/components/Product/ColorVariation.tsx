import { ProductVariation } from "@query/types";
import { CDN_URL_PRODUCT } from "@utils/routes";
import Image from "next/image";
import React from "react";
import { useRouter } from "next/router";

interface IColorProps {
  variations: ProductVariation[] | undefined;
  productName: string;
}

const Color: React.FC<IColorProps> = ({ variations, productName }) => {
  const router = useRouter();
  const handleProductColorHandler = (colorName: string) => {
    const query = router.query;
    query.color = colorName;
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };

  return (
    <div className="pt-6 md:pt-6 pb-4">
      <span className="text-sm md:text-[16px] font-medium">
        Color:
        <span className="ml-1 font-semibold">{productName}</span>
      </span>

      <div className="flex mt-1.5 md:mt-3 flex-row gap-3">
        {variations?.map((variation: ProductVariation, index: number) => (
          <div
            className={`relative flex-1 max-w-[75px] h-10 sm:h-11 rounded-full cursor-pointer ${
              variation.name === productName
                ? "border-2 border-brand"
                : "border-2 border-transparent"
            }`}
            key={index}
            role="button"
            onClick={() => handleProductColorHandler(variation.name)}
          >
            <div className="absolute inset-0.5 rounded-full overflow-hidden z-0">
              <Image
                src={
                  `${CDN_URL_PRODUCT}/thumbnail/${variation.colorImage}` ?? ""
                }
                alt={productName}
                className="absolute w-full h-full object-cover"
                height={40}
                width={60}
                style={{ filter: "brightness(0.96)" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Color;
