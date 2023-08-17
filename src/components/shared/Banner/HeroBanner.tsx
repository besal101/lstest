import BannerCard from "../../Element/Cards/BannerCard";
import useWindowSize from "@utils/useWindowSize";
import Carousel from "@libs/Carousel";
import { SwiperSlide } from "swiper/react";

interface BannerProps {
  data: any;
  className?: string;
  girdClassName?: string;
}

const HeroBanner: React.FC<BannerProps> = ({
  data,
  className = "mb-3 md:mb-3 lg:mb-3 xl:mb-3",
  girdClassName = "2xl:gap-4",
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      {width! < 768 ? (
        <Carousel
          prevActivateId="banner-carousel-button-prev"
          nextActivateId="banner-carousel-button-next"
        >
          {data?.sliderBanner?.map((banner: any) => (
            <SwiperSlide key={`banner-key-${banner.id}`}>
              <BannerCard
                banner={banner}
                effectActive={true}
                variant="rounded"
              />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div
          className={`grid gap-4 grid-cols-1 sm:grid-cols-2 ${girdClassName}`}
        >
          <Carousel
            pagination={{
              clickable: true,
            }}
            navigation={false}
            autoplay={false}
          >
            {data?.sliderBanner?.map((banner: any) => (
              <SwiperSlide key={`banner-key-${banner.id}`}>
                <BannerCard
                  banner={banner}
                  effectActive={true}
                  variant="rounded"
                />
              </SwiperSlide>
            ))}
          </Carousel>
          <BannerCard
            key={`banner--key-${data?.fixedBanner?.id}`}
            banner={data?.fixedBanner}
            effectActive={true}
            variant="rounded"
          />
        </div>
      )}
    </div>
  );
};

export default HeroBanner;
