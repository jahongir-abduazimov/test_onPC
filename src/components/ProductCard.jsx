import React from "react";
import Image from "next/image";
import CartIcon from "../../public/icons/cart.svg";
import { RiHeart3Line, RiHeart3Fill } from "react-icons/ri";
import ComparisonIcon from "../../public/icons/comparison.svg";
import NoImage from "../../public/images/no-image.png";
import Link from "next/link";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { LiaBalanceScaleSolid } from "react-icons/lia";

const WishlistCard = ({
  data,
  isLiked,
  onToggleLike,
  onRemove,
  isInCart,
  onToggleCart,
  isInCompare,
  onToggleCompare,
}) => {
  const handleLike = () => {
    if (onToggleLike) {
      onToggleLike(data.id);
    }
  };

  const handleCompare = () => {
    if (onToggleCompare) {
      onToggleCompare(data.id);
    }
  };
  const navigate = useRouter();

  return (
    <div className="liked-product p-3 relative h-[240px] sm:h-[310px] cursor-pointer shadow-lg duration-150 sm:shadow-[0_3px_20px_#71717133] rounded-lg overflow-hidden">
      <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
        <button onClick={onRemove ? onRemove : handleLike}>
          {isLiked ? (
            <RiHeart3Fill className="text-mainColor text-[20px] sm:text-[24px]" />
          ) : (
            <RiHeart3Line className="text-mainColor text-[20px] sm:text-[24px]" />
          )}
        </button>
        <button className="lg:hidden">
          <Image
            className="w-[20px] sm:w-[24px]"
            src={ComparisonIcon}
            alt="comparison icon"
          />
        </button>
      </div>
      {data?.is_discount && (
        <div className="absolute z-10 py-1 px-1.5 bg-[#FDDBC9] rounded-r-lg top-2 left-0">
          <span className="text-[#F45E0C] text-sm sm:text-base">{`-${data?.discount_percentage}%`}</span>
        </div>
      )}
      <Link href={`/product/${data?.id}`}>
        <div className="border-b mb-2 h-[150px] sm:h-[190px] flex items-center justify-center overflow-hidden">
          <Image
            width={400}
            height={400}
            className="product-image duration-200"
            src={
              data?.main_image.slice(0, 4) == "http"
                ? data.main_image || NoImage
                : `https://pc.repid.uz${data?.main_image}` || NoImage
            }
            alt={data?.name_uz}
            priority
          />
        </div>
      </Link>
      <div className="flex flex-col justify-between">
        <Link href={`/product/${data?.id}`}>
          <h2 className="text-[#063A88] text-sm sm:text-base line-clamp-1 mb-2 sm:mb-3">
            {data?.name_uz}
          </h2>
        </Link>
        <div className="flex">
          <div className="min-w-full liked-product-price flex items-center justify-between">
            <div className="flex flex-col">
              {data?.is_discount && (
                <del className="text-[#717171] text-[10px] sm:text-sm">
                  {data.price.toLocaleString("en-US")} UZS
                </del>
              )}
              <p
                className={`duration-200 text-[#0C0C0C] text-xs sm:text-lg ${data?.is_discount ? "pt-0" : "pt-2"
                  }`}
              >
                {data?.is_discount
                  ? data?.discount_price.toLocaleString("en-US")
                  : data?.price.toLocaleString("en-US")}{" "}
                UZS
              </p>
            </div>
            <button className="text-mainColor md:hover:bg-mainColor/5 active:hover:bg-mainColor/5 duration-200 flex lg:hidden items-center gap-2 px-1 sm:px-2 py-1 sm:py-2 border sm:border-2 rounded-md sm:rounded-lg border-mainColor">
              <Image
                className="w-[20px] sm:w-auto"
                src={CartIcon}
                alt="cart icon"
              />
            </button>
          </div>
          <div className="liked-product-buttons flex min-w-full pl-5 items-center gap-2 justify-between">
            <button
              onClick={() => {
                if (isInCart) {
                  navigate.push("/cart");
                } else {
                  onToggleCart(data.id);
                }
              }}
              className="text-mainColor active:hover:bg-mainColor/5 md:hover:bg-mainColor/5 duration-200 flex items-center gap-2 px-2 sm:px-4 py-1 sm:py-2 border sm:border-2 rounded-md sm:rounded-lg border-mainColor"
            >
              <Image
                className="w-[20px] sm:w-auto"
                src={CartIcon}
                alt="cart icon"
              />
              {isInCart ? (
                <IoCheckmarkSharp size={20} />
              ) : (
                <span className="text-xs sm:text-sm">Savatga</span>
              )}
            </button>

            <button onClick={handleCompare}>
              {isInCompare ? (
                <LiaBalanceScaleSolid
                  size={32}
                  color="red"
                  className="rounded-full bg-gray-400 "
                />
              ) : (
                <LiaBalanceScaleSolid size={32} color="red" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WishlistCard;
