import Layout from "@components/Layout";
import Seo from "@features/seo/seo";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useAppDispatch } from "@hooks/useRedux";
import { useEffect } from "react";
import { allCartEmpty } from "@features/cart/cartSlice";
import Divider from "@components/Element/Divider";
import Container from "@components/Container";
import { removeOrderSummary } from "@features/Order/orderSlice";
import Image from "next/image";
import { BsDownload } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";
import { useState } from "react";
import { ButtonLoader } from "@components/icons/button-loader";
import { useRouter } from "next/router";
import { decryption } from "@utils/functions";

export default function OrderSuccesspage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [decryptedOrderID, setDecryptedOrderID] = useState<number>();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { orderID } = router.query;

  useEffect(() => {
    if (orderID) {
      const decrypted = +decryption(orderID as string);
      setDecryptedOrderID(decrypted);
    }
  }, [orderID]);

  useEffect(() => {
    dispatch(allCartEmpty());
    dispatch(removeOrderSummary());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDownloadInvoice = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/invoice/${decryptedOrderID}`);
      const blob = await res.blob();

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "invoice.pdf");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Seo
        title="Order"
        description="Fastest E-commerce template built with React, NextJS, TypeScript, React-Query and Tailwind CSS."
        path="order-success"
      />
      <Divider />
      <Container>
        <div className="py-6 md:py-24">
          <div className="px-6 md:px-16 bg-slate-200 py-4 rounded-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 items-center">
              <div className="flex flex-col">
                <h1 className="text-xl md:text-3xl font-bold">
                  Congratulations on your purchase! 🎉🎉🎉
                </h1>
                <p className="pt-4 text-sm md:text-base">
                  You now officially part of our Cookware family, and we couldn
                  be more excited to have you on board. 🍳🍲
                </p>
                <p className="pt-4 text-sm md:text-base">
                  Thank you for choosing us to be part of your culinary
                  adventures. 🌟 We know that the kitchen is where delicious
                  memories are created, and we thrilled to be a part of your
                  cooking journey.
                </p>
              </div>

              <div className="flex justify-end">
                <Image
                  src="/gift1.png"
                  alt=""
                  className="w-72"
                  height={230}
                  width={230}
                />
              </div>
            </div>
            <div className="flex flex-row justify-center gap-4 items-center w-full py-8">
              <Link
                href="/"
                className="px-8 py-3 md:py-4 gap-2 flex items-center justify-center bg-heading rounded-full font-semibold text-sm sm:text-15px border border-brand-secondary text-brand-secondary focus:brand-secondary transition duration-300 hover:bg-opacity-90"
              >
                <IoMdArrowRoundBack size={20} />
                <span>Continue Shopping</span>
              </Link>
              <button
                onClick={handleDownloadInvoice}
                className="px-8 py-3 md:py-4 gap-2 flex items-center justify-center bg-heading rounded-full font-semibold text-sm sm:text-15px text-white bg-brand-secondary focus:outline-none transition duration-300 hover:bg-opacity-90"
              >
                {loading ? <ButtonLoader /> : <BsDownload size={20} />}

                <span>{loading ? "Generating..." : "Download Invoice"}</span>
              </button>
            </div>
          </div>
        </div>
      </Container>
      <Divider />
    </>
  );
}

OrderSuccesspage.Layout = Layout;

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext
) => {
  const locale = ctx.locale;

  const translations = await serverSideTranslations(locale!, [
    "common",
    "forms",
    "item",
  ]);

  return {
    props: {
      ...translations,
    },
  };
};
