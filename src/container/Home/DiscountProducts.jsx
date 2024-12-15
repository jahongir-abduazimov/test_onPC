import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import Slider from "react-slick";
import request from "@/components/config";
import { useRouter } from "next/navigation";

const DiscountProducts = () => {
  const [data, setData] = useState();
  const navigate = useRouter()
  const settings = {
    dots: true,
    speed: 350,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    className: "main-slider-class",
    dotsClass: "discount-dots-class",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          centerMode: true,
          slidesToShow: 1,
          dots: false,
        },
      },
    ],
  };

  const getData = async () => {
    try {
      const response = await request.get("/product/discounted-product/list/");
      console.log(response);
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <section className="min-[425px]:pb-10 md:pb-20 overflow-hidden">
        <Container>
          <div className="flex mb-5 md:mb-[30px] justify-between md:border-b border-b-[#EDEDED]">
            <h1 className="text-[#111111] text-[18px] md:text-[30px] pb-1 font-medium md:font-semibold md:border-b-[3px] border-b-[#E2231F]">
              Chegirmadagi mahsulotlar
            </h1>
          </div>
          <div className="w-full h-auto">
            <Slider {...settings}>
              {data?.map((item) => (
                <div key={item.id} onClick={() => navigate.push(`/product/${item.product}`)} className="cursor-pointer min-h-[170px] max-h-[170px] lg:min-h-[207px] lg:max-h-[207px] max-w-[90%] min-w-[95%] outline-none rounded-md overflow-hidden">
                  <Image
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                    src={item.image?.slice(0, 4) == "http" ? item.image : `https://pc.repid.uz${item.image}`}
                    alt="ads"
                  />
                </div>
              ))}
            </Slider>
          </div>
        </Container>
      </section>
    </>
  );
};

export default DiscountProducts;
