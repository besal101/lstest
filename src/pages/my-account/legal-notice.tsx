import Layout from "@components/Layout";
import AccountLayout from "@components/AccountLayout";
import LegalPage from "@components/Legal";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function LegalNotice() {
  return (
    <>
      <AccountLayout>
        <LegalPage />
      </AccountLayout>
    </>
  );
}

LegalNotice.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, [
        "common",
        "forms",
        "items",
        "legal",
      ])),
    },
  };
};
