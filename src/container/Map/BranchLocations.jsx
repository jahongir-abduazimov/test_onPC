// pages/index.js
import ModalYandex from "../Orders/ModalYandex";
import YandexMap from "./YandexMap";
import { HiOutlineLocationMarker } from "react-icons/hi";

export default function BranchLocations() {
  const locations = [
    { name: "ONEPC Yunusobod", coordinates: [41.2995, 69.2401] },
    { name: "ONEPC Chilonzor", coordinates: [41.2875, 69.2156] },
    { name: "ONEPC Mirzo-Ulugbek", coordinates: [41.3389, 69.3341] },
  ];
  return (
    <div className="container mx-auto p-4 md:my-[60px] my-[20px]">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="md:w-1/3 ">
          {locations.map((location, index) => (
            <div
              key={index}
              className=" p-[24px] shadow-md rounded-md mb-4 bg-[#F7F7F7] border-[#DFDEE2] border-2 flex flex-row items-start gap-4"
            >
              <HiOutlineLocationMarker size={30} className="mt-1" />
              <div>
                <h2 className="text-[18px] font-semibold mb-[8px]">
                  {location.name}
                </h2>
                <p className="text-[#ADB7BC] text-[14px] font-normal mb-[15px]">
                  {location.coordinates.join(", ")}
                </p>
                <div className="flex md:flex-row flex-col gap-[25px]">
                  <p>🕒 09:00 - 21:00</p>
                  <p>📞 +998 99 550 15 55</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="md:w-2/3 ">
          <YandexMap locations={locations} zoom={12} />
        </div>
      </div>
    </div>
  );
}
