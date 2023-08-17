import SectionHeader from "@components/Element/SectionHeader";
import ProductCard from "@components/Element/Cards/ProductCard";
import { Product } from "@query/types";
import Carousel from "@libs/Carousel";
import { SwiperSlide } from "swiper/react";
import Alert from "@components/Element/Alert";
import SeeAll from "@components/Element/See-All";
import useWindowSize from "@utils/useWindowSize";
import ProductCardLoader from "@components/Loaders/ProductCardLoader";
import cn from "classnames";
import { useRouter } from "next/router";
import { getDirection } from "@utils/getDirection";

interface ProductsCarouselProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  categorySlug?: string;
  className?: string;
  products?: Product[];
  loading: boolean;
  error?: string;
  limit?: number;
  uniqueKey?: string;
  carouselBreakpoint?: {} | any;
}

const breakpoints = {
  "1921": {
    slidesPerView: 7,
  },
  "1780": {
    slidesPerView: 8,
  },
  "1536": {
    slidesPerView: 7,
  },
  "1280": {
    slidesPerView: 6,
  },
  "1024": {
    slidesPerView: 4,
  },
  "640": {
    slidesPerView: 3,
  },
  "360": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const ProductsCarousel: React.FC<ProductsCarouselProps> = ({
  sectionHeading,
  sectionSubHeading,
  categorySlug,
  className = "mb-8 lg:mb-10 xl:mb-12",
  products,
  loading,
  error,
  limit,
  uniqueKey,
  carouselBreakpoint,
}) => {
  const { width } = useWindowSize();
  const { locale } = useRouter();
  const dir = getDirection(locale);
  return (
    <div className={cn("overflow-hidden", className)}>
      <div className="flex justify-between items-center flex-wrap mb-5 md:mb-6">
        <SectionHeader
          sectionHeading={sectionHeading}
          className="mb-0"
          sectionSubHeading={sectionSubHeading}
        />
      </div>
      {error ? (
        <div className="2xl:pe-10">
          <Alert message={error} />
        </div>
      ) : (
        <div className="heightFull xl:-me-40 2xl:-me-28 4xl:me-0 relative after-item-opacity">
          <Carousel
            breakpoints={carouselBreakpoint || breakpoints}
            className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -mt-4"
            prevButtonClassName="-start-2 md:-start-1.5 lg:-start-2 xl:-start-2.5 2xl:start-5 -top-12 3xl:top-auto 3xl:-translate-y-2 4xl:-translate-y-10"
            nextButtonClassName={`-end-2 xl:end-40 -top-12 3xl:top-auto transform 2xl:translate-x-0 3xl:-translate-y-2 4xl:-translate-y-10 ${
              dir === "rtl" ? "xl:-translate-x-2.5" : "xl:translate-x-2.5"
            }`}
          >
            {loading && !products?.length ? (
              Array.from({ length: limit! }).map((_, idx) => (
                <SwiperSlide
                  key={`${uniqueKey}-${idx}`}
                  className="px-1.5 md:px-2 xl:px-2.5 py-4"
                >
                  <ProductCardLoader uniqueKey={`${uniqueKey}-${idx}`} />
                </SwiperSlide>
              ))
            ) : (
              <>
                {products?.map((product: any, idx) => (
                  <SwiperSlide
                    key={`${uniqueKey}-${idx}`}
                    className="px-1.5 md:px-2 xl:px-2.5 py-4"
                  >
                    <ProductCard product={product} />
                  </SwiperSlide>
                ))}
                {/* <SwiperSlide className="p-2.5 flex items-center justify-center">
                  <SeeAll href={categorySlug} />
                </SwiperSlide> */}
                {width! > 1024 && width! < 1921 && <SwiperSlide />}
              </>
            )}
          </Carousel>
        </div>
      )}
    </div>
  );
};

export default ProductsCarousel;
