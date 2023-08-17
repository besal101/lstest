import { Coupon } from "@query/types";
import { useMutation } from "@tanstack/react-query";

type CouponResponse = {
  coupon: Coupon;
  success: boolean;
  message: string;
};

type CouponRequest = {
  coupon: string;
  device: string;
};

const useGetSingleCoupon = () => {
  return useMutation<CouponResponse, Error, CouponRequest>(
    async (data: CouponRequest) => {
      const { coupon, device } = data;
      let apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/coupon/${coupon}?device=${device}`;
      return fetch(apiUrl).then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch coupon");
        }
        return response.json();
      });
    }
  );
};

export { useGetSingleCoupon };
