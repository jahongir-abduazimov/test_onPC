import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { GoArrowRight, GoChevronRight } from "react-icons/go";
import request from "@/components/config";
import { useParams, useRouter } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Utility Functions for Local Storage
const getFromLocalStorage = (key) => {
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
};

const saveToLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const toggleItemInLocalStorage = (key, id) => {
  const items = getFromLocalStorage(key);
  if (items.includes(id)) {
    saveToLocalStorage(key, items.filter((item) => item !== id));
  } else {
    saveToLocalStorage(key, [...items, id]);
  }
};

const Search = () => {
  const params = useParams();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch Data
  const search = async () => {
    setIsLoading(true);
    const newData = { search: params?.paramName };
    try {
      const response = await request.post("/product/search/", newData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      const likedProducts = getFromLocalStorage("likedProducts");
      const cartProducts = getFromLocalStorage("cartProducts");
      const compareProducts = getFromLocalStorage("compare");

      const updatedProducts = response.data.products.map((item) => ({
        ...item,
        isLiked: likedProducts.includes(item.id),
        isInCart: cartProducts.includes(item.id),
        isInCompare: compareProducts.includes(item.id),
      }));

      setProducts(updatedProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    search();
  }, [params?.paramName]);

  // Toggle Functions
  const onToggleLike = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isLiked: !product.isLiked } : product
      )
    );
    toggleItemInLocalStorage("likedProducts", id);
  };

  const onToggleCart = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isInCart: !product.isInCart } : product
      )
    );
    toggleItemInLocalStorage("cartProducts", id);
  };

  const onToggleCompare = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isInCompare: !product.isInCompare }
          : product
      )
    );
    toggleItemInLocalStorage("compare", id);
  };

  const navigate = useRouter()

  return (
    <section className="pt-4 md:pt-6 pb-[50px] md:pb-[100px]">
      <Container>
        <div className="flex items-center gap-1 md:gap-2 mb-4 md:mb-6">
          <Link href={"/"} className="text-sm md:text-lg text-[#717171]">
            Bosh sahifa
          </Link>
          <GoChevronRight size={18} color="#717171" />
          <span className="text-mainColor text-sm md:text-lg border-b border-b-mainColor">
            Qidiruv natijalari
          </span>
        </div>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {Array(10)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="h-[240px] sm:h-[310px]">
                  <Skeleton className="w-full min-h-[70%] mb-3" />
                  <Skeleton className="w-full min-h-[7%] mb-3" />
                  <Skeleton className="max-w-[80%] min-h-[7%]" />
                </div>
              ))}
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {products.map((item) => (
              <ProductCard
                key={item.id}
                data={item}
                isLiked={item.isLiked}
                isInCart={item.isInCart}
                isInCompare={item.isInCompare}
                onToggleLike={() => onToggleLike(item.id)}
                onToggleCart={() => onToggleCart(item.id)}
                onToggleCompare={() => onToggleCompare(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-lg text-[#191C1F] mb-10">
              Natija topilmadi
            </p>
            <button
              onClick={() => navigate.push("/")}
              className="text-[#fff] text-sm font-bold w-[300px] sm:w-[350px] rounded-[2px] bg-mainColor hover:bg-[#DD0405] duration-200 flex items-center h-12 justify-center gap-2"
            >
              <span>Xaridni boshlang</span>
              <GoArrowRight size={20} />
            </button>
          </div>
        )}
      </Container>
    </section>
  );
};

export default Search;
