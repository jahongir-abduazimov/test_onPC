import React from "react";
import NotFoundImage from "../public/images/404-image.avif";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const navigate = useRouter();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center pb-10 md:gap-10">
      <Image src={NotFoundImage} alt="404 image" />
      <div className="flex flex-col gap-4 items-center">
        <p className="text-[24px] md:text-[36px] font-bold">Sahifa topilmadi</p>
        <button
          onClick={() => navigate.push("/")}
          className="bg-mainColor text-white font-semibold px-5 py-2 rounded-full md:text-lg"
        >
          Bosh sahifaga
        </button>
      </div>
    </div>
  );
};

export default NotFound;
