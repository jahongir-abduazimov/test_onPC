import React, { useEffect, useState } from "react";
import Container from "@/components/Container";
import { GoChevronRight, GoArrowRight } from "react-icons/go";
import { HiOutlinePlus, HiOutlineMinus } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import NoImage from "../../../public/images/no-image.png";
import TrashIcon from "../../../public/icons/trash.svg";
import request from "@/components/config";
import { VscLoading } from "react-icons/vsc";
import { useRouter } from "next/navigation";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const getCartProductIds = () => {
    const stored = localStorage.getItem("cartProducts");
    return stored ? JSON.parse(stored) : [];
  };

  const fetchCartProducts = async () => {
    const ids = getCartProductIds();
    if (ids.length === 0) return;
    setLoading(true);

    try {
      const responses = await Promise.all(
        ids.map((id) => request.get(`/product/product/${id}/`))
      );
      const fetchedProducts = responses.map((res) => ({
        ...res.data,
        quantity: 1,
      }));
      setProducts(fetchedProducts);
    } catch (err) {
      console.error("Error fetching cart products:", err);
    } finally {
      setLoading(false);
    }
  };

  const incrementQuantity = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrementQuantity = (id) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };

  const removeProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.id !== id));
    const updatedIds = getCartProductIds().filter(
      (productId) => productId !== id
    );
    localStorage.setItem("cartProducts", JSON.stringify(updatedIds));
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const navigate = useRouter();

  const handleSubmit = () => {
    const cartData = {
      products: products.map((product) => ({
        name: product.name_uz,
        image: product.main_image,
        quantity: product.quantity,
        price: product.is_discount
          ? product.discount_price * product.quantity
          : product.price * product.quantity,
        discount: product.is_discount
          ? (product.price - product.discount_price) * product.quantity
          : 0,
      })),
      totalQuantity: products.reduce(
        (total, product) => total + product.quantity,
        0
      ),
      totalAmount: products.reduce(
        (sum, product) =>
          sum +
          (product.is_discount ? product.discount_price : product.price) *
          product.quantity,
        0
      ),
      discountAmount: products.reduce(
        (total, product) =>
          product.is_discount
            ? total +
            (product.price - product.discount_price) * product.quantity
            : total,
        0
      ),
      delivery: "Bepul",
    };

    console.log("Cart Data:", cartData);
    navigate.push({
      pathname: "/order",
      query: { cartData: JSON.stringify(cartData) },
    });
  };

  return (
    <section className="pt-4 md:pt-6 pb-[50px] md:pb-[100px]">
      <Container>
        <div className="flex items-center gap-1 md:gap-2 mb-4 md:mb-6">
          <Link href={"/"} className="text-sm md:text-lg text-[#717171]">
            Bosh sahifa
          </Link>
          <GoChevronRight size={18} color="#717171" />
          <span className="text-mainColor text-sm md:text-lg border-b border-b-mainColor">
            Savatcha
          </span>
        </div>
        <p className="text-[#191C1F] text-[20px] md:text-[24px] font-medium mb-5">
          Savatcha
        </p>
        {loading ? (
          <div className="flex justify-center items-center py-10">
            <VscLoading color="#FF0000" className="animate-spin" size={40} />
          </div>
        ) : products.length > 0 ? (
          <div className="flex flex-col lg:flex-row lg:items-start gap-[30px]">
            {/* Mahsulotlar */}
            <div className="hidden sm:block w-full lg:w-[62.5%] border-b border-b-[#E4E7E9]">
              <div className="w-full h-[38px] bg-[#F2F4F5] flex items-center gap-2 border border-[#E4E7E9] px-6">
                <p className="text-xs w-[45%] font-medium text-[#475156]">
                  MAHSULOTLAR
                </p>
                <p className="text-xs w-[25%] font-medium text-[#475156]">
                  MAHSULOT SONI
                </p>
                <p className="text-xs font-medium text-[#475156]">NARXI</p>
              </div>
              <div className="p-6 flex flex-col gap-y-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="w-full h-[72px] py-3 flex gap-2 items-center"
                  >
                    <div className="flex items-center gap-3 w-[45%]">
                      <div className="h-full min-w-[72px] max-w-[72px]">
                        <Image
                          width={200}
                          height={200}
                          src={
                            product?.main_image.startsWith("http")
                              ? product.main_image || NoImage
                              : `https://pc.repid.uz${product?.main_image}` ||
                              NoImage
                          }
                          alt="product image"
                        />
                      </div>
                      <h2 className="text-[#191C1F] text-sm max-w-[220px] line-clamp-2 hover:text-mainColor cursor-pointer duration-150">
                        <Link href={`/product/${product.id}`}>
                          {product.name_uz}
                        </Link>
                      </h2>
                    </div>
                    <div className="w-[25%]">
                      <div className="w-[85%] flex items-center justify-between gap-3 border border-[#E4E7E9] rounded-[3px] h-12">
                        <button
                          onClick={() => decrementQuantity(product.id)}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <HiOutlineMinus size={22} color="#929FA5" />
                        </button>
                        <span className="text-[#475156] min-w-[30px] flex items-center justify-center">
                          {product.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(product.id)}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <HiOutlinePlus size={22} color="#929FA5" />
                        </button>
                      </div>
                    </div>
                    <div className="min-w-[125px]">
                      <span className="text-[#191C1F] text-sm font-medium">
                        {product.is_discount
                          ? (
                            product.discount_price * product.quantity
                          ).toLocaleString("en-US")
                          : (product.price * product.quantity).toLocaleString(
                            "en-US"
                          )}{" "}
                        UZS
                      </span>
                    </div>
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="ml-10"
                    >
                      <Image src={TrashIcon} alt="trash icon" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="sm:hidden flex flex-col gap-3">
              {products.map((item) => (
                <div
                  key={item.id}
                  className="relative w-full bg-[#F2F4F5] p-6 border border-[#E4E7E9] rounded-md"
                >
                  <div className="flex items-center gap-3 mb-5">
                    <div className="min-w-[72px] max-w-[72px] min-h-[72px] max-h-[72px]">
                      <Image
                        width={200}
                        height={200}
                        src={
                          item?.main_image.startsWith("http")
                            ? item.main_image
                            : `https://pc.repid.uz${item?.main_image}`
                        }
                        alt={item.name_uz}
                      />
                    </div>
                    <h2 className="text-[#191C1F] active:text-mainColor duration-150 text-[14px] line-clamp-2">
                      <Link href={`/product/${item.id}`}>{item.name_uz}</Link>
                    </h2>
                  </div>
                  <div className="flex justify-between gap-3">
                    <div>
                      <p className="text-[#475156] text-xs font-medium mb-3">
                        NARX
                      </p>
                      <p className="text-[#475156] text-sm">
                        {item.is_discount
                          ? item.discount_price.toLocaleString("en-US")
                          : item.price.toLocaleString("en-US")}{" "}
                        UZS
                      </p>
                    </div>
                    <div>
                      <p className="text-[#475156] text-xs font-medium mb-3">
                        MAHSULOT SONI
                      </p>
                      <div className="w-[148px] flex items-center justify-between bg-[#fff] gap-3 border border-[#E4E7E9] rounded-[3px] h-12">
                        <button
                          onClick={() => decrementQuantity(item.id)}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <HiOutlineMinus size={22} color="#929FA5" />
                        </button>
                        <span className="text-[#475156] min-w-[30px] flex items-center justify-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => incrementQuantity(item.id)}
                          className="w-full h-full flex items-center justify-center"
                        >
                          <HiOutlinePlus size={22} color="#929FA5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end justify-between mt-5">
                    <div>
                      <p className="text-[#475156] text-xs font-medium mb-3">
                        JAMI
                      </p>
                      <p className="text-lg font-medium text-[#191C1F]">
                        {item.is_discount
                          ? (
                            item.discount_price * item.quantity
                          ).toLocaleString("en-US")
                          : (item.price * item.quantity).toLocaleString(
                            "en-US"
                          )}{" "}
                        UZS
                      </p>
                    </div>
                    <button
                      onClick={() => removeProduct(item.id)}
                      className="w-[40px] h-[40px] rounded-full bg-[#fff] flex items-center justify-center border border-[#E4E7E9]"
                    >
                      <Image src={TrashIcon} alt="trash icon" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Ma'lumotlar */}
            <div className="w-full lg:w-[37.5%] border border-[#E4E7E9] rounded-[4px] px-6 pt-5 pb-6">
              <p className="text-lg text-[#191C1F] mb-5">Ma'lumotlar</p>
              <div className="flex flex-col gap-y-3 border-b border-b-[#E4E7E9] pb-4 mb-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#5F6C72]">
                    Umumiy mahsulotlar soni
                  </p>
                  <p className="text-[#191C1F] text-sm font-medium">
                    {products.reduce(
                      (total, product) => total + product.quantity,
                      0
                    )}{" "}
                    ta
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-[#5F6C72]">Chegirma</p>
                  <p className="text-[#191C1F] text-sm font-medium">
                    {products
                      .reduce(
                        (total, product) =>
                          product.is_discount
                            ? total +
                            (product.price - product.discount_price) *
                            product.quantity
                            : total,
                        0
                      )
                      .toLocaleString("en-US")}{" "}
                    UZS
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
                  {products
                    .reduce(
                      (sum, product) =>
                        sum +
                        (product.is_discount
                          ? product.discount_price
                          : product.price) *
                        product.quantity,
                      0
                    )
                    .toLocaleString("en-US")}{" "}
                  UZS
                </p>
              </div>
              <button
                onClick={handleSubmit}
                className={`text-[#fff] text-sm font-bold w-full rounded-[2px] duration-200 flex items-center h-12 justify-center gap-2 bg-mainColor sm:hover:bg-[#DD0405] active:bg-[#DD0405]`}
              >
                <span>RASMIYLASHTIRISH</span>
                <GoArrowRight size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 md:py-5">
            <p className="text-lg text-[#191C1F] mb-10">Savatcha boʻsh</p>
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

export default Cart;
