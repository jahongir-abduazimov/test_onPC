import React, { useState } from "react";

import RangeSlider from "react-range-slider-input";
import "react-range-slider-input/dist/style.css";

const FilterPrice = ({ filters, setFilters }) => {
  const [minValue, setMinValue] = useState(filters.min_price || 100000);
  const [maxValue, setMaxValue] = useState(filters.max_price || 10000000);

  const handleMinInputChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxValue) {
      setMinValue(value);
      setFilters((prevFilters) => ({ ...prevFilters, min_price: value }));
    }
  };

  const handleMaxInputChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minValue) {
      setMaxValue(value);
      setFilters((prevFilters) => ({ ...prevFilters, max_price: value }));
    }
  };

  const handleSliderChange = (values) => {
    const [min, max] = values;
    setMinValue(min);
    setMaxValue(max);
    setFilters((prevFilters) => ({
      ...prevFilters,
      min_price: min,
      max_price: max,
    }));
  };

  return (
    <div className="bg-white rounded-lg pr-4 md:w-72">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-800 font-semibold mb-2">Narx</h3>
      </div>
      <div className="flex items-center justify-between mt-4">
        <input
          type="text"
          value={minValue}
          onChange={handleMinInputChange}
          className="w-20 text-center border border-gray-300 rounded-lg p-1"
          placeholder="min."
          min="0"
          max={maxValue}
        />
        <input
          type="text"
          value={maxValue}
          onChange={handleMaxInputChange}
          className="w-20 text-center border border-gray-300 rounded-lg p-1"
          placeholder="max."
          min={minValue}
          max="1000"
        />
      </div>

      <div className="relative mt-6">
        <div className="absolute left-0 right-0 top-1/2 h-1 bg-gray-300 transform -translate-y-1/2"></div>

        <RangeSlider
          id="range-slider-ab"
          className="margin-lg"
          value={[minValue, maxValue]}
          onInput={handleSliderChange}
          step={100000}
          min={0}
          max={10000000}
        />
      </div>
    </div>
  );
};

export default FilterPrice;
