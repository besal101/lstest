import { cartItem } from "@utils/types";
import Link from "next/link";
import * as React from "react";
import Image from "next/image";
import { CDN_URL_PRODUCT, ROUTES } from "@utils/routes";
import Counter from "@components/Counter";
import { useAppDispatch } from "@hooks/useRedux";
import { useRouter } from "next/router";
import { cartAddQty, cartRemoveItem, cartRemoveQty } from "./cartSlice";
import usePrice from "@utils/usePrice";
import { HeartIcon } from "@components/icons/heart";
import { RemoveIcon } from "@components/icons/Remove";

interface ICartItemProps {
  item: cartItem;
}

const CartItem: React.FC<ICartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const { locale } = useRouter();
  const addItemToCart = (itemCode: string) => {
    dispatch(cartAddQty(itemCode));
  };
  const removeItemFromCart = (itemCode: string) => {
    dispatch(cartRemoveQty(itemCode));
  };

  const clearItemFromCart = (itemCode: string) => {
    dispatch(cartRemoveItem(itemCode));
  };

  const EasyAmount: number = item?.productAmount * item?.productQuantity;

  const { price } = usePrice({
    basePrice: EasyAmount,
    discount: 0,
    currencyCode: "AED",
    locale: locale as string,
  });
  return (
    <div className="relative flex py-4 sm:py-10 xl:py-12 first:pt-0 last:pb-0">
      <div className="flex flex-col gap-2 items-center">
        <div className="relative h-36 w-32 flex-shrink-0 overflow-hidden rounded-x">
          <Link className="absolute inset-0" href="/product-detail">
            <Image
              src={
                `${CDN_URL_PRODUCT}/thumbnail/${item?.productImage}` ??
                "/assets/product-placeholder.png"
              }
              width={140}
              height={140}
              loading="eager"
              alt={item.productName || "Product Image"}
              className="object-cover bg-fill-thumbnail rounded-md"
              style={{
                filter: "brightness(0.96)",
              }}
            />
          </Link>
        </div>
      </div>
      <div className="ml-3 sm:ml-6 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between">
            <div className="flex-[1.5] gap-5">
              <h3 className="text-base font-semibold pb-2">
                <Link href={`${ROUTES.PRODUCT}/${item.productSlug}`}>
                  <div className="line-clamp-2 sm:line-clamp-3">
                    {item?.productName}
                  </div>
                </Link>
              </h3>

              <Counter
                quantity={item.productQuantity}
                QtyIncrement={() => addItemToCart(item.ItemCode)}
                QtyDecrement={() => removeItemFromCart(item.ItemCode)}
                disabled={
                  item.availableStock > item.productQuantity ? false : true
                }
              />

              <div className="pt-4 flex justify-start w-full sm:hidden relative">
                <div className="flex items-center">
                  <div className="flex flex-row gap-0.5">
                    <span className="text-sm font-semibold">{price}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-2 justify-end md:hidden">
                <button className="border-none flex flex-row justify-end text-brand gap-1 py-4 text-sm font-semibold">
                  <HeartIcon />
                  Save for later
                </button>
                <button
                  className="border-none flex flex-row justify-end text-brand gap-1 py-4 text-sm font-semibold"
                  onClick={() => clearItemFromCart(item.ItemCode)}
                >
                  <RemoveIcon />
                  Remove
                </button>
              </div>
            </div>
            <div className="flex-1 sm:flex justify-end hidden">
              <div className="mt-0.5">
                <div className="flex flex-col gap-4 items-center py-1 px-2 md:py-1.5 md:px-2.5 text-sm font-medium">
                  <div className="flex flex-row gap-0.5">
                    <span className="text-xl font-extrabold">{price}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <button className="border-none flex flex-row justify-start w-fit text-brand gap-1 text-sm font-semibold">
                      <HeartIcon />
                      Save for later
                    </button>
                    <button
                      className="border-none flex flex-row justify-start text-brand gap-1 text-sm flex-1 font-semibold"
                      onClick={() => clearItemFromCart(item.ItemCode)}
                    >
                      <RemoveIcon />
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
