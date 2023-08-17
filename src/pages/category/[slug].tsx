import Container from "@components/Container";
import ProductCard from "@components/Element/Cards/ProductCard";
import Layout from "@components/Layout";
import ProductLoader from "@components/Product/Loader";
import FilterOptions from "@features/filter/FilterItems";
import ListBox from "@features/filter/FilterListBox";
import { setMobileFilter } from "@features/theme/themeSlice";
import { useAppDispatch } from "@hooks/useRedux";
import { useGetSingleCategory } from "@query/category/get-category";
import { useGetProductFromCategory } from "@query/category/get-product-from-category";
import { CategoryFilter, Product } from "@query/types";
import { SORTOPTIONS } from "@utils/routes";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { GiSettingsKnobs } from "react-icons/gi";

export default function CategoryPage() {
  const { t } = useTranslation("common");
  const router = useRouter();

  const dispatch = useAppDispatch();

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
    <Container>
      <div className="container mx-auto px-4 flex flex-col gap-y-10 scroll-smooth pt-3 md:p-8">
        <div className="space-y-5 lg:space-y-7">
          <div className="max-w-screen-sm pt-4">
            <h2 className="block text-2xl sm:text-3xl lg:text-4xl font-bold">
              {CategoryData?.data?.name}
            </h2>
            <span className="block mt-4 text-brand-secondary text-sm sm:text-base">
              {CategoryData?.data?.description}
            </span>
          </div>
          <hr className="border-slate-200 mt-4"></hr>
          <main>
            <div className="flex flex-col lg:flex-row">
              <div className="lg:w-1/3 xl:w-1/6 pr-4 hidden sm:hidden md:block">
                <FilterOptions
                  products={Products?.data}
                  subCategory={CategoryData?.data?.subcategories}
                />
              </div>
              <div className="flex-shrink-0 mb-10 lg:mb-0 lg:mx-8 border-t lg:border-t-0 shadow-md hidden md:block" />
              <div className="block md:hidden ">
                <div className="flex items-center justify-between mb-6">
                  <button
                    onClick={() => dispatch(setMobileFilter(true))}
                    className="flex items-center px-4 py-2 text-sm font-semibold transition duration-200 ease-in-out border rounded-md lg:hidden text-brand-dark border-border-base focus:outline-none hover:border-brand hover:text-brand"
                  >
                    <div className="transform rotate-90">
                      <GiSettingsKnobs className="w-5 h-5" />
                    </div>
                    <span className="ltr:pl-2.5 rtl:pr-2.5 text-[15px]">
                      Filters
                    </span>
                  </button>

                  <div className="flex items-center justify-end w-full lg:justify-between">
                    <div className="shrink-0 text-brand-dark font-medium text-15px leading-4 md:ltr:mr-6 md:rtl:ml-6 hidden lg:block mt-0.5">
                      2,683 Items Found
                    </div>
                    <div className="relative ltr:ml-2 rtl:mr-2 lg:ltr:ml-0 lg:rtl:mr-0 min-w-[160px]">
                      <div className="flex items-center">
                        <ListBox options={SORTOPTIONS} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1 ">
                <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-x-3 gap-y-3">
                  {Products?.data.map((product: Product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                {/* <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row justify-between sm:justify-end sm:items-center">
                <button className="relative h-auto inline-flex items-center justify-between rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6  ttnc-ButtonPrimary disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50  shadow-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000 ">
                  <ImSpinner2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                  Show me more
                </button>
              </div> */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </Container>
  );
}

CategoryPage.Layout = Layout;

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
