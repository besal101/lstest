import React from "react";
import Layout from "@components/Layout";
import AccountLayout from "@components/AccountLayout";
import OrderTable from "@components/Table/order-table";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useOrdersQuery } from "@query/order/get-all-orders";

// props change to orders.

export default function OrdersTablePage() {
  const { data, isLoading } = useOrdersQuery();
  return (
    <>
      <AccountLayout>
        {!isLoading ? (
          <OrderTable orders={data?.data} />
        ) : (
          <div>Loading...</div>
        )}
      </AccountLayout>
    </>
  );
}

OrdersTablePage.Layout = Layout;

export const getStaticProps = async ({ locale }: any) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        "common",
        "forms",
        "menu",
        "footer",
      ])),
    },
  };
};
