import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import { STRIPE_PUBLISHABLE_KEY } from "@utils/routes";
import { ImSpinner2 } from "react-icons/im";

interface StripeContainerProps {
  clientSecret: string;
  orderdata: any;
}

const StripeContainer: React.FC<StripeContainerProps> = ({
  clientSecret,
  orderdata,
}) => {
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(STRIPE_PUBLISHABLE_KEY as string)
  );

  const options = {
    clientSecret,
  };

  return (
    <>
      {clientSecret ? (
        <div className="row">
          <Elements options={options} stripe={stripePromise} key={clientSecret}>
            <PaymentForm orderdata={orderdata} />
          </Elements>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ImSpinner2 className="animate-spin -me-1 ms-3 h-5 w-5 " />
        </div>
      )}
    </>
  );
};

export default StripeContainer;
