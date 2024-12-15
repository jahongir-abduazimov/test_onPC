import { create } from "zustand";
import request from "@/components/config";

const useCategoryStore = create((set) => ({
  isDiscount: false,
  priceRange: { min: 0, max: 10000000 },
  selectedValues: [],
  products: [],
  filterData: [],
  categories: [],
  loading: false,
  query: null,

  // Setters
  setQuery: (query) => set({ query }),
  setIsDiscount: (isDiscount) => set({ isDiscount }),
  setPriceRange: (priceRange) => set({ priceRange }),
  setSelectedValues: (selectedValues) => set({ selectedValues }),
  setCategories: (categories) => set({ categories }),

  // Fetch products based on filters
  fetchProducts: async () => {
    set({ loading: true });
    try {
      const state = useCategoryStore.getState();
      const queryParams = new URLSearchParams({
        is_discount: state.isDiscount,
        min_price: state.priceRange.min,
        max_price: state.priceRange.max,
        brand: state.selectedValues.join(","),
        page: 1,
        page_size: 10,
      });

      const res = await request.get(
        `/product/category/${state.query}/?${queryParams}`
      );
      set({ products: res.data.results });
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch filter data
  fetchFilters: async (id) => {
    set({ loading: true });
    try {
      const res = await request.get(`/product/category/info/$${state.query}`);
      set({ filterData: res.data });
    } catch (error) {
      console.error("Error fetching filter data:", error);
    } finally {
      set({ loading: false });
    }
  },

  // Fetch category list
  fetchCategories: async () => {
    try {
      const res = await request.get("/product/category/list/");
      set({ categories: res.data });
    } catch (err) {
      console.error(err);
    }
  },
}));

export default useCategoryStore;
