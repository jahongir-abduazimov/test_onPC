import React from "react";
import Image from "next/image";
import { IoCheckmarkSharp } from "react-icons/io5";
import Link from "next/link";

const ProductCard = ({ data, selected, handleSelect }) => {
  return (
    <div
      className={`relative h-[250px] sm:h-[310px] p-2 sm:p-4 border duration-100 w-full rounded-lg ${
        selected
          ? "bg-mainColor/5 border-mainColor"
          : "bg-white border-[#E4E7E9]"
      }`}
    >
      <button
        onClick={() => handleSelect(data)}
        className={`absolute bg-white top-3 right-3 border border-mainColor p-0.5 rounded-[2px] min-w-[27px] h-[27px]`}
      >
        {selected && <IoCheckmarkSharp size={20} color="#ff0000" />}
      </button>
      <Link href={`/product/${data.id}`}>
        <div
          className={`w-full min-h-[132px] sm:min-h-[172px] max-h-[132px] sm:max-h-[172px] flex items-center duration-100 justify-center mb-6 overflow-hidden ${
            selected ? "bg-[#fff]" : "bg-[#F5F5F5]"
          }`}
        >
          <Image
            width={300}
            height={300}
            src={data.main_image}
            alt={data.name_uz}
            priority            
          />
        </div>
        <p className="line-clamp-2 mb-2 text-sm text-[#191C1F]">
          {data.name_uz}
        </p>
        <p className="text-sm text-mainColor font-semibold">
          {data.is_discount
            ? data.discount_price.toLocaleString("en-US")
            : data.price.toLocaleString("en-US")}{" "}
          UZS
        </p>
      </Link>
    </div>
  );
};

export default ProductCard;
