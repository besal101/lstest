import { GetServerSideProps, GetServerSidePropsContext } from "next";
import React from "react";
import InvoiceTemplate from "@features/Order/InvoiceTemplate";

const orderdownload = ({ order }: { order: any }) => {
  return <InvoiceTemplate orderData={order} orderId={45} />;
};

export default orderdownload;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const query = ctx.query;
  const order = await fetch(
    `${process.env.NEXTAUTH_URL}/api/order/${query.orderid}`
  ).then((res) => res.json());

  if (!order) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      order,
    },
  };
};
