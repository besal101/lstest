import dynamic from "next/dynamic";
import CategoryLoader from "@components/Loaders/CategoryLoader";
import CategoryCard from "@components/Element/Cards/CateroryCard";
import SectionHeader from "@components/Element/SectionHeader";
import Alert from "@components/Element/Alert";
import { SwiperSlide } from "swiper/react";
import useWindowSize from "@utils/useWindowSize";
// import { Category } from "@utils/routes";
import { LIMITS, ROUTES } from "@utils/routes";
import { CategoryType } from "@query/types";
import { useCategoriesQuery } from "@query/category/get-all-categories";

const Carousel = dynamic(() => import("@libs/Carousel"), {
  ssr: false,
});

interface CategoriesProps {
  className?: string;
}
const breakpoints = {
  "1640": {
    slidesPerView: 9,
    spaceBetween: 24,
  },
  "1280": {
    slidesPerView: 7,
    spaceBetween: 20,
  },
  "1024": {
    slidesPerView: 6,
    spaceBetween: 20,
  },
  "768": {
    slidesPerView: 5,
    spaceBetween: 15,
  },
  "530": {
    slidesPerView: 4,
    spaceBetween: 15,
  },
  "0": {
    slidesPerView: 3,
    spaceBetween: 15,
  },
};

const CategoryGrid: React.FC<CategoriesProps> = ({
  className = "md:pt-3 lg:pt-0 3xl:pb-1.5 mb-11 sm:mb-14 md:mb-14 xl:mb-20 2xl:mb-10",
}) => {
  const { width } = useWindowSize();

  const {
    data: Category,
    error,
    isLoading,
  } = useCategoriesQuery({
    limit: LIMITS.CATEGORIES_LIMITS,
  });

  return (
    <div className={className}>
      <SectionHeader
        sectionHeading="text-categories"
        sectionSubHeading="text-categories-description"
        headingPosition="left"
      />
      <div className="block 2xl:flex justify-center flex-wrap 3xl:-mx-3.5">
        {error ? (
          <Alert message={error.message} className="mb-14 3xl:mx-3.5" />
        ) : width! < 1536 ? (
          <Carousel
            autoplay={false}
            breakpoints={breakpoints}
            buttonGroupClassName="-mt-5 md:-mt-4 lg:-mt-5"
          >
            {isLoading && !Category
              ? Array.from({ length: 16 }).map((_, idx) => {
                  return (
                    <SwiperSlide key={`category--key-${idx}`}>
                      <CategoryLoader uniqueKey={`category-card-${idx}`} />
                    </SwiperSlide>
                  );
                })
              : Category?.data?.map((category: CategoryType) => (
                  <SwiperSlide key={`category--key-${category.id}`}>
                    <CategoryCard
                      item={category}
                      href={{
                        pathname: ROUTES.HOME + "category/" + category.slug,
                      }}
                    />
                  </SwiperSlide>
                ))}
          </Carousel>
        ) : isLoading && !Category ? (
          Array.from({ length: 16 }).map((_, idx) => {
            return (
              <div
                key={`category-card-${idx}`}
                className="shrink-0 lg:px-3.5 2xl:w-[12.5%] 3xl:w-3/9 mb-12"
              >
                <CategoryLoader uniqueKey={`category-card-${idx}`} />
              </div>
            );
          })
        ) : (
          Category?.data?.map((category: CategoryType) => (
            <CategoryCard
              key={`category--key-${category.id}`}
              item={category}
              href={{
                pathname: ROUTES.HOME + "category/" + category.slug,
              }}
              className="shrink-0 2xl:px-3.5 2xl:w-[12.5%] 3xl:w-4/9 mb-12"
            />
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryGrid;
