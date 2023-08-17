import * as React from "react";
import { ButtonMinus } from "./icons/button-minus";
import { ButtonPlus } from "./icons/button-plus";

interface ICounterProps {
  quantity: number;
  QtyDecrement: () => void;
  QtyIncrement: () => void;
  disabled: boolean;
}

const Counter: React.FC<ICounterProps> = ({
  quantity,
  QtyDecrement,
  QtyIncrement,
  disabled,
}) => {
  return (
    <div className="items-center justify-between rounded-full overflow-hidden shrink-0 inline-flex bg-slate-100/80 text-black">
      <div className="flex items-center justify-between p-1 sm:p-2 space-x-4 w-full">
        <button
          className="flex items-center justify-center shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none w-5 sm:w-6 h-5 sm:h-6 border border-border-three rounded-full"
          type="button"
          disabled={quantity < 2}
          onClick={QtyDecrement}
        >
          <ButtonMinus width={14} height={14} opacity="1" />
        </button>
        <span className="select-none block flex-1 text-center leading-none">
          {quantity}
        </span>
        <button
          className="flex items-center justify-center shrink-0 transition-all ease-in-out duration-300 focus:outline-none focus-visible:outline-none w-5 sm:w-6 h-5 sm:h-6  border border-border-three rounded-full"
          type="button"
          onClick={QtyIncrement}
          disabled={disabled}
        >
          <ButtonPlus width={14} height={14} opacity="1" />
        </button>
      </div>
    </div>
  );
};

export default Counter;
