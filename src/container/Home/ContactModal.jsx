import React from "react";
import { PiCheckCircleLight } from "react-icons/pi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { IoMdClose } from "react-icons/io";

const ContactModal = ({ isOpen, close, isErrorOpen }) => {
  if (!isOpen && !isErrorOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={close}
    >
      <div
        className="relative bg-[#EAECF0] w-full max-w-lg rounded-2xl mx-[20px] shadow-lg overflow-hidden py-6 px-10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col items-center">
          <button
            className="absolute top-4 right-4 text-gray-500"
            onClick={close}
          >
            <IoMdClose size={24} />
          </button>
          {isOpen ? (
            <PiCheckCircleLight className="text-green-600 text-[60px] md:text-[80px]" />
          ) : (
            <IoIosCloseCircleOutline className="text-red-600 text-[60px] md:text-[80px]" />
          )}
          <p className="text-lg md:text-xl font-medium text-center mt-3 md:mt-6">
            {isOpen
              ? "Ma'lumotlaringiz qabul qilindi! Tez orada siz bilan bog'lanamiz"
              : "Yuborishda xatolik yuz berdi. Iltimos, qayta urinib ko‘ring."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
