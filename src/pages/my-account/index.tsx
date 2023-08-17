import Layout from "@components/Layout";
import AccountLayout from "@components/AccountLayout";
import AccountDetails from "@features/auth/AccountDetails";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function AccountDetailsPage() {
  return (
    <AccountLayout>
      <AccountDetails />
    </AccountLayout>
  );
}

AccountDetailsPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "forms", "item"])),
    },
  };
};
