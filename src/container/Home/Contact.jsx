import React, { useState } from "react";
import Container from "@/components/Container";
import { GoArrowRight } from "react-icons/go";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import request from "@/components/config";
import ContactModal from "./ContactModal";

const Contact = () => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorOpen, setIsErrorOpen] = useState(false);
  const sendData = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const newData = {
      name: name,
      phone_number: phoneNumber,
    };
    try {
      await request.post("/common/contact-us/", newData, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
      setName("");
      setPhoneNumber("");
      setIsOpen(true);
    } catch (err) {
      setIsErrorOpen(true);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <ContactModal
        isOpen={isOpen}
        close={() => {
          setIsOpen(false), setIsErrorOpen(false);
        }}
        isErrorOpen={isErrorOpen}
      />
      <section id="contact-section" className="bg-[#191C1F] py-[60px]">
        <Container>
          <h1 className="text-[22px] md:text-[32px] text-white font-semibold text-center mb-[12px]">
            Biz bilan bog’lanish
          </h1>
          <p className="max-w-[536px] text-white/70 text-sm md:text-base text-center mx-auto mb-10">
            Sizni qiziqtirgan savollaringizga javob olish uchun quyidagi shaklni
            to’ldiring operatorlarimiz siz bilan bog’lanishadi
          </p>
          <form onSubmit={sendData}>
            <div className="flex items-center flex-col md:flex-row gap-2 md:gap-3 justify-center">
              <input
                type="text"
                placeholder="Ismingizni kiriting"
                className="w-full md:w-[280px] h-10 md:h-12 bg-white outline-none px-4 rounded-[2px]"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                placeholder="+998 99 555 25 25"
                className="w-full md:w-[280px] h-10 md:h-12 bg-white outline-none px-4 rounded-[2px]"
                inputMode="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="flex justify-center mt-3">
              <button
                disabled={!name || !phoneNumber || isLoading}
                className={`text-[#fff] text-sm font-bold w-full md:w-[572px] rounded-[2px] bg-mainColor duration-200 flex items-center h-10 md:h-12 justify-center gap-2 ${
                  !name || !phoneNumber
                    ? "hover:bg-mainColor cursor-not-allowed"
                    : "hover:bg-mainColor/85"
                } ${
                  isLoading &&
                  "hover:bg-mainColor/70 bg-mainColor/70 cursor-not-allowed"
                }`}
              >
                <span>YUBORUSH</span>
                {isLoading ? (
                  <AiOutlineLoading3Quarters
                    className="animate-spin"
                    size={20}
                  />
                ) : (
                  <GoArrowRight size={20} />
                )}
              </button>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export default Contact;
