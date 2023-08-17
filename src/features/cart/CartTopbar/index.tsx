import React, { use, useCallback } from "react";
import Image from "next/image";
import Overlay from "./Overlay";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import useFreezeBodyScroll from "@utils/use-freeze-body-scroll";
import { CDN_URL_PRODUCT } from "@utils/routes";
import { CloseTopBar } from "./cartTopbarSlice";
import useWindowSize from "@utils/useWindowSize";
import Link from "next/link";
import { useRouter } from "next/router";

interface ICartTopBarProps {}

const CartTopBar: React.FC<ICartTopBarProps> = (props) => {
  const cartTopBar = useAppSelector((state) => state.cartTopbar);
  const { width } = useWindowSize();
  const isOpen = cartTopBar.isOpen;
  const data = cartTopBar.data;
  const dispatch = useAppDispatch();
  const router = useRouter();

  useFreezeBodyScroll(isOpen);

  const close = useCallback(() => {
    dispatch(CloseTopBar());
  }, [dispatch]);

  if (isOpen === false) return null;

  const handleCheckout = () => {
    close();
    router.push("/cart");
  };

  return (
    <>
      {isOpen && width! < 768 && (
        <>
          <Overlay onClick={close} />
          <div
            className={`absolute top-0 left-0 right-0 bg-brand-lightOne z-50 shadow-md p-4 opacity-0 transform -translate-y-full transition-all duration-1000 ${
              isOpen ? "cartTopBarOpen" : ""
            }`}
          >
            <div className="flex justify-between items-center gap-2">
              <div className="flex">
                <Image
                  src={`${CDN_URL_PRODUCT}/thumbnail/${data?.productImage}`}
                  width={150}
                  height={150}
                  alt="New Image"
                />
              </div>
              <div className="flex flex-col">
                <p className="line-clamp-2 text-sm">{data?.productName}</p>
                <span className="font-semibold text-sm text-slate-500">
                  Added to cart
                </span>
              </div>
              <div className="flex flex-col w-1/2 items-end text-right">
                <span className="text-sm text-slate-500">Cart Total</span>
                <h1 className="text-base font-bold tracking-tight">
                  {data?.productPrice}
                </h1>
              </div>
            </div>
            <div className="flex justify-between items-center gap-2 -mt-4">
              <button
                onClick={close}
                className="items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 border border-slate-900  hover:bg-slate-800 text-slate-900 hover:text-white  shadow-sm mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
              >
                Continue Shopping
              </button>
              <button
                onClick={handleCheckout}
                className="flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 bg-slate-900  hover:bg-slate-800 text-slate-50  shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
              >
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default CartTopBar;
