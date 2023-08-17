import { useTranslation } from "next-i18next";
import {
  PaymentElement,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import useWindowSize from "@utils/useWindowSize";
import axios from "axios";
import Button from "@components/Element/Button/Button";

interface IPaymentFormProps {
  orderdata: any;
}

const PaymentForm: React.FunctionComponent<IPaymentFormProps> = ({
  orderdata,
}) => {
  const { t } = useTranslation("common");
  const stripe = useStripe();
  const elements = useElements();
  const { width } = useWindowSize();

  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );

    if (!clientSecret) {
      return;
    }
    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      switch (paymentIntent?.status) {
        case "succeeded":
          setMessage("Payment succeeded!");
          break;
        case "processing":
          setMessage("Your payment is processing.");
          break;
        case "requires_payment_method":
          setMessage("Your payment was not successful, please try again.");
          break;
        default:
          setMessage("Something went wrong.");
          break;
      }
    });
  }, [stripe]);

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <div className="w-full bg-white rounded-xl xl:w-[500px]">
        <h3 className="text-brand-dark opacity-60 mb-3">Enter card info</h3>
        <CardElement />
        <button
          className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50  shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
          type="submit" // Call the function prop when the button is clicked
        >
          Confirm order
        </button>
      </div>

      {message && <div id="payment-message">{message}</div>}
    </form>
  );
};

export default PaymentForm;
