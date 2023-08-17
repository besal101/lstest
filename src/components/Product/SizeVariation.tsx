import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

interface ISizeProps {
  variations: any;
  productSize: string | undefined;
}

const Size: React.FC<ISizeProps> = ({ productSize, variations }) => {
  const router = useRouter();
  const handleProductSizeHandler = (sizeName: string) => {
    const query = router.query;
    query.size = sizeName;
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  return (
    <div className="pt-2">
      <div className="flex justify-between font-medium text-sm">
        <span className="text-sm md:text-[16px] font-medium">
          Size:
          <span className="ml-1 font-semibold">{productSize}</span>
        </span>
        {/* <Link
          target="_blank"
          rel="noopener noreferrer"
          href="##"
          className="text-brand text-sm md:text-[16px] font-medium underline hover:text-brand-secondary transition-colors duration-200 ease-in-out"
        >
          See sizing chart
        </Link> */}
      </div>
      <div className="flex flex-row gap-2 mt-2">
        {variations?.map((variation: any, index: number) => (
          <div
            className={`relative h-10 sm:h-11 rounded-2xl border flex items-center justify-center w-16 
                text-sm sm:text-base font-semibold select-none overflow-hidden z-0 cursor-pointer  hover:bg-primary-6000 ${
                  variation === productSize
                    ? "bg-brand border-primary-6000 text-white hover:bg-primary-600"
                    : "border-slate-300 text-slate-900"
                }`}
            key={index}
            role="button"
            data-sizename={variation}
            onClick={() => handleProductSizeHandler(variation)}
          >
            {variation}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Size;
