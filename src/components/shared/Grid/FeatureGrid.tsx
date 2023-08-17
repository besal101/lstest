import PayoutIcon from "@components/icons/featured/Payout-icon";
import DeliveryIcon from "@components/icons/featured/delivery-icon";
import ChatIcon from "@components/icons/featured/promotion-icon";
import FeedbackIcon from "@components/icons/featured/feedback-icon";
import FeaturedCard from "@components/Element/Cards/FeaturedCard";
import useWindowSize from "@utils/useWindowSize";
import Carousel from "@libs/Carousel";
import { SwiperSlide } from "swiper/react";
import { ROUTES } from "@utils/routes";
import PromotionIcon from "@components/icons/featured/promotion-icon";

const data = [
  {
    id: 1,
    icon: (
      <DeliveryIcon
        color="#F38E00"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: "feature-title-one",
    href: ROUTES.HOME,
    bgColor: "#FFEED6",
  },
  {
    id: 2,
    icon: (
      <PayoutIcon
        color="#0095E7"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
        width="44px"
        height="44px"
      />
    ),
    title: "feature-title-two",
    href: ROUTES.HOME,
    bgColor: "#CCEDFF",
  },
  {
    id: 3,
    icon: (
      <PromotionIcon
        color="#1b5f61"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
        width="44px"
        height="44px"
      />
    ),
    title: "feature-title-three",
    href: ROUTES.HOME,
    bgColor: "#D7F1EC",
  },
  {
    id: 4,
    icon: (
      <FeedbackIcon
        color="#bf1616"
        className="transform scale-75 xl:scale-90 3xl:scale-100"
      />
    ),
    title: "feature-title-four",
    href: ROUTES.HOME,
    bgColor: "#FFE1E1",
  },
];

interface Props {
  className?: string;
}

const breakpoints = {
  "1024": {
    slidesPerView: 3,
    spaceBetween: 16,
  },
  "768": {
    slidesPerView: 2,
    spaceBetween: 16,
  },
  "640 ": {
    slidesPerView: 2,
    spaceBetween: 12,
  },
  "0": {
    slidesPerView: 1,
  },
};

const FeatureGrid: React.FC<Props> = ({
  className = "mb-12 md:mb-14 xl:mb-16",
}) => {
  const { width } = useWindowSize();
  return (
    <div className={`heightFull ${className}`}>
      {width! < 1536 ? (
        <Carousel
          autoplay={false}
          breakpoints={breakpoints}
          prevActivateId="featured-carousel-button-prev"
          nextActivateId="featured-carousel-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide key={`featured-key-${item.id}`}>
              <FeaturedCard item={item} />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="2xl:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {data?.map((item) => (
            <FeaturedCard item={item} key={`featured-key-${item.id}`} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeatureGrid;
