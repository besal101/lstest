import Layout from "@components/Layout";
import AccountLayout from "@components/AccountLayout";
import Help from "@components/help";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function HelpCenter() {
  return (
    <>
      <AccountLayout>
        <Help />
      </AccountLayout>
    </>
  );
}

HelpCenter.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "items",
        "help",
      ])),
    },
  };
};
