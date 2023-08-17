import Scrollbar from "@libs/Scrollbar";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { useTranslation } from "next-i18next";
import { getDirection } from "@utils/getDirection";
import { useRouter } from "next/router";
import Heading from "@components/Element/Heading";
import FilterOptions from "./FilterItems";
import { useCallback, useEffect } from "react";
import { setMobileFilter } from "@features/theme/themeSlice";
import { useAppDispatch } from "@hooks/useRedux";
import { CategoryFilter } from "@query/types";
import { useGetSingleCategory } from "@query/category/get-category";
import { useGetProductFromCategory } from "@query/category/get-product-from-category";
import ProductLoader from "@components/Product/Loader";

const FilterSidebar = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { t } = useTranslation("common");
  const dir = getDirection(router.locale);

  const closeFilter = useCallback(
    () => dispatch(setMobileFilter(false)),
    [dispatch]
  );

  const {
    query: { slug, subcategory, color, size, minprice, maxprice, onsale, sort },
  } = router;

  // Convert string arrays from query to actual arrays
  const subcategoryArray = Array.isArray(subcategory)
    ? subcategory
    : subcategory
    ? [subcategory]
    : [];

  const colorArray = Array.isArray(color) ? color : color ? [color] : [];

  const sizeArray = Array.isArray(size) ? size : size ? [size] : [];

  // Create the CategoryFilter object from the router.query properties
  const categoryFilter: CategoryFilter = {
    slug: slug as string,
    subcategory: subcategoryArray,
    color: colorArray,
    size: sizeArray,
    minprice: minprice as string,
    maxprice: maxprice as string,
    onsale: onsale as string,
    sort: sort as string,
  };

  const { data: CategoryData } = useGetSingleCategory({
    slug: slug as string,
  });

  const { data: Products, isLoading } =
    useGetProductFromCategory(categoryFilter);

  if (isLoading) {
    return <ProductLoader />;
  }

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="w-full border border-border-base flex justify-between items-center relative ltr:pr-5 rtl:pl-5 md:ltr:pr-7 md:rtl:pl-7 shrink-0 py-0.5">
        <button
          className="flex items-center justify-center px-4 py-6 text-2xl transition-opacity md:px-5 lg:py-8 focus:outline-none hover:opacity-60"
          onClick={closeFilter}
          aria-label="close"
        >
          {dir === "rtl" ? (
            <IoArrowForward className="text-brand-dark" />
          ) : (
            <IoArrowBack className="text-brand-dark" />
          )}
        </button>
        <Heading
          variant="titleMedium"
          className="w-full text-center ltr:pr-6 rtl:pl-6"
        >
          {t("text-filters")}
        </Heading>
      </div>

      <Scrollbar className="flex-grow mb-auto menu-scrollbar">
        <div className="flex flex-col px-5 py-7 md:px-7 text-heading">
          <FilterOptions
            products={Products?.data}
            subCategory={CategoryData?.data?.subcategories}
          />
        </div>
      </Scrollbar>

      {/* <div className="flex items-center justify-center leading-4 text-15px md:text-base px-7 shrink-0 h-14 bg-fill-secondary text-brand-dark ">
        2,683 {t("text-items-found")}
      </div> */}
    </div>
  );
};

export default FilterSidebar;
