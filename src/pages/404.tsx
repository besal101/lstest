import Layout from "@components/Layout";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Image from "next/image";
import { useTranslation } from "next-i18next";

export default function ErrorPage() {
  const backgroundThumbnail = "/images/404-bg.png";
  const errorThumbnail = "/images/404.png";
  const { t } = useTranslation("common");
  return (
    <div
      className="text-center px-12 py-16 sm:py-20 lg:py-24 xl:py-32 flex items-center justify-center bg-cover bg-no-repeat bg-center"
      style={{
        backgroundImage: `url(${backgroundThumbnail})`,
      }}
    >
      <div className="max-w-md xl:max-w-lg">
        <Image
          src={errorThumbnail}
          alt={t("error-heading")}
          width={150}
          height={150}
        />

        <h2 className="text-6xl md:text-7xl 2xl:text-8xl font-bold text-brand-dark pt-5 xl:pt-9">
          ERROR
        </h2>
        <p className="text-15px md:text-base 2xl:text-[18px] leading-7 md:leading-8 pt-4 font-medium">
          ERROR HEADING
        </p>
      </div>
    </div>
  );
}

ErrorPage.Layout = Layout;

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common", "forms", "item"])),
    },
  };
};
