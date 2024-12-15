import request from "@/components/config";
import Container from "@/components/Container";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

function Characteristics({ id }) {
  const [product, setProduct] = useState(null);

  useEffect(() => {
    if (id) {
      request
        .get(`/product/product/${id}/`)
        .then((response) => {
          const data = response.data;
          setProduct(data);
        })
        .catch((error) => {
          console.error("Failed to fetch product:", error);
        });
    }
  }, [id]);

  if (!product) {
    return (
      <Container>
        <div className="p-6 bg-white">
          <h2 className="text-[24px] font-medium mb-4">Loading...</h2>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="p-6 bg-white">
        <h2 className="text-[24px] font-medium mb-4">Texnik ma’lumotlar</h2>
        <div className="">
          {product.infos && product.infos.length > 0 ? (
            product.infos.map((spec, index) => (
              <div
                key={spec.tec_info_id + "-" + spec.tec_info_name_id}
                className={`flex flex-col gap-2 md:flex-row justify-between items-start w-[100%] md:w-[80%] ${
                  index % 2 === 0 ? "bg-[#F9F9F9]" : "bg-white"
                } p-4 rounded-md`}
              >
                <span className="font-medium text-[#717171] text-[16px]">
                  {spec.tec_info}
                </span>
                <span className="text-[#717171] text-[16px]">
                  {spec.tec_info_name}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No technical details available.</p>
          )}
        </div>
      </div>
    </Container>
  );
}

export default Characteristics;
