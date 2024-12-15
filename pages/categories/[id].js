import Container from "@/components/Container";
import AllFilters from "@/container/Category/AllFilters";
import AllFiltersMobile from "@/container/Category/AllFiltersMobile";
import { useMediaQuery } from "react-responsive";
import ProductList from "@/container/Category/ProductList";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { GoChevronRight } from "react-icons/go";
import { useRouter } from "next/router";
import request from "@/components/config";

function Categories() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [filters, setFilters] = useState({
    is_discount: false,
    min_price: 0,
    max_price: 10000000,
    info: [],
  });
  const [products, setProducts] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { query } = router.query;
  console.log(query);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!query) return;
      setLoading(true);
      try {
        const queryParams = new URLSearchParams(filters).toString();
        const res = await request.get(
          `/product/category/${query}/?${queryParams}`
        );
        setProducts(res.data.results || []);
        console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [query, filters]);

  // Fetch category name for breadcrumbs
  const getCategories = async () => {
    try {
      const response = await request.get("/product/category/list/");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const categoryName = categories.find((item) => item.id == query);

  return (
    <section className="pt-4 md:pt-10 pb-[50px] md:pb-[100px]">
      <Container>
        {/* Breadcrumbs */}
        <div className="flex items-center gap-1 md:gap-2 mb-6 md:mb-10">
          <Link href="/" className="text-sm md:text-lg text-[#717171]">
            Bosh sahifa
          </Link>
          <GoChevronRight size={18} color="#717171" />
          <span className="text-mainColor text-sm md:text-lg border-b border-b-mainColor">
            {categoryName && categoryName.name_uz}
          </span>
        </div>

        {/* Filters and Product List */}
        <div className="flex flex-col items-start md:flex-row gap-5">
          <div className="max-md:w-full">
            {isMobile ? (
              <AllFiltersMobile
                filters={filters}
                setFilters={setFilters}
                filterData={filterData}
                isLoading={loading}
                id={query}
              />
            ) : (
              <AllFilters
                filters={filters}
                setFilters={setFilters}
                isLoading={loading}
                id={query}
              />
            )}
          </div>
          <ProductList data={products} loading={loading} />
        </div>
      </Container>
    </section>
  );
}

export default Categories;
