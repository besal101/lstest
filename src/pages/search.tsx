import Layout from "@components/Layout";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import ProductCard from "@components/Element/Cards/ProductCard";
import ChoosenGrid from "@components/shared/Grid/ChoosenGrid";
import FilterOptions from "@features/filter/FilterItems";
import { useBestSellingProducts } from "@query/product/get-bestselling-product";
import { LIMITS } from "@utils/routes";
import Link from "next/link";
import { GiSettingsKnobs } from "react-icons/gi";
import { setMobileFilter } from "@features/theme/themeSlice";
import { useAppDispatch } from "@hooks/useRedux";
import ListBox from "@features/filter/FilterListBox";
import { SORTOPTIONS } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import {
  useGetFromSearch,
  useGetSingleCategory,
} from "@query/category/get-category";
import ProductLoader from "@components/Product/Loader";
import { CategoryFilter, Product, SearchFilter } from "@query/types";
import { ImSpinner2 } from "react-icons/im";
import { useEffect } from "react";
import { useGetProductFromCategory } from "@query/category/get-product-from-category";
import { useGetProductFromSearch } from "@query/category/get-product-from-search";

export default function SearchPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const dispatch = useAppDispatch();

  const {
    query: { subcategory, color, size, minprice, maxprice, onsale, sort, q },
  } = router;

  //   // Convert string arrays from query to actual arrays
  const subcategoryArray = Array.isArray(subcategory)
    ? subcategory
    : subcategory
    ? [subcategory]
    : [];

  const colorArray = Array.isArray(color) ? color : color ? [color] : [];

  const sizeArray = Array.isArray(size) ? size : size ? [size] : [];

  // Create the CategoryFilter object from the router.query properties
  const searchFilter: SearchFilter = {
    searchQuery: q as string,
    subcategory: subcategoryArray,
    color: colorArray,
    size: sizeArray,
    minprice: minprice as string,
    maxprice: maxprice as string,
    onsale: onsale as string,
    sort: sort as string,
  };

  const { data, isLoading } = useGetProductFromSearch(searchFilter);

  if (isLoading) {
    return <ProductLoader />;
  }

  return (
    <div className="container mx-auto px-4 flex flex-col gap-y-10 scroll-smooth pt-3 md:p-8">
      <div className="space-y-5 lg:space-y-7">
        <main>
          <div className="flex flex-col lg:flex-row">
            <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-8 border-t lg:border-t-0 shadow-md hidden md:block" />
            <div className="flex-1 ">
              <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-x-3 gap-y-3">
                {data?.products.map((product: Product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

SearchPage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const locale = ctx.locale;
  const session = await getSession(ctx);

  const translations = await serverSideTranslations(locale!, [
    "common",
    "forms",
    "item",
  ]);

  return {
    props: {
      ...translations,
      session,
    },
  };
};
