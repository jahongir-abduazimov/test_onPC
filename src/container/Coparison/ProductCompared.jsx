import Container from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { BsCartDash } from "react-icons/bs";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LiaBalanceScaleLeftSolid } from "react-icons/lia";

const ProductCompared = ({
  id,
  productName,
  price,
  discountPrice,
  discount,
  image,
}) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLiked = (e) => {
    e.stopPropagation();
    setIsLiked((prev) => !prev);
  };

  return (
    <div className="relative bg-white shadow-md border-t-2 rounded-lg group overflow-hidden hover:shadow-lg transition-shadow duration-300">
      {discount > 0 && (
        <div className="absolute py-1  bg-[#FDDBC9] rounded-r-lg top-2">
          <span className="text-[#F45E0C] text-sm sm:text-base">{`-${discount}%`}</span>
        </div>
      )}
      <button
        className="absolute top-2 right-2 cursor-pointer z-10"
        onClick={handleLiked}
      >
        {isLiked ? (
          <FaHeart size={20} color="red" />
        ) : (
          <FaRegHeart size={20} color="red" />
        )}
      </button>

      <Container>
        <Link href={`/product/${id}`}>
          <div className="relative group">
            <Image
              src={image}
              alt="noutbuk"
              width={256}
              height={190}
              className="group-hover:scale-105 transition-transform duration-300"
            />
            <div className="relative">
              <Image
                className="block group-hover:hidden"
                src="/images/Line.png"
                alt="Line"
                width={256}
                height={1}
              />
              <Image
                className="hidden group-hover:block"
                src="/images/hoverLine.png"
                alt="hoverLine"
                width={256}
                height={1}
              />
            </div>
          </div>
        </Link>
      </Container>
      <Link href={`/product/${id}`}>
        <div className="m-[16px]">
          <h3 className="text-gray-800 font-light text-[16px] truncate mb-[16px] group-hover:text-[#063A88]">
            {productName}
          </h3>
          <div className="flex flex-col items-start group-hover:hidden">
            <span className="text-[#717171] line-through text-[14px]">
              {price} UZS
            </span>
            <span className="text-[#0C0C0C] font-light text-[18px]">
              {discountPrice} UZS
            </span>
          </div>
        </div>
      </Link>
      <div className="hidden group-hover:flex justify-between items-center transition-all duration-300 mx-4">
        <button className="w-full flex justify-between md:mx-4 mx-8 md:gap-4 items-center border-2 border-[#FF6A6A] text-[#FF6A6A] text-[10px] md:text-[14px] px-2 py-2 rounded-[8px] cursor-pointer">
          <span>Add to cart</span>
          <BsCartDash />
        </button>
      </div>
    </div>
  );
};

export default ProductCompared;
