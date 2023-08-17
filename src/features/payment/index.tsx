import { CashIcon } from "@components/icons/Cash";
import { CardIcon } from "@components/icons/card";
import { allCartEmpty } from "@features/cart/cartSlice";
import StripeContainer from "@features/payment/StripeContainer";
import { useAppDispatch, useAppSelector } from "@hooks/useRedux";
import { useAddToCartMutation } from "@query/cart/useAddToCartMutation";
import { useCreateOrderMutation } from "@query/order/useCreateOrderMutation";
import { encryption } from "@utils/functions";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { ImSpinner2 } from "react-icons/im";
const LoadStripePayment = dynamic(
  () => import("@features/payment/StripeContainer")
);

interface IPaymentProps {
  userId: {
    userID: string;
  };
  fullname: string;
  phone: string;
  addressId: number | undefined;
}

const Payment: React.FC<IPaymentProps> = ({
  userId,
  fullname,
  phone,
  addressId,
}) => {
  const [selectedOption, setSelectedOption] = useState("Credit-Card");
  const [clientSecret, setClientSecret] = useState("");
  const [paymentIntentId, setPaymentIntentId] = useState("");
  const [orderData, setOrderData] = useState<any>(null);
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const [cartIds, setCartIds] = useState([]);
  const router = useRouter();

  const { cartItems } = useAppSelector((state) => state.cart);

  const { totalAmount, couponId } = useAppSelector(
    (state) => state.orderSummary
  );

  const { mutate: addTocart, data } = useAddToCartMutation();

  const {
    mutate: createOrder,
    isSuccess,
    data: OrderData,
  } = useCreateOrderMutation();

  useEffect(() => {
    setCartIds(data?.cartIds);
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      setLoading(false);
      let orderID = OrderData.order.id.toString();
      let encryptedOrderID = encryption(orderID);
      router.push(
        `/order-success?orderID=${encodeURIComponent(encryptedOrderID)}`
      );
    }
  }, [OrderData, dispatch, isSuccess, router]);

  useEffect(() => {
    if (cartIds?.length > 0) {
      createOrder({
        userId: userId.userID as string,
        cartIds,
        paymentMethod: "cod",
        totalAmount: totalAmount,
        couponId,
        addressId: addressId as number,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartIds, createOrder, totalAmount, userId, couponId]);

  const handleCashOrder = async () => {
    setLoading(true);
    try {
      addTocart({
        cartItems,
        userId: userId.userID as string,
      });
    } catch (error) {
      console.log("Error creating cart:", error);
    }
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
  };

  useEffect(() => {
    const getClientSecret = async () => {
      try {
        const response = await axios.post("/api/stripe-payment", {
          amount: totalAmount * 100,
          currency: cartItems[0].currency,
          metadata: {
            userId: userId.userID as string,
            fullname,
            phone,
          },
        });
        setClientSecret(response.data.clientSecret);
      } catch (error) {
        console.log("Error fetching client secret:", error);
      }
    };
    getClientSecret();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullname, phone, totalAmount, userId]);

  return (
    <>
      <div className="px-6 py-7 space-y-6 block">
        <div className="flex items-start space-x-4 sm:space-x-6">
          <div className="flex items-center text-sm sm:text-base pt-3.5">
            <input
              id="payment_method"
              className="focus:ring-brand text-brand rounded-full border-brand hover:border-brand bg-transparent w-6 h-6"
              type="radio"
              value="Credit-Card"
              name="payment-method"
              checked={selectedOption === "Credit-Card"}
              onChange={handleOptionChange}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="payment_method"
              className="flex items-center space-x-4 sm:space-x-6"
            >
              <div className="p-2.5 rounded-xl border-2 border-brand-base">
                <CardIcon />
              </div>
              <p className="font-medium">Debit / Credit Card</p>
            </label>
            <div className="mt-6 mb-4 space-y-3 sm:space-y-5 block">
              <div className="max-w-lg">
                {selectedOption === "Credit-Card" && (
                  <StripeContainer
                    clientSecret={clientSecret}
                    orderdata="nothing"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start space-x-4 sm:space-x-6">
          <div className="flex items-center text-sm sm:text-base pt-3.5">
            <input
              id="payment_method"
              className="focus:ring-brand text-brand rounded-full border-brand hover:border-brand bg-transparent w-6 h-6"
              type="radio"
              value="Cash-on-Delivery"
              name="payment-method"
              checked={selectedOption === "Cash-on-Delivery"}
              onChange={handleOptionChange}
            />
          </div>
          <div className="flex-1">
            <label
              htmlFor="payment_method"
              className="flex items-center space-x-4 sm:space-x-6"
            >
              <div className="p-2.5 rounded-xl border-2 border-brand-base">
                <CashIcon />
              </div>
              <p className="font-medium">Cash on Delivery</p>
            </label>
            <div className="mt-6 mb-4 space-y-3 sm:space-y-5 block"></div>
            {selectedOption === "Cash-on-Delivery" && (
              <button
                onClick={handleCashOrder}
                className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50  shadow-xl mt-8 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
              >
                Confirm order
                {loading && (
                  <ImSpinner2 className="animate-spin -me-1 ms-3 h-5 w-5 " />
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
