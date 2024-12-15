import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import Link from "next/link";
import { GoChevronRight, GoArrowRight } from "react-icons/go";
import WishlistCard from "../../components/ProductCard";
import { useRouter } from "next/navigation";
import request from "@/components/config";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useRouter();

  const getLikedProductIds = () => {
    const stored = localStorage.getItem("likedProducts");
    return stored ? JSON.parse(stored) : [];
  };

  const removeFromWishlist = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);

    const updatedIds = getLikedProductIds().filter((id) => id !== productId);
    localStorage.setItem("likedProducts", JSON.stringify(updatedIds));
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

  const fetchLikedProducts = async () => {
    const ids = getLikedProductIds();
    if (ids.length === 0) return;
    setIsLoading(true);

    try {
      const responses = await Promise.all(
        ids.map((id) => request.get(`/product/product/${id}/`))
      );
      const fetchedProducts = responses.map((res) => ({
        ...res.data,
        isLiked: true,
        isInCart: getCartProducts().includes(res.data.id),
      }));
      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error fetching liked products:", err);
    } finally {
      setIsLoading(false);
    }
  };
  

  useEffect(() => {
    fetchLikedProducts();
  }, []);

  return (
    <section className="pt-4 md:pt-6 pb-[50px] md:pb-[100px]">
      <Container>
        <div className="flex items-center gap-1 md:gap-2 mb-4 md:mb-6">
          <Link href={"/"} className="text-sm md:text-lg text-[#717171]">
            Bosh sahifa
          </Link>
          <GoChevronRight size={18} color="#717171" />
          <span className="text-mainColor text-sm md:text-lg border-b border-b-mainColor">
            Sevimlilar
          </span>
        </div>
        <p className="text-[#191C1F] text-[20px] md:text-[24px] font-medium mb-5">
          Sevimlilar
        </p>
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {Array(5)
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
              <WishlistCard
                key={item.id}
                data={item}
                isLiked={item.isLiked}
                onRemove={() => removeFromWishlist(item.id)}
                isInCart={item.isInCart}
                onToggleCart={onToggleCart}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 md:py-5">
            <p className="text-lg text-[#191C1F] mb-10">
              Sevimlilar roʻyxati boʻsh
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

export default Wishlist;
