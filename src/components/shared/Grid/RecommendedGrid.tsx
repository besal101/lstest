import CollectionCard from "@components/Element/Cards/CollectionCard";
import SectionHeader from "@components/Element/SectionHeader";
import useWindowSize from "@utils/useWindowSize";
import Carousel from "@libs/Carousel";
import { SwiperSlide } from "swiper/react";
import { ROUTES } from "@utils/routes";

interface BannerData {
  id: number;
  slug: string;
  image: string;
  title: string;
  description: string;
}

interface IRecommendedGridProps {
  className?: string;
  headingPosition?: "left" | "center";
  data: BannerData[];
}

const breakpoints = {
  "1024": {
    slidesPerView: 3,
  },
  "768": {
    slidesPerView: 3,
  },
  "540": {
    slidesPerView: 2,
  },
  "0": {
    slidesPerView: 1,
  },
};

const RecommendedGrid: React.FC<IRecommendedGridProps> = ({
  className = "mb-4 lg:mb-6 xl:mb-8 2xl:mb-12 pb-1 lg:pb-0 3xl:pb-2.5",
  headingPosition = "left",
  data,
}) => {
  const { width } = useWindowSize();
  return (
    <div className={className}>
      <SectionHeader
        sectionHeading="recommended-for-you"
        sectionSubHeading="recommended-for-you-sub"
        headingPosition={headingPosition}
      />
      {width! < 1536 ? (
        <Carousel
          breakpoints={breakpoints}
          autoplay={{ delay: 4000 }}
          prevButtonClassName="-start-2.5 -top-14"
          nextButtonClassName="-end-2.5 -top-14"
          className="-mx-1.5 md:-mx-2 xl:-mx-2.5 -my-4"
          prevActivateId="collection-carousel-button-prev"
          nextActivateId="collection-carousel-button-next"
        >
          {data?.map((item) => (
            <SwiperSlide
              key={`collection-key-${item.id}`}
              className="px-1.5 md:px-2 xl:px-2.5 py-4"
            >
              <CollectionCard
                key={item.id}
                collection={item}
                href={`${ROUTES.CATEGORY}/${item.slug}`}
              />
            </SwiperSlide>
          ))}
        </Carousel>
      ) : (
        <div className="2xl:grid 2xl:grid-cols-4 gap-5 3xl:gap-7">
          {data?.map((item) => (
            <CollectionCard
              key={item.id}
              collection={item}
              href={`${ROUTES.CATEGORY}/${item.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendedGrid;
