import Container from "@/components/Container";
import React, { useEffect, useState } from "react";
import request from "@/components/config";
import WishlistCard from "@/components/ProductCard";
import { useRouter } from "next/router";

const getComparisonProducts = () => {
  const stored = localStorage.getItem("compare");
  return stored ? JSON.parse(stored) : [];
};

const Comparison = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchComparisonProducts = async () => {
    const productIds = getComparisonProducts();

    if (productIds.length === 0) {
      setProducts([]);
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await request.post("/product/compare/", {
        product_ids: productIds,
      });

      setProducts(data);
      if (data.length > 0) {
        setSelectedCategory({
          category_id: data[0].category_id,
          category_name: data[0].category_name,
        });
      }
    } catch (error) {
      console.error(
        "Failed to fetch comparison products:",
        error.response?.data || error.message
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchComparisonProducts();
  }, []);

  const navigateToCategory = () => {
    if (!selectedCategory) return;

    router.push({
      pathname: `/categories/${selectedCategory.category_name
        .replace(/\s+/g, "-")
        .toLowerCase()}`,
      query: { query: selectedCategory.category_id },
    });
  };

  const removeCategory = (categoryId) => {
    const updatedProducts = products.filter(
      (product) => product.category_id !== categoryId
    );
    const updatedCompare = getComparisonProducts().filter((productId) =>
      updatedProducts.some((product) => product.id === productId)
    );
    localStorage.setItem("compare", JSON.stringify(updatedCompare));
    setProducts(updatedProducts);
    if (selectedCategory?.category_id === categoryId) {
      setSelectedCategory(
        updatedProducts.length > 0
          ? {
              category_id: updatedProducts[0].category_id,
              category_name: updatedProducts[0].category_name,
            }
          : null
      );
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter(
        (product) => product.category_id === selectedCategory.category_id
      )
    : products;

  return (
    <div className="">
      <Container>
        <h1 className="text-[24px] font-medium mb-6 my-[40px]">
          Mahsulotlarni taqqoslash
        </h1>

        {isLoading ? (
          <p>Loading products...</p>
        ) : products.length > 0 ? (
          <>
            <div className="mb-6 flex flex-wrap items-center gap-3">
              {[
                ...new Map(
                  products.map((product) => [
                    product.category_id,
                    product.category_name,
                  ])
                ).entries(),
              ].map(([categoryId, categoryName]) => (
                <div
                  key={categoryId}
                  className={`bg-gray-200 px-4 py-2 rounded-lg text-sm font-medium flex items-center ${
                    selectedCategory?.category_id === categoryId
                      ? "bg-blue-200"
                      : "cursor-pointer"
                  }`}
                  onClick={() =>
                    setSelectedCategory({
                      category_id: categoryId,
                      category_name: categoryName,
                    })
                  }
                >
                  {categoryName}
                  <span
                    className="ml-2 text-gray-500 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeCategory(categoryId);
                    }}
                  >
                    ×
                  </span>
                </div>
              ))}
            </div>

            <div className="mb-6 flex justify-end">
              <button
                onClick={navigateToCategory}
                className={`px-6 py-2 rounded-lg text-white font-medium ${
                  selectedCategory
                    ? "bg-blue-500 hover:bg-blue-600"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
                disabled={!selectedCategory}
              >
                Add to {selectedCategory?.category_name}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
              {filteredProducts.map((product) => (
                <div key={product.id}>
                  <WishlistCard data={product} />
                  <div className="bg-white p-4">
                    <div className="space-y-2">
                      {product.tec_info.map((tec) => (
                        <div
                          key={tec.tec_info_id}
                          className="flex flex-col border-b py-2"
                        >
                          <span className="text-gray-600">{tec.tec_info}</span>
                          <span className="font-medium">
                            {tec.tec_info_name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p>No products available for comparison.</p>
        )}
      </Container>
    </div>
  );
};

export default Comparison;
