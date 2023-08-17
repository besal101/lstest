import Layout from "@components/Layout";
import AccountLayout from "@components/AccountLayout";
import ChangePassword from "@features/auth/Change-Password";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function ChangePasswordPage() {
  return (
    <>
      <AccountLayout>
        <ChangePassword />
      </AccountLayout>
    </>
  );
}

ChangePasswordPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "forms", "items"])),
    },
  };
};
