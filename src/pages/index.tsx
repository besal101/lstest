import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Layout from "@components/Layout";
import Container from "@components/Container";
import HeroBanner from "@components/shared/Banner/HeroBanner";

import { BannersType } from "../utils/types";
import FeatureGrid from "@components/shared/Grid/FeatureGrid";
import CategoryGrid from "@components/shared/Grid/CategoryGrid";
import BannerCard from "@components/Element/Cards/BannerCard";
import ProductFeed from "@components/shared/feed";
import RecommendedGrid from "@components/shared/Grid/RecommendedGrid";
import BannerGridTwo from "@components/shared/Grid/BannerGridTwo";
import { getSession } from "next-auth/react";
import {
  RecommendedBanner,
  ThreeGridBanner,
  TwoGridBanner,
  fullpageBanner,
} from "@utils/routes";
import { FloatingWhatsApp } from "react-floating-whatsapp";

const banners: BannersType = {
  sliderBanner: [
    {
      id: 1,
      title: "Free delivery from your store",
      slug: "search",
      image: {
        mobile: {
          url: "/banner/banner-mob-1.png",
          width: 450,
          height: 222,
        },
        desktop: {
          url: "/banner/banner.jpg",
          width: 910,
          height: 450,
        },
      },
    },
    {
      id: 2,
      title: "Fresh Healthy Breakfast food",
      slug: "search",
      image: {
        mobile: {
          url: "/banner/banner-mob-2.png",
          width: 450,
          height: 222,
        },
        desktop: {
          url: "/banner/banner.jpg",
          width: 910,
          height: 450,
        },
      },
    },
  ],
  fixedBanner: {
    id: 1,
    title: "Free delivery from your store",
    slug: "search",
    image: {
      mobile: {
        url: "/banner/banner-mob-1.png",
        width: 450,
        height: 222,
      },
      desktop: {
        url: "/banner/fixed-banner.jpg",
        width: 910,
        height: 450,
      },
    },
  },
};

export default function Home() {
  return (
    <>
      <Container>
        <HeroBanner
          data={banners}
          className="my-3 md:my-4 lg:mt-3 lg:mb-5 xl:mb-6"
        />
        <FeatureGrid />
        <CategoryGrid />
        <ProductFeed
          sectionHeading="best-selling"
          sectionSubHeading="best-selling-sub"
          type="recently_browsed"
        />
        <BannerCard
          banner={fullpageBanner}
          className="mb-12 lg:mb-14 xl:pb-3"
          effectActive={true}
          variant="rounded"
        />
        {/* <ProductFeed
        sectionHeading="best-selling"
        sectionSubHeading="best-selling-sub"
      /> */}
        <RecommendedGrid data={RecommendedBanner} />
        <BannerGridTwo
          data={TwoGridBanner}
          className="mb-12 lg:mb-14 xl:mb-16 2xl:mb-20"
          girdClassName="xl:gap-5 3xl:gap-7"
        />
        <BannerCard
          banner={ThreeGridBanner}
          className="mb-12 lg:mb-14 xl:pb-3"
          effectActive={true}
          variant="rounded"
        />
      </Container>
      <FloatingWhatsApp
        phoneNumber="+971521573960"
        allowEsc
        notification
        notificationSound
        allowClickAway
        accountName="Lifesmile Support"
        avatar="/whatsapp.png"
      />
    </>
  );
}

Home.Layout = Layout;

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
