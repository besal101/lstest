import React, { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

interface IRCSliderProps {
  minRange: number;
  maxRange: number;
  value: number[];
  onChange: (values: number | number[]) => void;
}

const RCSlider: React.FC<IRCSliderProps> = ({
  minRange,
  maxRange,
  value,
  onChange,
}) => {
  const handleRangeChange = (values: number | number[]) => {
    if (Array.isArray(values)) {
      onChange(values);
    }
  };

  return (
    <div className="w-full">
      <Slider
        range
        allowCross={false}
        value={value}
        onChange={handleRangeChange}
        handleStyle={{
          background: "#E31B54",
          borderColor: "#E31B54",
        }}
        trackStyle={{ background: "#E31B54" }}
        min={minRange} // Add min and max props to set the range correctly
        max={maxRange}
      />
    </div>
  );
};

export default RCSlider;
