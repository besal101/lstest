import Container from "@components/Container";
import Layout from "@components/Layout";
import ProductDetail from "@components/Product";
import ProductLoader from "@components/Product/Loader";
import useGetUserIP from "@query/auth/get-ip-user";
import { useGetSingleProduct } from "@query/product/get-product";
import { useTrackVisitMutation } from "@query/product/use-track-visit";
import { Product } from "@query/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function ProductPage() {
  const { t } = useTranslation("common");
  const router = useRouter();
  const {
    query: { slug, color },
  } = router;
  const sizeParam = router.query.size;
  const size =
    typeof sizeParam === "string" ? parseInt(sizeParam, 10) : undefined;
  const { data, isLoading } = useGetSingleProduct(
    slug as string,
    color as string,
    size as number
  );

  const { data: userIP } = useGetUserIP();

  const trackProductVisitMutation = useTrackVisitMutation();

  useEffect(() => {
    if (data?.data && userIP) {
      trackProductVisitMutation.mutate({
        productId: data?.data.id,
        userIP: userIP?.userIP,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userIP, data]);

  if (isLoading) {
    return <ProductLoader />;
  }

  if (data?.success === false) {
    return <h1>{data?.message}</h1>;
  }

  return (
    <Container>
      <ProductDetail product={data?.data as Product} />
    </Container>
  );
}

ProductPage.Layout = Layout;

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
