"use client";
import React, { useEffect } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import request from "@/components/config";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const NewProducts = () => {
  const [products, setProducts] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await request.get("/product/product/top/list/");
      setProducts(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const ProductCard = ({ id, name, image, price }) => (
    <div className="min-w-[170px] md:min-w-[227px] max-w-[170px] md:max-w-[227px] h-[220px] md:h-[310px] rounded-[16px] border border-[#EDEDED] hover:border-mainColor hover:shadow-lg duration-150 overflow-hidden">
      <div className="h-[65%] bg-[#F5F5F5] p-3">
        <div className="flex items-center justify-center h-full">
          <Image
            width={300}
            height={300}
            className="h-full w-auto"
            src={image}
            alt={name}
            priority
          />
        </div>
      </div>
      <div className="h-[35%] p-2 md:p-3">
        <h2 className="text-[#222222] text-sm md:text-base font-medium md:mb-1.5 line-clamp-1">
          {name}
        </h2>
        <p className="text-[#6F6F6F] text-sm md:text-base line-clamp-1 md:border-b border-b-[#EDEDED] md:pb-1.5 md:mb-1.5">
          {Number(price).toLocaleString("en-US")} UZS
        </p>
        <Link
          href={`product/${id}`}
          className="text-mainColor border-b border-b-mainColor leading-4"
        >
          Batafsil
        </Link>
      </div>
    </div>
  );
  return (
    <>
      <section className="pb-10 md:pb-20">
        <Container>
          <div className="flex mb-5 md:mb-[30px] justify-between">
            <h1 className="text-[#111111] text-[18px] md:text-[30px] pb-1 font-medium md:font-semibold md:border-b-[3px] border-b-[#E2231F]">
              Topdagi mahsulotlar
            </h1>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-4 scrollbar-none justify-between overflow-x-auto">
              {[...Array(5)].map((_, index) => (
                <div className="min-w-[170px] md:min-w-[227px] max-w-[170px] md:max-w-[227px] h-[220px] md:h-[310px] rounded-[16px] overflow-hidden" key={index}>
                  <Skeleton className="h-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className={`flex items-center gap-5 scrollbar-none overflow-x-auto ${products.length > 4 ? "justify-between" : "justify-normal"}`}>
              {products.map((item) => (
                <ProductCard
                  key={item.id}
                  id={item.id}
                  name={item.name_uz}
                  price={item.is_discount ? item.discount_price : item.price}
                  image={
                    item?.main_image.slice(0, 4) == "http"
                      ? item.main_image || null
                      : `https://pc.repid.uz${item?.main_image}` || null
                  }
                />
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default NewProducts;
