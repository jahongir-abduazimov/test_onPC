import React, { useState } from "react";
import { GoChevronRight } from "react-icons/go";
import OrderForm from "./OrderForm";
import Container from "@/components/Container";
import OrderDetails from "./OrderDetails";
import Link from "next/link";

function NewOrder() {
  const [formData, setFormData] = useState({});
  const [cartData, setCartData] = useState(null);
  const [delivery, setDelivery] = useState("Yetkazib berish");

  const sendToTelegram = async () => {
    const botToken = "7112244807:AAE11a1i7xWTpmfdx_wkYFONDCo19JtgxfI";
    const chatId = 1308171294;
    const message = `
    📝 **Yangi Buyurtma**\n
    🧑 Ism: ${formData.firstName || "N/A"}\n
    🧑 Familiya: ${formData.lastName || "N/A"}\n
    📍 Viloyat: ${formData.region || "N/A"}\n
    🏢 Manzil: ${formData.address || "N/A"}\n
    📞 Telefon: ${formData.phone || "N/A"}\n
    📍 Do'kon Manzili: ${formData.location || "N/A"}\n
    Izoh:${formData.comment || "N/A"}\n
    🛒 Mahsulotlar soni: ${cartData?.totalQuantity || "N/A"}\n
    💰 Umumiy summa: ${cartData?.totalAmount || "N/A"} UZS\n\n
    🛍️ **Mahsulotlar:**\n
    ${cartData?.products
        ?.map(
          (product, index) =>
            `${index + 1}. ${product.name || "N/A"}\n   🖼️ Rasm: ${`https://pc.repid.uz${product.image}` || "N/A"
            }`
        )
        .join("\n")}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: "Markdown",
          }),
        }
      );

      if (response.ok) {
        alert("Buyurtma muvaffaqiyatli yuborildi!");
      } else {
        alert("Xatolik yuz berdi!");
      }
    } catch (error) {
      console.error("Telegram bot xatosi:", error);
    }
  };

  return (
    <>
      <Container>
        <div className="flex items-center gap-1 md:gap-2 my-6 md:mb-10">
          <Link href={"/"} className="text-sm md:text-lg text-[#717171]">
            Bosh sahifa
          </Link>
          <GoChevronRight size={18} color="#717171" />
          <span className="text-mainColor text-sm md:text-lg border-b border-b-mainColor">
            Bururtmalar
          </span>
        </div>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="md:max-w-[60%] max-w-full">
            <OrderForm
              delivery={delivery}
              setDelivery={setDelivery}
              setFormData={setFormData}
            />
          </div>
          <div className="md:max-w-[40%] max-w-full">
            <OrderDetails
              setCartData={setCartData}
              cartData={cartData}
              onSubmit={sendToTelegram}
            />
          </div>
        </div>
      </Container>
    </>
  );
}

export default NewOrder;
