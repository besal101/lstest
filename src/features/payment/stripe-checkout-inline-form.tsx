import StripePaymentForm from "@components/Stripe-Inline-Form";
import { useTranslation } from "next-i18next";
import React from "react";

const StripeCheckoutInlineForm = () => {
  const { t } = useTranslation("common");
  const total = 546;
  return (
    <StripePaymentForm
      item={{ price: total, buttonText: t("confirm-order") }}
    />
  );
};

export default StripeCheckoutInlineForm;
