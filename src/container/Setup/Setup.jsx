import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import SetupCatalog from "./Catalog";
import ProductCard from "./ProductCard";
import { GoArrowRight, GoChevronRight } from "react-icons/go";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import request from "@/components/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Setup = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await request(`/product/category/${params?.id}/`);
      setProducts(response.data.results);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params?.id) {
      getProducts();
    }
  }, [params?.id]);

  useEffect(() => {
    const savedSelectedProducts = localStorage.getItem("selectedProducts");
    if (savedSelectedProducts) {
      setSelectedProducts(JSON.parse(savedSelectedProducts));
    }
  }, []);

  const handleSelect = (product) => {
    let updatedSelectedProducts;
    if (selectedProducts.some((selected) => selected.id === product.id)) {
      updatedSelectedProducts = selectedProducts.filter(
        (selected) => selected.id !== product.id
      );
    } else {
      updatedSelectedProducts = [...selectedProducts, product];
    }

    setSelectedProducts(updatedSelectedProducts);
    localStorage.setItem(
      "selectedProducts",
      JSON.stringify(updatedSelectedProducts)
    );
  };

  const totalPrice = selectedProducts.reduce(
    (acc, product) =>
      acc + (product.is_discount ? product.discount_price : product.price),
    0
  );

  const totalDiscount = selectedProducts.reduce(
    (acc, product) =>
      acc + (product.is_discount ? product.price - product.discount_price : 0),
    0
  );

  return (
    <section className="pt-4 md:pt-6 pb-[50px] md:pb-[100px]">
      <Container>
        <div className="flex items-center gap-1 md:gap-2 mb-4 md:mb-6">
          <Link href={"/"} className="text-sm md:text-lg text-[#717171]">
            Bosh sahifa
          </Link>
          <GoChevronRight size={18} color="#717171" />
          <span className="text-mainColor text-sm md:text-lg border-b border-b-mainColor">
            Kompyuter yig'ish
          </span>
        </div>
        <h1 className="text-[#191C1F] text-[20px] md:text-[24px] font-medium mb-5">
          Kompyuter yig'ish
        </h1>
        <div className="flex flex-col lg:flex-row relative items-start gap-10 rounded-lg">
          <div className="flex flex-col w-full justify-between md:flex-row items-start gap-10">
            <SetupCatalog />
            {loading ? (
              <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-5">
                {Array(4)
                  .fill(null)
                  .map((_, index) => (
                    <div key={index} className="h-[250px] sm:h-[310px]">
                      <Skeleton className="w-full min-h-[70%] mb-3" />
                      <Skeleton className="w-full min-h-[7%] mb-3" />
                      <Skeleton className="max-w-[80%] min-h-[7%]" />
                    </div>
                  ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-5">
                {products.map((item) => (
                  <ProductCard
                    key={item.id}
                    data={item}
                    selected={selectedProducts.some(
                      (product) => product.id === item.id
                    )}
                    handleSelect={handleSelect}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="w-full lg:min-w-[340px] xl:min-w-[424px] lg:max-w-[340px] xl:max-w-[424px] lg:sticky top-0 border border-[#E4E7E9] rounded-[4px] px-6 pt-5 pb-6">
            <p className="text-lg text-[#191C1F] mb-5">Ma'lumotlar</p>
            {selectedProducts.map((product) => (
              <div key={product.id} className="flex gap-4 mb-4">
                <div className="max-w-[64px] max-h-[64px] min-w-[64px] min-h-[64px] border flex items-center justify-center">
                  <Image
                    width={100}
                    height={100}
                    src={product.main_image}
                    alt={product.name_uz}
                  />
                </div>
                <div>
                  <p className="text-[#191C1F] line-clamp-2 text-sm">
                    {product.name_uz}
                  </p>
                  <p className="text-sm font-medium text-mainColor">
                    {product.price.toLocaleString("en-US")} UZS
                  </p>
                </div>
              </div>
            ))}
            <div className="flex flex-col gap-y-3 border-b border-b-[#E4E7E9] pb-4 mb-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#5F6C72]">Umumiy mahsulotlar</p>
                <p className="text-[#191C1F] text-sm font-medium">
                  {selectedProducts.length} ta
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#5F6C72]">Chegirma</p>
                <p className="text-[#191C1F] text-sm font-medium">
                  {totalDiscount.toLocaleString("en-US")} UZS
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-[#5F6C72]">Yetkazib berish</p>
                <p className="text-[#191C1F] text-sm font-medium">Bepul</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-6">
              <p className="text-[#191C1F]">Umumiy summa</p>
              <p className="text-[#191C1F] font-semibold">
                {totalPrice.toLocaleString("en-US")} UZS
              </p>
            </div>

            <button
              onClick={() => {
                console.log("Selected Products:", selectedProducts);
              }}
              className={`text-[#fff] text-sm font-bold w-full rounded-[2px] bg-mainColor duration-200 flex items-center h-12 justify-center gap-2 ${
                selectedProducts.length === 0
                  ? "opacity-50"
                  : "hover:bg-[#DD0405]"
              }`}
              disabled={selectedProducts.length === 0}
            >
              <span>RASMIYLASHTIRISH</span>
              <GoArrowRight size={20} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Setup;
