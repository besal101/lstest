import ChoosenCard from "@components/Element/Cards/ChoosenCard";
import useWindowSize from "@utils/useWindowSize";
import Carousel from "@libs/Carousel";
import { SwiperSlide } from "swiper/react";

interface BannerProps {
  className?: string;
}

export const ChoosenGridCards = [
  {
    id: 1,
    title: "Love Spice Food",
    slug: "search",
    image: {
      mobile: {
        url: "/banner/banner-mobile-3.png",
        width: 450,
        height: 255,
      },
      desktop: {
        url: "/banner/banner-3.png",
        width: 597,
        height: 340,
      },
    },
  },
  {
    id: 2,
    title: "Amazing Pet Food",
    slug: "search",
    image: {
      mobile: {
        url: "/banner/banner-mobile-4.png",
        width: 450,
        height: 255,
      },
      desktop: {
        url: "/banner/banner-4.png",
        width: 597,
        height: 340,
      },
    },
  },
  {
    id: 3,
    title: "Your Perfect Diet",
    slug: "search",
    image: {
      mobile: {
        url: "/banner/banner-mobile-5.png",
        width: 450,
        height: 255,
      },
      desktop: {
        url: "/banner/banner-5.png",
        width: 597,
        height: 340,
      },
    },
  },
];

const breakpoints = {
  "560": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 1,
  },
};

const ChoosenGrid: React.FC<BannerProps> = ({ className = "mb-3 xl:mb-6" }) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      {width! < 1280 ? (
        <Carousel
          breakpoints={breakpoints}
          prevActivateId="bundle-carousel-button-prev"
          nextActivateId="bundle-carousel-button-next"
        >
          {ChoosenGridCards?.map((banner: any) => (
            <SwiperSlide key={`bundle-key-${banner.id}`}>
              <ChoosenCard banner={banner} effectActive={true} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className={`grid gap-4 2xl:gap-5 grid-cols-1 sm:grid-cols-3`}>
          {ChoosenGridCards?.map((banner: any) => (
            <ChoosenCard
              key={`banner--key${banner.id}`}
              banner={banner}
              effectActive={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ChoosenGrid;
