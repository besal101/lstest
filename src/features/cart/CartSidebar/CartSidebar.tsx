import Scrollbar from "@libs/Scrollbar";
import { IoClose } from "react-icons/io5";
import cn from "classnames";
import { RiDeleteBin7Line } from "react-icons/ri";
import { useAppDispatch } from "@hooks/useRedux";
import { setOpenDrawer } from "@features/theme/themeSlice";
import { useCallback } from "react";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import Link from "next/link";
import { ROUTES } from "@utils/routes";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@hooks/useRedux";
import { cartItem } from "@utils/types";
import { allCartEmpty } from "../cartSlice";
import usePrice from "@utils/usePrice";
import { useRouter } from "next/router";

export default function Cart() {
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const cart = useAppSelector((state) => state.cart.cartItems);

  const totalAmount = cart.reduce((total, item) => {
    const itemTotal = item.productQuantity * item.productAmount;
    return total + itemTotal;
  }, 0);

  const { price } = usePrice({
    basePrice: totalAmount,
    discount: 0,
    currencyCode: "AED",
    locale: locale as string,
  });

  const isEmpty = cart.length === 0 ? true : false;

  const dispatch = useAppDispatch();
  const closeDrawer = useCallback(
    () => dispatch(setOpenDrawer(false)),
    [dispatch]
  );

  const resetCart = useCallback(() => dispatch(allCartEmpty()), [dispatch]);

  return (
    <div className="flex flex-col justify-between w-full h-full">
      <div className="relative flex items-center justify-between w-full border-b ltr:pl-5 rtl:pr-5 md:ltr:pl-7 md:rtl:pr-7 border-border-two">
        <h3 className="font-bold text-black text-xl">{t("shopping-cart")}</h3>
        <div className="flex items-center">
          <button
            className="flex flex-shrink items-center text-15px transition duration-150 ease-in focus:outline-none text-skin-base opacity-50 hover:opacity-100 -me-1.5"
            aria-label="clear all"
            onClick={resetCart}
          >
            <RiDeleteBin7Line color="#0F172A" />
            <span className="ps-1 text-secondary">{t("clear-all")}</span>
          </button>

          <button
            className="flex text-2xl items-center justify-center px-4 md:px-6 py-6 lg:py-7 focus:outline-none transition-opacity text-skin-base hover:opacity-60"
            onClick={closeDrawer}
            aria-label="close"
          >
            <IoClose />
          </button>
        </div>
      </div>
      {cart.length > 0 ? (
        <Scrollbar className="cart-scrollbar w-full flex-grow">
          <div className="w-full px-5 md:px-7">
            {cart?.map((item: cartItem, index: number) => (
              <CartItem item={item} key={index} />
            ))}
          </div>
        </Scrollbar>
      ) : (
        <EmptyCart />
      )}
      <div className="px-5 pt-5 pb-5 border-t border-border-two md:px-7 md:pt-6 md:pb-6">
        <div className="flex pb-5 md:pb-7">
          <div className="ltr:pr-3 rtl:pl-3">
            <h3 className="text-15px sm:text-base font-semibold mb-2.5">
              {t("subtotal")}
            </h3>
            <p className="leading-6 text-brand-muted text-sm">
              {t("shipping-and-taxes-calculated-at-checkout")}
            </p>
          </div>
          <div className="flex-shrink-0 font-semibold text-base md:text-lg text-skin-base -mt-0.5 min-w-[80px] text-end">
            {price}
          </div>
        </div>
        <div className="flex flex-col" onClick={closeDrawer}>
          <Link
            href={isEmpty === false ? ROUTES.CART : "/"}
            className={cn(
              "w-full px-5 py-3 md:py-4 flex items-center justify-center bg-heading rounded font-semibold text-sm sm:text-15px text-white bg-brand-secondary focus:outline-none transition duration-300 hover:bg-opacity-90",
              {
                "cursor-not-allowed !text-skin-base !text-opacity-25 bg-secondary  hover:bg-skin-button-disable":
                  isEmpty,
              }
            )}
          >
            <span className="py-0.5">{t("proceed-to-checkout")}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
