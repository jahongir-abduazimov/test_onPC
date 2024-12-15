import React, { useEffect, useState } from "react";
import ProductCart from "../../components/ProductCard";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRouter } from "next/router";
import request from "@/components/config";

const getLikedProducts = () => {
  const stored = localStorage.getItem("likedProducts");
  return stored ? JSON.parse(stored) : [];
};

const addProductToLiked = (id) => {
  const likedProducts = getLikedProducts();
  if (!likedProducts.includes(id)) {
    likedProducts.push(id);
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  }
};

const removeProductFromLiked = (id) => {
  let likedProducts = getLikedProducts();
  likedProducts = likedProducts.filter((productId) => productId !== id);
  localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
};

const getCartProducts = () => {
  const stored = localStorage.getItem("cartProducts");
  return stored ? JSON.parse(stored) : [];
};

const addProductToCart = (id) => {
  const cartProducts = getCartProducts();
  if (!cartProducts.includes(id)) {
    cartProducts.push(id);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
};

const removeProductFromCart = (id) => {
  let cartProducts = getCartProducts();
  cartProducts = cartProducts.filter((productId) => productId !== id);
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
};

const getComparisonProducts = () => {
  const stored = localStorage.getItem("compare");
  return stored ? JSON.parse(stored) : [];
};
const addProductToCompare = (id) => {
  const compare = getComparisonProducts();
  if (!compare.includes(id)) {
    compare.push(id);
    localStorage.setItem("compare", JSON.stringify(compare));
  }
};
const removeProductFromCompare = (id) => {
  let compare = getComparisonProducts();
  compare = compare.filter((productId) => productId !== id);
  localStorage.setItem("compare", JSON.stringify(compare));
};

function ProductList({ data, loading }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!loading) {
      const likedProducts = getLikedProducts();
      const cartProducts = getCartProducts();
      const compareProducts = getComparisonProducts();
      const uniqueProducts = Array.from(
        new Set(data.map((item) => item.id))
      ).map((id) => data.find((item) => item.id === id));

      const updatedProducts = uniqueProducts.map((item) => ({
        ...item,
        isLiked: likedProducts.includes(item.id),
        isInCart: cartProducts.includes(item.id),
        isInCompare: compareProducts.includes(item.id),
      }));

      setProducts(updatedProducts);
    }
  }, [data, loading]);

  const onToggleCompare = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isInCompare: !product.isInCompare }
          : product
      )
    );

    const isInCompare = products.find(
      (product) => product.id === id
    )?.isInCompare;
    if (isInCompare) {
      removeProductFromCompare(id);
    } else {
      addProductToCompare(id);
    }
  };

  const onToggleLike = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, isLiked: !product.isLiked } : product
      )
    );

    const isLiked = products.find((product) => product.id === id)?.isLiked;
    if (isLiked) {
      removeProductFromLiked(id);
    } else {
      addProductToLiked(id);
    }
  };

  const onToggleCart = (id) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, isInCart: !product.isInCart }
          : product
      )
    );

    const isInCart = products.find((product) => product.id === id)?.isInCart;
    if (isInCart) {
      removeProductFromCart(id);
    } else {
      addProductToCart(id);
    }
  };

  if (loading) {
    return (
      <div className="w-full grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-[24px] py-4">
        {Array(8)
          .fill(null)
          .map((_, index) => (
            <div key={index} className="h-[240px] sm:h-[310px]">
              <Skeleton className="w-full min-h-[70%] mb-3" />
              <Skeleton className="w-full min-h-[7%] mb-3" />
              <Skeleton className="max-w-[80%] min-h-[7%]" />
            </div>
          ))}
      </div>
    );
  }

  return products.length > 0 ? (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-[24px] py-4">
      {products.map((item) => (
        <ProductCart
          key={item.id}
          data={item}
          isLiked={item.isLiked}
          isInCart={item.isInCart}
          isInCompare={item.isInCompare}
          onToggleLike={onToggleLike}
          onToggleCart={onToggleCart}
          onToggleCompare={onToggleCompare}
        />
      ))}
    </div>
  ) : (
    <div className="w-full mt-16 flex items-center justify-center">
      <p className="text-xl">Mahsulot yo'q</p>
    </div>
  );
}

export default ProductList;
