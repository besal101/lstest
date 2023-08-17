import Container from "@components/Container";
import Button from "@components/Element/Button/Button";
import Layout from "@components/Layout";
import Assistant from "@components/shared/Assistant";
import ProductFeed from "@components/shared/feed";
import OrderSummary from "@features/Order";
import CartItem from "@features/cart/CartItem";
import EmptyCart from "@features/cart/CartSidebar/EmptyCart";
import { useAppSelector } from "@hooks/useRedux";
import { cartItem } from "@utils/types";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { BiArrowBack } from "react-icons/bi";

export default function Cart() {
  const cart = useAppSelector((state) => state.cart.cartItems);
  const { t } = useTranslation("common");
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  if (!cart?.length) return <EmptyCart returnToHome />;

  return (
    <Container>
      <main className="container py-16 lg:pb-28 pt-3 lg:pt-10">
        <div className="pb-2 sm:pb-16 flex flex-col sm:flex-row justify-between">
          <Button variant="border" className="w-fit" onClick={handleGoBack}>
            <div className="me-1 -ml-1">
              <BiArrowBack />
            </div>
            {t("text-continue-shopping")}
          </Button>
          <div className="pt-4 md:pt-0">
            <span className="font-bold text-lg">
              {t("text-my-cart")}
              <span className="text-normal text-sm">
                ({cart?.length} {t("text-items")})
              </span>
            </span>
          </div>
          <div></div>
          <div></div>
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-[60%] xl:w-[55%] order-2 lg:order-1 py-4 sm:py-0">
            <hr className="border-slate-200 py-4 block sm:hidden"></hr>
            <div className="divide-y divide-slate-200 ">
              {cart?.map((item: cartItem, index: number) => (
                <React.Fragment key={index}>
                  <CartItem item={item} />
                </React.Fragment>
              ))}
            </div>
            <Assistant />
          </div>

          <div className="border-t lg:border-t-0 lg:border-l order-1 sm:order-2 border-slate-200 my-10 lg:my-0 lg:mx-10 xl:mx-16 2xl:mx-20 flex-shrink-0 hidden sm:block" />
          <OrderSummary cart={cart} />
        </div>
      </main>
      <ProductFeed
        sectionHeading="you-may-also-like"
        type="you-may-also-like"
      />
    </Container>
  );
}

Cart.Layout = Layout;

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
