import Layout from "@components/Layout";
import AccountLayout from "@components/AccountLayout";
import Notifications from "@features/notification/notification";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetStaticProps } from "next";

export default function Notification() {
  return (
    <>
      <AccountLayout>
        <Notifications />
      </AccountLayout>
    </>
  );
}

Notification.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "forms", "items"])),
    },
  };
};
