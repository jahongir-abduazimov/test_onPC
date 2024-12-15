import React, { useState } from "react";
import YandexMap from "../Map/YandexMap";
import ModalLocations from "./ModalLocations";
import ModalYandex from "./ModalYandex";

const OrderForm = ({ setFormData }) => {
  const [delivery, setDelivery] = useState("Yetkazib berish");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const locations = [
    { name: "ONEPC Yunusobod", coordinates: [41.2995, 69.2401] },
    { name: "ONEPC Chilonzor", coordinates: [41.2875, 69.2156] },
    { name: "ONEPC Mirzo-Ulugbek", coordinates: [41.3389, 69.3341] },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeliveryChange = (e) => {
    const value = e.target.value;
    setDelivery(value);
    setFormData((prev) => ({ ...prev, delivery: value }));
    if (value === "Olib ketish") {
      setIsModalOpen(true);
    }
  };

  const handleLocationSelect = (location) => {
    setSelectedLocation(location.name);
    setFormData((prev) => ({ ...prev, location: location.name }));
    setIsModalOpen(false);
  };

  console.log(delivery);
  return (
    <div className="mx-auto p-6 bg-white">
      <h1 className="text-[24px] font-medium mb-6">Buyurtma berish</h1>
      <form className="grid grid-cols-2 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Ism</label>
          <input
            name="firstName"
            type="text"
            placeholder="Ism"
            onChange={handleInputChange}
            className="mt-1 text-[#77878F] block w-full px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-[#F7F7F7]"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Familiya
          </label>
          <input
            name="lastName"
            type="text"
            placeholder="Familiya"
            onChange={handleInputChange}
            className="mt-1 block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div className="">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Qabul qilish usuli
          </label>
          <select
            name="delivery"
            value={delivery}
            onChange={handleDeliveryChange}
            className="mt-1 block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="Yetkazib berish">Yetkazib berish</option>
            <option value="Olib ketish">Olib ketish</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Telefon raqam
          </label>
          <input
            name="phone"
            type="text"
            placeholder="+998 99 555 55 55"
            onChange={handleInputChange}
            className="mt-1 block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {delivery === "Yetkazib berish" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Viloyat
            </label>
            <input
              name="region"
              type="text"
              placeholder="Viloyat"
              onChange={handleInputChange}
              className="mt-1 block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {delivery === "Yetkazib berish" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Shahar
            </label>
            <input
              name="city"
              type="text"
              placeholder="Shahar"
              onChange={handleInputChange}
              className="mt-1 block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
        {delivery === "Yetkazib berish" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Manzil
            </label>
            <input
              name="address"
              type="text"
              placeholder="Manzil"
              onChange={handleInputChange}
              className="mt-1 block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}
        {delivery === "Yetkazib berish" && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Qavat
            </label>
            <input
              name="floor"
              type="text"
              placeholder="Qavat"
              onChange={handleInputChange}
              className="mt-1 block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        {delivery === "Olib ketish" && (
          <div className="md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Do'kon Manzili
            </label>
            <input
              name="location"
              type="text"
              placeholder="Do'kon Manzili"
              value={selectedLocation}
              onChange={handleInputChange}
              className="mt-1 block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        )}

        <div className="md:col-span-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Kuryer uchun izoh
          </label>
          <textarea
            name="comment"
            placeholder="Izoh qoldirish..."
            onChange={handleInputChange}
            rows="3"
            className="mt-1 h-[120px] block w-full text-[#77878F] bg-[#F7F7F7] px-3 py-2 border rounded-[2px] shadow-sm focus:ring-blue-500 focus:border-blue-500"
          ></textarea>
        </div>
      </form>
      <ModalLocations
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-1/3 ">
            {locations.map((location, index) => (
              <div
                key={index}
                onClick={() => handleLocationSelect(location)}
                className="cursor-pointer p-[24px] shadow-md rounded-md mb-4 bg-[#F7F7F7] border-[#DFDEE2] border-2 flex flex-row items-start gap-4"
              >
                <h2 className="text-[18px] font-semibold mb-[8px]">
                  {location.name}
                </h2>
                <p className="text-[#ADB7BC] text-[14px] font-normal mb-[15px]">
                  {location.coordinates.join(", ")}
                </p>
              </div>
            ))}
          </div>
          <div className="md:w-2/3">
            <ModalYandex locations={locations} zoom={11} />
          </div>
        </div>
      </ModalLocations>
    </div>
  );
};

export default OrderForm;
