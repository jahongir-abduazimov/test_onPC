import React from "react";
import MainHeader from "@/container/Home/MainHeader";
import PopularCategories from "@/container/Home/PopularCategories";
import DiscountProducts from "@/container/Home/DiscountProducts";
import NewProducts from "@/container/Home/NewProducts";
import PopularProducts from "@/container/Home/PopularProducts";
import Advertisement from "@/container/Home/Advertisement";

function HomePage() {
  return (
    <>
      <MainHeader />
      <PopularCategories />
      <DiscountProducts />
      <NewProducts />
      <Advertisement />
      <PopularProducts />
    </>
  );
}

export default HomePage;
