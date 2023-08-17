import React, { useState, useEffect } from "react";
import RCSlider from "@libs/RCSlider";

interface IPriceFilterProps {
  minValue: number;
  maxValue: number;
  value: number[];
  onRangeChange: (values: number | number[]) => void;
  handleSlide: () => void;
}

const PriceFilter: React.FunctionComponent<IPriceFilterProps> = ({
  minValue,
  maxValue,
  value,
  onRangeChange,
  handleSlide,
}) => {
  const [sliderValues, setSliderValues] = useState<number[]>(value);

  const handleRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      setSliderValues(values);
    }
  };

  useEffect(() => {
    onRangeChange(sliderValues);
  }, [sliderValues, onRangeChange]);
  return (
    <>
      <div className="space-y-4">
        <span className="font-semibold text-lg">Price range</span>
        <div className="flex justify-between space-x-5">
          <RCSlider
            minRange={minValue}
            maxRange={maxValue}
            value={sliderValues} // Use sliderValues as the value prop for RCSlider
            onChange={handleRangeChange}
          />
        </div>
      </div>
      <div className="flex justify-between space-x-5 pt-3">
        <div>
          <label
            htmlFor="minPrice"
            className="block text-sm font-medium text-neutral-700 "
          >
            Min price
          </label>
          <div className="mt-1 relative rounded-md">
            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
              AED
            </span>
            <input
              id="minPrice"
              className="block w-24 pr-6 pl-2 py-2 sm:text-sm border border-slate-200 rounded-full bg-transparent"
              type="text"
              name="minPrice"
              value={sliderValues[0]}
              readOnly
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="maxPrice"
            className="block text-sm font-medium text-neutral-700 "
          >
            Max price
          </label>
          <div className="mt-1 relative rounded-md">
            <span className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-neutral-500 sm:text-sm">
              AED
            </span>
            <input
              id="maxPrice"
              className="block w-24 pr-6 pl-2 py-2 sm:text-sm border border-slate-200 rounded-full bg-transparent"
              type="text"
              name="maxPrice"
              value={sliderValues[1]}
              readOnly
            />
          </div>
        </div>
      </div>

      <div className="mt-4 relative rounded-md flex items-center justify-end">
        <button
          className="text-black sm:text-sm cursor-pointer px-1 py-0.5 border bg-slate-200 rounded-md"
          onClick={handleSlide}
        >
          Filter
        </button>
      </div>
    </>
  );
};

export default PriceFilter;
