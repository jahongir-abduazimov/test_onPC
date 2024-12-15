// context/ProductContext.js
import React, { createContext, useState, useEffect } from "react";

// Create context
const ProductContext = createContext();

// Context provider
export const ProductProvider = ({ children }) => {
  const [likedProducts, setLikedProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  // Initialize liked and cart products from localStorage
  useEffect(() => {
    const storedLiked = localStorage.getItem("likedProducts");
    const storedCart = localStorage.getItem("cartProducts");
    setLikedProducts(storedLiked ? JSON.parse(storedLiked) : []);
    setCartProducts(storedCart ? JSON.parse(storedCart) : []);
  }, []);

  const addProductToLiked = (id) => {
    if (!likedProducts.includes(id)) {
      const updated = [...likedProducts, id];
      setLikedProducts(updated);
      localStorage.setItem("likedProducts", JSON.stringify(updated));
    }
  };

  const removeProductFromLiked = (id) => {
    const updated = likedProducts.filter((productId) => productId !== id);
    setLikedProducts(updated);
    localStorage.setItem("likedProducts", JSON.stringify(updated));
  };

  const addProductToCart = (id) => {
    if (!cartProducts.includes(id)) {
      const updated = [...cartProducts, id];
      setCartProducts(updated);
      localStorage.setItem("cartProducts", JSON.stringify(updated));
    }
  };

  const removeProductFromCart = (id) => {
    const updated = cartProducts.filter((productId) => productId !== id);
    setCartProducts(updated);
    localStorage.setItem("cartProducts", JSON.stringify(updated));
  };

  // Get comparison products from localStorage
  const getComparisonProducts = () => {
    const stored = localStorage.getItem("compare");
    return stored ? JSON.parse(stored) : [];
  };

  // Add a product to the comparison list
  const addProductToCompare = (id) => {
    const compare = getComparisonProducts();
    if (!compare.includes(id)) {
      compare.push(id);
      localStorage.setItem("compare", JSON.stringify(compare));
    }
  };

  // Remove a product from the comparison list
  const removeProductFromCompare = (id) => {
    let compare = getComparisonProducts();
    compare = compare.filter((productId) => productId !== id);
    localStorage.setItem("compare", JSON.stringify(compare));
  };

  // useEffect(() => {
  //   if (!isLoading) {
  //     const likedProducts = getLikedProducts();
  //     const cartProducts = getCartProducts();
  //     const compareProducts = getComparisonProducts(); // Get compared products
  //     const updatedProducts = data.map((item) => ({
  //       ...item,
  //       isLiked: likedProducts.includes(item.id),
  //       isInCart: cartProducts.includes(item.id),
  //       isInCompare: compareProducts.includes(item.id), // Mark as in compare
  //     }));
  //     setProducts(updatedProducts);
  //   }
  // }, [data, isLoading]);

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

  return (
    <ProductContext.Provider
      value={{
        likedProducts,
        cartProducts,
        addProductToLiked,
        removeProductFromLiked,
        addProductToCart,
        removeProductFromCart,
        onToggleCart,
        onToggleCompare,
        onToggleLike,
        getComparisonProducts,
        removeProductFromCompare,
        addProductToCompare,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
