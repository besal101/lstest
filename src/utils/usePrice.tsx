import { useMemo } from "react";

type PriceValue =
  | string
  | {
      price: string;
      basePrice: string;
      discountedAmount: number;
      amount: number;
    };

export function formatPrice({
  basePrice,
  currencyCode,
  locale,
}: {
  basePrice: number;
  currencyCode: string;
  locale: string;
}): string {
  const formatCurrency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
  });
  return formatCurrency.format(basePrice);
}

export function formatVariantPrice({
  basePrice,
  discount,
  currencyCode,
  locale,
}: {
  basePrice: number;
  discount: number;
  currencyCode: string;
  locale: string;
}): {
  price: string;
  basePrice: string;
  discountedAmount: number;
  amount: number;
} {
  let percent = (discount + 100) / 100;
  let amount = discount !== 0 ? Math.round(basePrice / percent) : basePrice;
  let discountedAmount = basePrice - amount;
  const price: string = formatPrice({
    basePrice: amount,
    currencyCode,
    locale,
  });
  const base: string = formatPrice({
    basePrice,
    currencyCode,
    locale,
  });
  return { price, basePrice: base, discountedAmount, amount };
}

export default function usePrice(data: {
  basePrice: number;
  discount?: number;
  currencyCode: string;
  locale: string;
}): {
  price: string;
  basePrice: string;
  discountedAmount: number;
  amount: number;
} {
  const { basePrice, discount, currencyCode, locale } = data ?? {};

  const value = useMemo<PriceValue>(() => {
    if (typeof basePrice !== "number" || !currencyCode) return "";

    if (discount) {
      return formatVariantPrice({
        basePrice,
        discount,
        currencyCode,
        locale,
      });
    } else {
      return formatPrice({ basePrice, currencyCode, locale });
    }
  }, [basePrice, currencyCode, discount, locale]);

  if (typeof value === "string") {
    return {
      price: value,
      basePrice: "",
      discountedAmount: 0,
      amount: 0,
    };
  }

  return value;
}
