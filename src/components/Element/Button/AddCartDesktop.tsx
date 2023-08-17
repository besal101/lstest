import { ButtonLoader } from "@components/icons/button-loader";
import { ButtonMinus } from "@components/icons/button-minus";
import { ButtonPlus } from "@components/icons/button-plus";
import { ShoppingBag } from "@components/icons/shopping-bag";
import React from "react";
import { BsLightning } from "react-icons/bs";

interface IAddCartDesktopProps {
  QtyIncrement: () => void;
  QtyDecrement: () => void;
  stock: number;
  quantity: number;
  addToCartHandler: () => void;
  buyNowHandler: () => void;
}

const AddCartDesktop: React.FC<IAddCartDesktopProps> = ({
  QtyIncrement,
  QtyDecrement,
  stock,
  quantity,
  addToCartHandler,
  buyNowHandler,
}) => {
  const isCartLoading = false;
  return (
    <div className=" flex pt-12 flex-row gap-5">
      <div className="flex items-center justify-center bg-slate-100/80 px-4 py-3 sm:p-3.5 rounded-full">
        <div className="flex items-center justify-between space-x-7 w-full">
          <div className=" flex items-center justify-between w-[104px] sm:w-28">
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
              type="button"
              disabled={quantity < 2}
              onClick={QtyDecrement}
            >
              <ButtonMinus className="w-4 h-4" />
            </button>
            <span className="select-none block flex-1 text-center leading-none">
              {quantity}
            </span>
            <button
              className="w-8 h-8 rounded-full flex items-center justify-center border border-neutral-400 bg-white focus:outline-none hover:border-neutral-700 disabled:hover:border-neutral-400 disabled:opacity-50 disabled:cursor-default"
              type="button"
              onClick={QtyIncrement}
              disabled={quantity >= stock}
            >
              <ButtonPlus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {stock === 0 ? (
        <>
          <button
            disabled
            className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed"
          >
            {isCartLoading ? (
              <ButtonLoader />
            ) : (
              <ShoppingBag className="w-4 h-4 mb-0.5" />
            )}
            <span className="ml-3">Out of Stock</span>
          </button>
        </>
      ) : (
        <>
          <button
            className="relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900  hover:bg-slate-800 text-slate-50 shadow-xl flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2"
            onClick={addToCartHandler}
          >
            {isCartLoading ? (
              <ButtonLoader />
            ) : (
              <ShoppingBag className="w-4 h-4 mb-0.5" />
            )}
            <span className="ml-3">Add to cart</span>
          </button>
          <button
            className="nc-Button relative h-auto inline-flex items-center justify-center rounded-full transition-colors text-sm sm:text-base font-medium py-3 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 border bg-brand-orange hover:bg-orange-400 text-slate-50 flex-1 flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-6000"
            onClick={buyNowHandler}
          >
            {isCartLoading ? <ButtonLoader /> : <BsLightning size="18" />}
            <span className="ml-2">Buy Now</span>
          </button>
        </>
      )}
    </div>
  );
};

export default AddCartDesktop;
