import React, { useState } from "react";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

const Filter = ({ name, values, filters, setFilters }) => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);

  const handleCheckboxChange = (valueId) => {
    setFilters((prevFilters) => {
      const currentValues = prevFilters.info;
      const updatedValues = currentValues.includes(valueId)
        ? currentValues.filter((id) => id !== valueId)
        : [...currentValues, valueId];
      return {
        ...prevFilters,
        info: updatedValues,
      };
    });
  };

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  return (
    <div className="bg-white rounded-lg pr-4 md:w-72 h-auto">
      <div className="mt-4">
        <div
          className="flex flex-row cursor-pointer justify-between"
          onClick={toggleDropdown}
        >
          <h4 className="text-gray-800 font-semibold mb-2">{name}</h4>
          <span className="text-gray-600">
            {isDropDownOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
          </span>
        </div>
        {isDropDownOpen && (
          <ul>
            {values.map((value, index) => (
              <li
                key={`${value.id}-${index}`}
                className="flex items-center mb-2"
              >
                <input
                  type="checkbox"
                  id={value.id}
                  value={value.name}
                  checked={filters.info.includes(value.id)}
                  onChange={() => handleCheckboxChange(value.id)}
                  className={` h-4 w-4 rounded border border-gray-400 checked:bg-red-500 checked:border-red-500`}
                />
                <label
                  htmlFor={value.name}
                  className="ml-2 text-gray-700 text-sm flex items-center"
                >
                  {name}
                  <span className="text-gray-400 text-xs ml-1">
                    ({value.name})
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Filter;
