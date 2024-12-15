import Container from "@/components/Container";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { IoCheckmarkSharp } from "react-icons/io5";
import request from "./../../components/config/index"; // Import your axios configuration
import { useRouter } from "next/router";

// Helper functions for localStorage
const getLikedProducts = () => {
  const stored = localStorage.getItem("likedProducts");
  return stored ? JSON.parse(stored) : [];
};

const addProductToLiked = (id) => {
  const likedProducts = getLikedProducts();
  const numericId = Number(id); // Convert to number
  if (!likedProducts.includes(numericId)) {
    likedProducts.push(numericId);
    localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
  }
};

const removeProductFromLiked = (id) => {
  let likedProducts = getLikedProducts();
  const numericId = Number(id); // Convert to number
  likedProducts = likedProducts.filter((productId) => productId !== numericId);
  localStorage.setItem("likedProducts", JSON.stringify(likedProducts));
};

const getCartProducts = () => {
  const stored = localStorage.getItem("cartProducts");
  return stored ? JSON.parse(stored) : [];
};

const addProductToCart = (id) => {
  const cartProducts = getCartProducts();
  const numericId = Number(id); // Convert to number
  if (!cartProducts.includes(numericId)) {
    cartProducts.push(numericId);
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
  }
};

function Detail({ id }) {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const navigate = useRouter();
  useEffect(() => {
    if (id) {
      request
        .get(`/product/product/${id}/`)
        .then((response) => {
          const data = response.data;

          setProduct(data);
          setSelectedImage(data.main_image);
          console.log(product);

          const likedProducts = getLikedProducts();
          const cartProducts = getCartProducts();
          const numericId = Number(data.id); // Convert to number

          setIsLiked(likedProducts.includes(numericId));
          setIsInCart(cartProducts.includes(numericId));
        })
        .catch((error) => {
          console.error("Failed to fetch product:", error);
        });
    }
  }, [id]);

  const handleLiked = () => {
    setIsLiked((prev) => !prev);
    const numericId = Number(id);
    if (isLiked) {
      removeProductFromLiked(numericId);
    } else {
      addProductToLiked(numericId);
    }
  };

  const handleAddToCart = () => {
    const numericId = Number(id);
    if (!isInCart) {
      addProductToCart(numericId);
      setIsInCart(true);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Container>
        <div className="flex flex-col lg:flex-row items-start justify-center gap-8 py-8">
          <div className="relative flex flex-col items-center gap-4 mx-auto">
            <div className="relative">
              <Image
                src={`https://pc.repid.uz${product.main_image}`}
                alt="Product Image"
                width={496}
                height={338}
              />
            </div>

            <div className="flex gap-4">
              {product.medias.length > 0
                ? product.medias.map((image, index) => (
                  <div
                    key={index}
                    className={`w-16 h-16 border p-1 cursor-pointer ${selectedImage === image
                        ? "border-red-600"
                        : "border-gray-300"
                      }`}
                    onClick={() => setSelectedImage(image)}
                  >
                    <Image
                      src={`https://pc.repid.uz${image}`}
                      alt={`Thumbnail ${index + 1}`}
                      width={80}
                      height={71}
                      className="object-cover"
                    />
                  </div>
                ))
                : null}
            </div>

            <div
              className="absolute top-2 left-2 cursor-pointer z-10"
              onClick={handleLiked}
            >
              {isLiked ? (
                <FaHeart size={20} color="red" />
              ) : (
                <FaRegHeart size={20} color="red" />
              )}
            </div>
          </div>

          <div className="flex flex-col w-full lg:w-2/3 gap-4">
            <div>
              <h1 className="text-[18px] font-normal mb-4">
                {product.name_uz}
              </h1>
              <div className="mb-2 text-[14px] font-semibold">
                <p>
                  <strong className="text-gray-600">Kategoriya:</strong>{" "}
                  {product.category_name}
                </p>
                <p>
                  <strong className="text-gray-600">Brand:</strong>{" "}
                  {product.brand_name}
                </p>
              </div>
              <div className="flex items-center gap-4 mb-6">
                {product.discount_percentage !== 0 && (
                  <div className="flex flex-row items-center gap-4">
                    <h1 className="text-[24px] font-semibold text-red-600">
                      {product.discount_price.toLocaleString()} UZS
                    </h1>
                    <p className="text-[18px] line-through text-gray-500">
                      {product.price.toLocaleString()} UZS
                    </p>
                  </div>
                )}
                {product.discount_percentage !== 0 && (
                  <div className="bg-[#EFD33D] px-[10px] font-semibold py-[5px] rounded-[2px] text-[14px] text-[#191C1F]">
                    {product.discount_percentage}% Chegirma
                  </div>
                )}
                {product.discount_percentage === 0 && (
                  <h1 className="text-[24px] font-semibold text-red-600">
                    {product.price.toLocaleString()} UZS
                  </h1>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 border-t-2 pt-8">
              <div>
                <p className="text-[14px] font-semibold mb-4">Rang</p>
                <div className="flex gap-4">
                  {product.colors.map((color) => (
                    <div
                      key={color.id}
                      className={`rounded-full h-8 w-8 cursor-pointer`}
                      style={{
                        backgroundColor: color.rgba_name,
                        border: "1px solid black",
                      }}
                    />
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[14px] font-semibold mb-4">O'lcham</p>

                <h1>14-inch Liquid Retina XDR display</h1>
              </div>
              <div>
                <p className="text-[14px] font-semibold mb-4">Xotira</p>
                16GB unified memory
              </div>

              <div>
                <p className="text-[14px] font-semibold mb-4">Protsessor</p>
                <h1>1TB SSD Storage</h1>
              </div>
            </div>

            <div className="grid grid-cols-2 md:flex md:flex-row md:items-center justify-between gap-4 mb-8">
              <div className="flex items-center border-2 rounded-[3px] w-[164px]">
                <button
                  onClick={handleDecrement}
                  className="px-4 py-2 text-lg font-semibold"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 text-center rounded"
                  min="1"
                />
                <button
                  onClick={handleIncrement}
                  className="px-4 py-2 text-lg font-semibold"
                >
                  +
                </button>
              </div>
              <button
                onClick={() => {
                  if (isInCart) {
                    navigate.push("/cart");
                  } else {
                    handleAddToCart();
                  }
                }}
                className="bg-[#FF0000] border-2 border-[#FF0000] text-white px-6 py-3 rounded-[3px] w-full flex flex-row items-center justify-center gap-4"
              >
                {isInCart ? (
                  <IoCheckmarkSharp size={20} />
                ) : (
                  <span className="text-xs sm:text-sm">Savatga</span>
                )}

                <LuShoppingCart color="white" size={20} />
              </button>
              <button
                onClick={() => {
                  const orderData = {
                    name: product.name_uz,
                    image: product.main_image,
                    quantity: quantity,
                    price: product.is_discount
                      ? product.discount_price
                      : product.price,
                    totalAmount:
                      (product.is_discount
                        ? product.discount_price
                        : product.price) * quantity,
                    discount: product.is_discount
                      ? (product.price - product.discount_price) * quantity
                      : 0,
                  };

                  navigate.push({
                    pathname: "/order",
                    query: { orderData: JSON.stringify(orderData) },
                  });
                }}
                className="border-2 border-[#FF0000] px-6 py-3 rounded-[3px] text-[#FF0000] w-full col-span-2"
              >
                Xarid qilish
              </button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Detail;
