import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import request from "@/components/config";
import { useParams, useRouter } from "next/navigation";

const SetupCatalog = () => {
  const params = useParams();
  const [openCatalog, setOpenCatalog] = useState(true);
  const [openCatalog2, setOpenCatalog2] = useState(true);
  const [openCatalog3, setOpenCatalog3] = useState(false);
  const [openCatalog4, setOpenCatalog4] = useState(false);
  const [catalog, setCatalog] = useState([]);
  const navigate = useRouter();

  const getCategories = async () => {
    try {
      const response = await request.get("/product/category/list/");
      setCatalog(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const filteredCatalog = catalog.filter(
    (cat) => cat.name_uz == "Monitor" || cat.name_uz == "Keyslar"
  );

  const filteredAccessories = catalog.filter(
    (cat) =>
      cat.name_uz == "Aksessuarlar" || cat.name_en == "Additional devices"
  );
  return (
    <>
      <div className="min-w-[264px] lg:min-w-[200px] xl:min-w-[264px] hidden lg:sticky top-0 md:flex flex-col border-2 border-[#E4E7E9] rounded-md overflow-hidden">
        <div className="relative border-b-2 border-[#E4E7E9]">
          <button
            onClick={() => setOpenCatalog(!openCatalog)}
            className="flex items-center justify-between text-mainColor hover:bg-mainColor/5 px-4 py-2 rounded duration-150 w-full font-medium"
          >
            <span>Katalog</span>
            <IoIosArrowDown
              className={`duration-150 ${
                openCatalog ? "rotate-180" : "rotate-0"
              }`}
              size={20}
            />
          </button>
          <div
            className={` top-[43px] w-full z-20 bg-white flex-col gap-1 ${
              openCatalog ? "flex" : "hidden"
            }`}
          >
            {filteredCatalog?.map((item) => (
              <button
                key={item?.id}
                onClick={() => navigate.push(`/setup/${item.id}`)}
                className={`w-full py-2 flex px-6 items-start duration-150 ${
                  params?.id == item.id
                    ? "bg-mainColor text-white"
                    : "bg-white hover:bg-mainColor/10"
                }`}
              >
                {item?.name_uz}
              </button>
            ))}
          </div>
        </div>
        <div>
          <div className="relative">
            <button
              onClick={() => setOpenCatalog2(!openCatalog2)}
              className="flex items-center justify-between text-mainColor hover:bg-mainColor/5 px-4 py-2 rounded duration-150 w-full font-medium"
            >
              <span>Aksessuarlar</span>
              <IoIosArrowDown
                className={`duration-150 ${
                  openCatalog2 ? "rotate-180" : "rotate-0"
                }`}
                size={20}
              />
            </button>
            <div
              className={`w-full z-20 bg-white flex-col gap-1 ${
                openCatalog2 ? "flex" : "hidden"
              }`}
            >
              {filteredAccessories?.map((item) => (
                <button
                  onClick={() => navigate.push(`/setup/${item.id}`)}
                  key={item?.id}
                  className={`w-full py-2 flex px-6 items-start duration-150 ${
                    params?.id == item.id
                      ? "bg-mainColor text-white"
                      : "bg-white hover:bg-mainColor/10"
                  }`}
                >
                  {item?.name_uz}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="md:hidden flex justify-between w-full gap-4">
        <div className="w-full relative">
          <button
            onClick={() => setOpenCatalog3(!openCatalog3)}
            className="flex items-center border justify-between text-mainColor hover:bg-mainColor/5 px-4 py-2 rounded-md duration-150 w-full font-medium"
          >
            <span>Katalog</span>
            <IoIosArrowDown
              className={`duration-150 ${
                openCatalog3 ? "rotate-180" : "rotate-0"
              }`}
              size={20}
            />
          </button>
          <div
            className={`absolute top-[43px] w-full z-20 bg-white flex-col gap-1 shadow-md rounded-md overflow-hidden ${
              openCatalog3 ? "flex" : "hidden"
            }`}
          >
            {filteredCatalog?.map((item) => (
              <button
                key={item?.id}
                onClick={() => {
                  navigate.push(`/setup/${item.id}`);
                  setOpenCatalog3(false);
                }}
                className={`w-full py-2 flex px-6 items-start duration-150 ${
                  params?.id == item.id
                    ? "bg-mainColor text-white"
                    : "bg-white hover:bg-mainColor/10"
                }`}
              >
                {item?.name_uz}
              </button>
            ))}
          </div>
        </div>
        <div className="relative w-full">
          <button
            onClick={() => setOpenCatalog4(!openCatalog4)}
            className="flex items-center border justify-between text-mainColor hover:bg-mainColor/5 px-4 py-2 rounded-md duration-150 w-full font-medium"
          >
            <span>Aksessuarlar</span>
            <IoIosArrowDown
              className={`duration-150 ${
                openCatalog4 ? "rotate-180" : "rotate-0"
              }`}
              size={20}
            />
          </button>
          <div
            className={`absolute top-[43px] w-full z-20 bg-white flex-col gap-1 shadow-md rounded-md overflow-hidden ${
              openCatalog4 ? "flex" : "hidden"
            }`}
          >
            {filteredAccessories?.map((item) => (
              <button
                onClick={() => {
                  navigate.push(`/setup/${item.id}`);
                  setOpenCatalog4(false);
                }}
                key={item?.id}
                className={`w-full py-2 flex px-6 items-start duration-150 ${
                  params?.id == item.id
                    ? "bg-mainColor text-white"
                    : "bg-white hover:bg-mainColor/10"
                }`}
              >
                {item?.name_uz}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SetupCatalog;
