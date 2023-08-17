import Button from "@components/Element/Button/Button";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

type Props = {
  buttonText?: string;
  getToken?: any;
};
const StripeForm: React.FC<Props> = ({ buttonText, getToken }) => {
  // Get a reference to Stripe or Elements using hooks.
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async () => {
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Use elements.getElement to get a reference to the mounted Element.
    const cardElement: any = elements.getElement(CardElement);

    // Pass the Element directly to other Stripe.js methods:
    // e.g. createToken - https://stripe.com/docs/js/tokens_sources/create_token?type=cardElement
    const { token } = await stripe.createToken(cardElement);
    getToken(token);
    if (token) {
      console.log(token, "token");
    }
  };

  return (
    <div className="w-full bg-white rounded-xl xl:w-[500px]">
      <h3 className="text-brand-dark opacity-60 mb-3">Enter card info</h3>
      <PaymentElement id="payment-element" />
      <button
        onClick={handleSubmit}
        className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50  shadow-xl mt-8 w-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
      >
        Confirm order
      </button>
    </div>
  );
};

type Item = {
  item: {
    price: any;
    buttonText: string;
  };
};

const StripePaymentForm = ({ item: { price, buttonText } }: Item) => {
  const sendTokenToServer = async (token: any) => {};
  const [stripePromise, setStripePromise] = useState(() =>
    loadStripe(process.env.STRIPE_PUBLISHABLE_KEY as string)
  );

  return (
    <Elements stripe={stripePromise}>
      <StripeForm
        getToken={(token: any) => sendTokenToServer(token)}
        buttonText={buttonText}
      />
    </Elements>
  );
};

export default StripePaymentForm;
