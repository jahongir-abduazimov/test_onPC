import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import DiscountFilter from "./DiscountFilter";
import FilterPrice from "./FIlterPrice";
import request from "@/components/config";
import { useRouter } from "next/router";

function AllFilters({ filters, setFilters, id }) {
  const [isOpenFilters, setIsOpenFilters] = useState(true);
  const [filterData, setFilterData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleToggleFilterDropDown = () => {
    setIsOpenFilters((prev) => !prev);
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
      <div
        className="flex justify-between items-center pr-4"
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
  );
}

export default AllFilters;
