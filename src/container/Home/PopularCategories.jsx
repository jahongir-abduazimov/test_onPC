import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Image from "next/image";
import request from "@/components/config";
import Link from "next/link";
import "react-loading-skeleton/dist/skeleton.css";
import { useTranslation } from "react-i18next";

const PopularCategories = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const filteredCategories = categories.filter((c) => c.is_popular === true);
  const getCategories = async () => {
    setIsLoading(true);
    try {
      const response = await request.get("/product/category/list/");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <section className="pb-10 md:pb-20">
        <Container>
          <div className="flex mb-4 md:mb-[30px]">
            <h1 className="text-[#111111] text-[18px] md:text-[30px] pb-1 font-medium md:font-semibold md:border-b-[3px] border-b-[#E2231F]">
              Ommabop kategoriyalar
            </h1>
          </div>
          {isLoading ? (
            <div className="flex items-center gap-6 justify-between overflow-x-auto scrollbar-none">
              {[...Array(6)].map((_, index) => (
                <button key={index} className="min-w-[184px] shadow-[0_5px_10px_#7171711F] p-3 md:py-5 h-[56px] md:h-[166px] rounded-lg bg-[#F7F7F7] flex flex-row-reverse md:flex-col justify-between gap-2 items-center md:justify-end" />
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-6 justify-between overflow-x-auto scrollbar-none">
              {filteredCategories.map((item) => (
                <Link
                  href={{
                    pathname: `/categories/${item.name_en
                      .replace(/\s+/g, "-")
                      .toLowerCase()}`,
                    query: { query: item.id },
                  }}
                  key={item.id}
                >
                  <button className="min-w-[184px] shadow-[0_5px_10px_#7171711F] p-3 md:py-5 h-[56px] md:h-[166px] rounded-lg bg-[#F7F7F7] flex flex-row-reverse md:flex-col justify-between gap-2 items-center md:justify-end">
                    <div>
                      <Image
                        width={300}
                        height={300}
                        className="w-[40px] md:w-[80px]"
                        src={
                          item?.icon.slice(0, 4) == "http"
                            ? item.icon || null
                            : `https://pc.repid.uz${item?.icon}` || null
                        }
                        alt={item.name_uz}
                      />
                    </div>
                    {
                      <p className="text-[#2D2D2D] text-center text-xs md:text-base">
                        {item.name_uz}
                      </p>
                    }
                  </button>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
};

export default PopularCategories;
