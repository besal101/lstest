import { cartItem } from "@utils/types";
import * as React from "react";
import Image from "next/image";
import { IoIosCloseCircle } from "react-icons/io";
import Link from "next/link";
import { CDN_URL_PRODUCT, ROUTES } from "@utils/routes";
import Counter from "@components/Counter";
import { useAppDispatch } from "@hooks/useRedux";
import { cartAddQty, cartRemoveItem, cartRemoveQty } from "../cartSlice";
import usePrice from "@utils/usePrice";
import { useRouter } from "next/router";

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
    <div
      className={`group w-full h-auto flex justify-start text-brand-light py-4 md:py-7 border-b border-border-one border-opacity-70 relative last:border-b-0`}
      title={item?.ItemCode}
    >
      <div className="relative flex rounded overflow-hidden shrink-0 cursor-pointer w-[90px] md:w-[100px] h-[90px] md:h-[100px]">
        <Image
          src={
            `${CDN_URL_PRODUCT}/thumbnail/${item?.productImage}` ??
            "/assets/product-placeholder.png"
          }
          width={100}
          height={100}
          loading="eager"
          alt={item.productName || "Product Image"}
          className="object-cover bg-fill-thumbnail rounded-md"
          style={{
            filter: "brightness(0.96)",
          }}
        />
        <div
          className="absolute top-0 flex items-center justify-center w-full h-full transition duration-200 ease-in-out bg-black ltr:left-0 rtl:right-0 bg-opacity-30 md:bg-opacity-0 md:group-hover:bg-opacity-30"
          onClick={() => clearItemFromCart(item.ItemCode)}
          role="button"
        >
          <IoIosCloseCircle className="relative text-2xl text-white transition duration-300 ease-in-out transform md:scale-0 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100" />
        </div>
      </div>

      <div className="flex items-start justify-between w-full overflow-hidden">
        <div className="ltr:pl-3 rtl:pr-3 md:ltr:pl-4 md:rtl:pr-4">
          <Link
            href={`${ROUTES.PRODUCT}/${item?.productSlug}`}
            className="block leading-5 transition-all text-brand-dark text-13px sm:text-sm lg:text-15px hover:text-brand"
          >
            <div className="line-clamp-2 font-semibold">
              {item?.productName}
            </div>
          </Link>
          <div className="text-13px sm:text-sm text-brand-muted mt-1.5 block mb-2">
            <span className="font-medium">{item?.productQuantity} PCS</span> X{" "}
            <span className="font-medium">{item?.productPrice}</span>
          </div>
          <Counter
            quantity={item.productQuantity}
            QtyIncrement={() => addItemToCart(item.ItemCode)}
            QtyDecrement={() => removeItemFromCart(item.ItemCode)}
            disabled={item.availableStock > item.productQuantity ? false : true}
          />
        </div>

        <div className="flex font-semibold text-sm md:text-base text-brand-dark leading-5 shrink-0 min-w-[65px] md:min-w-[80px] justify-end ml-4">
          {price}
        </div>
      </div>
    </div>
  );
};

export default CartItem;
