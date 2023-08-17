import Button from "@components/Element/Button/Button";
import { useGetSingleCoupon } from "@query/coupon/check-coupon";
import { cartItem } from "@utils/types";
import usePrice, { formatPrice } from "@utils/usePrice";
import useWindowSize from "@utils/useWindowSize";
import Cookies from "js-cookie";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { ImSpinner2 } from "react-icons/im";
import { RiErrorWarningLine } from "react-icons/ri";
import Swal from "sweetalert2";
import { useAppDispatch } from "@hooks/useRedux";
import { setOrderSummary } from "./orderSlice";

interface IOrderSummaryProps {
  cart: cartItem[];
}

const OrderSummary: React.FC<IOrderSummaryProps> = ({ cart }) => {
  let CurrencyCode = cart[0]?.currency;
  const router = useRouter();
  const { t } = useTranslation("common");
  const { locale } = useRouter();
  const [coupon, setCoupon] = React.useState<string>("");
  const [couponId, setCouponId] = React.useState<number>();
  const [couponDiscount, setCouponDiscount] = React.useState<number>(0);
  const [couponApplied, setCouponApplied] = React.useState<boolean>(false);
  const [totalAmount, setTotalAmount] = React.useState<number>(0);
  const [couponDiscountAmount, setCouponDiscountAmount] =
    React.useState<string>("");
  const [total, setTotal] = React.useState<string>("");
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  const subtotal = cart.reduce((total, item) => {
    const itemTotal = item.productQuantity * item.productAmount;
    return total + itemTotal;
  }, 0);

  const { price } = usePrice({
    basePrice: subtotal,
    discount: 0,
    currencyCode: CurrencyCode,
    locale: locale as string,
  });

  const { data, isLoading, mutate, isError } = useGetSingleCoupon();

  useEffect(() => {
    if (data?.success) {
      const discountPercent = data?.coupon.discountPercent;
      const id = data?.coupon.id;
      Cookies.set(
        "lifesmile-Coupon",
        JSON.stringify([coupon, discountPercent, id]),
        { expires: 1 }
      );
      setCouponDiscount(data?.coupon.discountPercent);
      setCouponApplied(true);
    } else {
      setCouponApplied(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const cookieValue = Cookies.get("lifesmile-Coupon");
    const value = cookieValue && JSON.parse(cookieValue);

    if (value) {
      setCoupon(value[0]);
      setCouponDiscount(value[1]);
      setCouponId(value[2]);
      setCouponApplied(true);
    }
  }, [couponApplied]);

  useEffect(() => {
    let couponDiscountAmt = (subtotal * couponDiscount) / 100;
    let discountAmount = formatPrice({
      basePrice: couponDiscountAmt,
      currencyCode: CurrencyCode,
      locale: locale as string,
    });
    setCouponDiscountAmount(discountAmount);
    const ttlAmt = subtotal - (subtotal * couponDiscount) / 100;
    setTotalAmount(ttlAmt);
    let totalAmount = formatPrice({
      basePrice: ttlAmt,
      currencyCode: CurrencyCode,
      locale: locale as string,
    });
    setTotal(totalAmount);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [couponApplied, couponDiscount, locale, subtotal]);

  const handleCoupon = () => {
    let device = "";
    if (coupon.length > 0) {
      width! < 768 ? (device = "mobile") : (device = "desktop");
      mutate({ coupon, device });
    } else {
      return;
    }
  };

  const handleTaxes = () => {
    Swal.fire({
      title: "<strong>TAXES</strong>",
      icon: "info",
      html:
        "All prices are <b>Inclusive</b>, " +
        "of all Taxes Vats" +
        " and duties. <br/>",
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: `Great!`,
      confirmButtonAriaLabel: "Thumbs up, great!",
    });
  };

  const handleShipping = () => {
    Swal.fire({
      title: "<strong>Shippings</strong>",
      icon: "info",
      html:
        "Currently all Local orders are of <b>Free Shipping</b>" +
        "<br/>" +
        "International orders are charged as per the country of delivery.",
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: `Great!`,
      confirmButtonAriaLabel: "Thumbs up, great!",
    });
  };

  const handleCheckout = () => {
    dispatch(
      setOrderSummary({
        subtotal,
        totalAmount,
        couponDiscount,
        coupon,
        couponId: couponId!,
      })
    );
    router.push("/checkout");
  };

  return (
    <div className="flex-1 order-1 sm:order-3">
      <div className="sticky top-28">
        <span className="flex flex-row text-xs sm:text-sm items-center transition-opacity duration-500 opacity-100">
          <span className="mr-2 rtl:ml-2">{t("this-order-qualifies")}</span>
          <div className="bg-brand-green px-2 text-center py-0.5 rounded-tr-md rounded-br-xl rounded-tl-xl rounded-bl-md text-white">
            {t("free-shipping")}
          </div>
        </span>

        <div className="bg-brand-lightgray rounded-lg px-4 md:px-8 py-8 mt-3 shadow-cardHover">
          <h3 className="text-lg font-semibold ">{t("order-summary")}</h3>
          {router.pathname === "/cart" && (
            <div className="pt-2">
              <div className="flex mt-1.5 relative">
                <input
                  className="py-2 px-4 md:px-5 w-full bg-brand-lightgray appearance-none transition duration-150 ease-in-out border text-input text-13px lg:text-sm font-body rounded-lg placeholder-[#6C737F] text-brand-dark border-border-two focus:border-2 focus:outline-none focus:ring-0 focus:border-brand h-11 md:h-12"
                  type="text"
                  placeholder="Enter coupon code"
                  value={coupon}
                  disabled={couponApplied}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                {couponApplied ? (
                  <button
                    className="text-white absolute right-1 px-4 sm:px-6 inset-y-1 border border-brand-green  hover:bg-brand-green rounded-md  ml-3 font-semibold text-sm bg-brand-green flex justify-center items-center transition-colors disabled:cursor-not-allowed"
                    onClick={(e) => {
                      setCoupon("");
                      setCouponApplied(false);
                      Cookies.remove("lifesmile-Coupon");
                      setCouponDiscount(0);
                    }}
                    disabled={isLoading}
                  >
                    <div className="flex flex-row gap-2">
                      {isLoading && (
                        <ImSpinner2 className="animate-spin -me-1 ms-3 h-5 w-5 " />
                      )}
                      <span>{t("remove")}</span>
                    </div>
                  </button>
                ) : (
                  <button
                    className="text-white absolute right-1 px-4 sm:px-6 inset-y-1 border border-brand  hover:bg-red-700 rounded-md  ml-3 font-semibold text-sm bg-brand flex justify-center items-center transition-colors disabled:cursor-not-allowed"
                    onClick={handleCoupon}
                    disabled={isLoading}
                  >
                    <div className="flex flex-row gap-2">
                      {isLoading && (
                        <ImSpinner2 className="animate-spin -me-1 ms-3 h-5 w-5 " />
                      )}
                      <span>{t("apply")}</span>
                    </div>
                  </button>
                )}
              </div>
              {isLoading && (
                <span className="text-sm text-brand-green">
                  {t("validating-coupon")}
                </span>
              )}
              {isError && (
                <span className="text-sm text-red-500">
                  {t("coupon-not-found")}
                </span>
              )}
              {couponApplied && !isLoading && !isError && (
                <span className="text-sm text-brand-green">
                  {t("coupon-applied")}
                </span>
              )}
            </div>
          )}

          <div className="mt-7 text-sm text-slate-900 items-center divide-y divide-slate-200/70 ">
            <div className="flex justify-between pb-4">
              <span>{t("subtotal")}</span>
              <span className="font-semibold text-slate-900">{price}</span>
            </div>
            {couponApplied && (
              <div className="flex items-center justify-between py-4">
                <span>Coupon</span>
                <span className="font-semibold text-slate-900">
                  - {couponDiscountAmount}
                </span>
              </div>
            )}

            <div className="flex items-center justify-between py-4">
              <div className="flex flex-col">
                <span>Shipping</span>
                <div className="pt-1 text-xs text-slate-500  flex items-center justify-center tracking-wide">
                  <p className="relative flex flex-row justify-center items-center">
                    <RiErrorWarningLine className="w-3 h-3 mr-1 rtl:ml-1" />
                    Learn more{" "}
                    <button
                      rel="noopener noreferrer"
                      onClick={handleTaxes}
                      className="text-slate-900  underline font-medium ml-0.5 mr-0.5"
                    >
                      Taxes
                    </button>
                    <span> and </span>
                    <button
                      rel="noopener noreferrer"
                      onClick={handleShipping}
                      className="text-slate-900  underline font-medium ml-0.5 mr-0.5"
                    >
                      Shipping
                    </button>{" "}
                    infomation
                  </p>
                </div>
              </div>
              <span className="font-semibold text-slate-900">Free</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-slate-900 text-base pt-4">
              <span>{t("order-total")}</span>
              <span>{total}</span>
            </div>
          </div>
          {router.pathname === "/cart" && (
            <Button
              className="relative h-auto inline-flex items-center justify-center transition-colors text-sm sm:text-base font-medium text-slate-50  shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              variant="primary"
              onClick={handleCheckout}
            >
              {t("checkout")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
