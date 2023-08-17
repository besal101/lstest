import Layout from "@components/Layout";
import LoginForm from "@features/auth/Login";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Seo from "@features/seo/seo";

export default function SignInPage() {
  return (
    <>
      <Seo
        title="Sign In"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="signin"
      />
      <div className="border-t border-brand-gray">
        <div className="flex justify-center items-center">
          <div className="py-12 sm:py-16 lg:py-20">
            <LoginForm
              isPopup={false}
              className="border border-brand-gray rounded-lg"
            />
          </div>
        </div>
      </div>
    </>
  );
}

SignInPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
