import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";

export default function OrderDetails({ setCartData, cartData, onSubmit }) {
  const router = useRouter();

  useEffect(() => {
    if (router.query.cartData) {
      try {
        setCartData(JSON.parse(router.query.cartData));
      } catch (error) {
        console.error("Error parsing cart data:", error);
      }
    } else if (router.query.orderData) {
      try {
        setCartData(JSON.parse(router.query.orderData));
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }
  }, [router.query.cartData, router.query.orderData]);

  if (!cartData) {
    return <div>Loading...</div>;
  }

  const isSingleProduct = !Array.isArray(cartData.products);

  const orderSummary = {
    productCount: isSingleProduct
      ? cartData.quantity
      : cartData.totalQuantity || 0,
    discount: cartData.discountAmount || 0,
    delivery: cartData.delivery || "Free",
    total: cartData.totalAmount || 0,
  };

  return (
    <div className="p-[20px] bg-white shadow rounded-lg h-auto my-4">
      <h2 className="text-[18px] font-medium mb-4">Mahsulotlar</h2>
      {isSingleProduct ? (
        <div className="space-y-4">
          <div className="flex items-start gap-8">
            <Image
              src={`https://pc.repid.uz${cartData.image}`}
              alt={cartData.name}
              width={64}
              height={64}
            />
            <div className="flex flex-col space-y-2">
              <h3 className="text-sm font-medium text-gray-800">
                {cartData.name}
              </h3>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">
                  {cartData.quantity} × {cartData.price.toLocaleString()} UZS
                </p>
                <p className="text-sm font-semibold text-red-600">
                  {(cartData.quantity * cartData.price).toLocaleString()} UZS
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {cartData.products.map((product, index) => (
            <div key={index} className="flex items-start gap-8">
              <Image
                src={`https://pc.repid.uz${product.image}`}
                alt={product.name}
                width={64}
                height={64}
              />
              <div className="flex flex-col space-y-2">
                <h3 className="text-sm font-medium text-gray-800">
                  {product.name}
                </h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    {product.quantity} × {product.price.toLocaleString()} UZS
                  </p>
                  <p className="text-sm font-semibold text-red-600">
                    {(product.quantity * product.price).toLocaleString()} UZS
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 space-y-2 border-t pt-4 text-[#5F6C72]">
        <div className="flex justify-between text-sm">
          <span>Mahsulotlar soni</span>
          <span>{orderSummary.productCount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Chegirma</span>
          <span className="text-[#191C1F]">
            {orderSummary.discount.toLocaleString()} UZS
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Yetkazib berish</span>
          <span className="text-[#191C1F]">{orderSummary.delivery}</span>
        </div>
        <div className="flex justify-between text-[#191C1F] text-[16px] font-normal pt-4">
          <span>Umumiy summa</span>
          <span className="text-[#191C1F] font-semibold">
            {orderSummary.total.toLocaleString()} UZS
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onSubmit}
        className="w-full mt-4 bg-mainColor text-white text-[16px] font-medium hover:bg-[#DD0405] transition py-[16px]"
      >
        BUYURTMA BERISH <span className="ml-1">→</span>
      </button>
    </div>
  );
}
