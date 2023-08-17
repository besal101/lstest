import ProductsCarousel from "@components/shared/feed/ProductsCarousel";
import { ROUTES } from "@utils/routes";
import { LIMITS } from "@utils/routes";
import { useBestSellingProducts } from "@query/product/get-bestselling-product";
import { useGetRecentlyVisited } from "@query/product/get-recent-visited";
import useGetUserIP from "@query/auth/get-ip-user";
import { useEffect } from "react";

interface ProductFeedProps {
  sectionHeading: string;
  sectionSubHeading?: string;
  categorySlug?: string;
  uniqueKey?: string;
  type: string;
}

interface CustomError {
  message: string;
  // You can add more properties here if needed
}

const ProductFeed: React.FC<ProductFeedProps> = ({
  sectionHeading,
  uniqueKey,
  sectionSubHeading,
  type,
}) => {
  const { data, isLoading, error } = useBestSellingProducts({
    limit: LIMITS.PRODUCTS_CAROUSEL,
  });

  const {
    data: userIP,
    isLoading: isLoadingUserIP,
    isError: isErrorUserIP,
    error: errorUserIP,
  } = useGetUserIP();

  const {
    mutate: getRecentlyVisited,
    data: product,
    isLoading: isLoadingProduct,
    isError: isErrorProduct,
    error: errorProduct,
  } = useGetRecentlyVisited(userIP, type);

  useEffect(() => {
    if (userIP && !isLoadingUserIP && !isErrorUserIP) {
      getRecentlyVisited();
    }
  }, [userIP, isLoadingUserIP, isErrorUserIP, getRecentlyVisited]);

  // Update the type of the errorProduct variable
  const customErrorProduct = errorProduct as CustomError;

  return (
    <ProductsCarousel
      sectionHeading={sectionHeading}
      categorySlug={ROUTES.PRODUCT}
      products={product?.product}
      loading={isLoadingProduct}
      error={customErrorProduct?.message}
      limit={LIMITS.PRODUCTS_CAROUSEL}
      uniqueKey={uniqueKey}
      sectionSubHeading={sectionSubHeading}
    />
  );
};

export default ProductFeed;
