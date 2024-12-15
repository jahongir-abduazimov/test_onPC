import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import DiscountFilter from "./DiscountFilter";
import FilterPrice from "./FIlterPrice";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";

import Image from "next/image";
import { IoMdClose } from "react-icons/io";
import request from "@/components/config";
import Container from "@/components/Container";

function AllFiltersMobile({ filters, setFilters, id }) {
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenFilters, setIsOpenFiters] = useState(false);

  useEffect(() => {
    const getFilters = async () => {
      setIsLoading(true);
      if (id) {
        try {
          const res = await request.get(`/product/category/info/${id}`);
          setFilterData(res.data);
        } catch (error) {
          console.error("Error fetching filter data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };
    getFilters();
  }, [id]);

  useEffect(() => {
    if (isOpenFilters) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpenFilters]);

  const handleToggleFilterDropDown = () => {
    setIsOpenFiters((prev) => !prev);
  };

  const clearFilters = () => {
    setFilters({
      is_discount: false,
      min_price: 0,
      max_price: 10000000,
      info: [],
    });
  };

  return (
    <div>
      <button
        className="text-gray-800 font-light text-[18px] flex justify-between w-full  items-center shadow-md rounded-md py-2  border-t-2  px-2"
        onClick={handleToggleFilterDropDown}
      >
        <span>Filtr</span>
        <IoIosArrowDown />
      </button>

      {isOpenFilters && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-10"
            onClick={handleToggleFilterDropDown}
          />

          <div className="absolute z-20 bg-white w-[80%] top-0 left-0 h-full">
            <div className="bg-[#071B3B] flex flex-row justify-between py-2 px-2">
              <Image
                src="/images/Logo.png"
                alt="Logo"
                width={91.48}
                height={26}
              />
              <div className="" onClick={handleToggleFilterDropDown}>
                <IoMdClose color="white" size={24} />
              </div>
            </div>
            <div
              className="flex justify-between items-center px-4"
              onClick={handleToggleFilterDropDown}
            >
              <h3 className="text-gray-800 font-bold text-lg">Filter</h3>
              <button
                onClick={clearFilters}
                className="text-red-500 text-sm font-medium hover:underline"
              >
                Tozalash
              </button>
            </div>
            <DiscountFilter filters={filters} setFilters={setFilters} />
            <FilterPrice filters={filters} setFilters={setFilters} />
            {isLoading ? (
              <p>Loading...</p>
            ) : filterData.length > 0 ? (
              filterData?.map((filter) => (
                <Filter
                  key={filter.id}
                  name={filter.name}
                  values={filter.data}
                  setFilters={setFilters}
                  filters={filters}
                />
              ))
            ) : (
              <p>No filters available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AllFiltersMobile;
