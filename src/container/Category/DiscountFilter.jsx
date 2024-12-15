import React, { useState } from "react";

function DiscountFilter({ filters, setFilters }) {
  const handleToggle = () => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      is_discount: !prevFilters.is_discount,
    }));
  };

  return (
    <div>
      <div className="flex justify-between items-center md:w-72 pr-4 mt-4">
        <h3 className="text-gray-800 font-semibold mb-2">Chegirma</h3>
        <div
          className={`w-16 h-7 flex items-center rounded-full p-1  cursor-pointer ${
            filters.is_discount ? "bg-[#FF0000]" : "bg-gray-300"
          }`}
          onClick={handleToggle}
        >
          <div
            className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
              filters.is_discount ? "translate-x-9" : "translate-x-0"
            }`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default DiscountFilter;
