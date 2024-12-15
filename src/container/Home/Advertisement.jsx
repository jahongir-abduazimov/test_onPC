import React, { useEffect, useState } from "react";
import Image from "next/image";
import Container from "@/components/Container";
import { GoArrowRight } from "react-icons/go";
import request from "@/components/config";
import { useRouter } from "next/navigation";

const Advertisement = () => {
  const [product1, setProduct1] = useState([]);
  const [product2, setProduct2] = useState([]);
  const navigate = useRouter();
  const getProduct = async () => {
    try {
      const response = await request("/product/most-popular-product/list/");
      console.log(response);
      setProduct1(response.data[0]);
      setProduct2(response.data[1]);
    } catch (e) {
      console.error("Error fetching product", e);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);
  return (
    <>
      <section className="pb-[50px] md:pb-[100px]">
        <Container>
          <div className="flex justify-between gap-6">
            <div className="w-full lg:w-[63%] duration-200 flex justify-between items-center gap-5 md:h-[420px] py-5 md:py-9 px-[25px] md:px-[50px] rounded-[12px] overflow-hidden bg-[url('/images/ads-bg2.png'),url('/images/ads-bg.png')] bg-no-repeat bg-cover">
              <div className="w-[50%] flex flex-col items-center">
                <h2 className="text-base md:text-[30px] font-medium text-white mb-6">
                  {product1?.name_uz}
                </h2>
                <Image
                  width={500}
                  height={500}
                  className="w-[200px] md:w-[378px] lg:w-[278px] xl:w-[378px]"
                  src={
                    product1?.banner
                      ? product1?.banner?.slice(0, 4) == "http"
                        ? product1?.banner
                        : `https://pc.repid.uz${product1?.banner}`
                      : null
                  }
                  alt={product1?.name_uz || "banner"}
                />
              </div>
              <div className="w-[50%]">
                <p className="text-sm md:text-xl font-medium text-white mb-2 line-clamp-1">
                  {product1?.title_uz}
                </p>
                <p className="text-xs md:text-base text-[#919191] max-w-[348px] mb-5 md:mb-10 line-clamp-6">
                  {product1?.description_uz}
                </p>
                <button
                  onClick={() => navigate.push(`/product/${product1?.product}`)}
                  className="w-[120px] md:w-[180px] h-8 md:h-12 bg-mainColor text-white flex gap-2 rounded-[2px] hover:bg-mainColor/85 duration-200 items-center justify-center"
                >
                  <span className="text-xs md:text-sm font-bold">O'tish</span>
                  <GoArrowRight size={20} />
                </button>
              </div>
            </div>
            <div onClick={() => navigate.push(`/product/${product2?.product}`)} className="w-[37%] cursor-pointer hidden duration-200 lg:block relative bg-[#071B3B] rounded-xl overflow-hidden">
              <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                <h2 className="font-semibold text-[28px] text-[#fff]">
                  {product2?.name_uz}
                </h2>
                <div className="max-w-[350px] min-w-[350px] flex items-center justify-center">
                  <Image
                    width={500}
                    height={500}
                    src={
                      product2?.banner
                        ? product2?.banner?.slice(0, 4) == "http"
                          ? product2?.banner
                          : `https://pc.repid.uz${product2?.banner}`
                        : null
                    }
                    alt={product2?.name_uz || "banner"}
                  />
                </div>
              </div>
              <div className="advertisement2-banner duration-200 w-[210px] h-[210px] bg-mainColor rounded-full absolute -top-[102px] -left-[111px]" />
              <div className="advertisement2-banner duration-200 w-[566px] h-[320px] bg-mainColor rounded-[50%] absolute -bottom-[119px] -left-[51px]" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Advertisement;
