import { ButtonMinus } from "@components/icons/button-minus";
import { ButtonPlus } from "@components/icons/button-plus";
import React, { useState } from "react";

interface IAddToCartMobileProps {
  QtyIncrement: () => void;
  QtyDecrement: () => void;
  stock: number;
  quantity: number;
  addToCartHandler: () => void;
  buyNowHandler: () => void;
}

const AddToCartMobile: React.FC<IAddToCartMobileProps> = ({
  QtyIncrement,
  QtyDecrement,
  stock,
  quantity,
  addToCartHandler,
  buyNowHandler,
}) => {
  const [QtyHandler, setQtyHandler] = useState<boolean>(false);
  const isCartLoading = false;
  return (
    <div>
      <div
        className={`${
          QtyHandler ? "block" : "hidden"
        } fixed bottom-16 left-0 right-0 h-16 bg-brand-lightgray shadow-addcartbutton z-50 transition duration-700 ease-in-out`}
      >
        <div className="flex items-center justify-center bg-slate-100/70 px-4 py-3 sm:p-3.5 rounded-full">
          <div className="flex items-center space-x-7 w-full">
            <span className="text-lg">Select Quantity:</span>
            <div className=" flex items-center justify-center w-[104px] sm:w-28">
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
      </div>
      <div
        className={`${
          QtyHandler ? "" : "shadow-addcartbutton"
        } fixed bottom-0 left-0 right-0 h-16 bg-brand-lightgray z-50`}
      >
        <div className="grid grid-cols-5 gap-2 justify-center items-center px-2 py-2">
          <div
            className="col-span-1 flex flex-col text-center"
            onClick={(e) => setQtyHandler(!QtyHandler)}
          >
            <span className="text-sm font-medium">Qty</span>
            <span className="text-md font-extrabold">{quantity}</span>
          </div>
          {stock === 0 ? (
            <>
              <div className="col-span-4">
                <button
                  className="relative h-auto w-full  flex-row inline-flex items-center justify-center rounded-lg transition-colors text-sm sm:text-base font-medium py-3.5 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 text-slate-50 shadow-xl"
                  disabled
                >
                  <span className="ml-3 rtl:mr-3 text-md">Out Of Stock</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="col-span-2">
                <button
                  className="relative h-auto w-full flex-row inline-flex items-center justify-center rounded-lg transition-colors text-sm sm:text-lg font-bold py-3.5 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 border bg-brand-orange  text-slate-50 shadow-2xl "
                  onClick={buyNowHandler}
                >
                  <span className="ml-2 rtl:mr-2">Buy Now</span>
                </button>
              </div>
              <div className="col-span-2">
                <button
                  className="relative h-auto w-full  flex-row inline-flex items-center justify-center rounded-lg transition-colors text-sm sm:text-base font-medium py-3.5 px-4 sm:py-3.5 sm:px-6 disabled:bg-opacity-90 bg-slate-900 text-slate-50 shadow-xl"
                  onClick={addToCartHandler}
                >
                  <span className="ml-3 rtl:mr-3 text-md">Add to cart</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddToCartMobile;
