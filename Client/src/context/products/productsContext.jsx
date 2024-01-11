import axios from "axios";
import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

const fetchData = async (URL, currentPage, setProducts, setTotalPages) => {
  try {
    const { data } = await axios.get(`${URL}/products?page=${currentPage}`);
    setProducts(data.products);
    setTotalPages(data.totalPages);
  } catch (error) {
    console.error("Error fetching data:", error.message);
  }
};

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  console.log(products);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const URL = import.meta.env.VITE_URL_BACKEND;

  useEffect(() => {
    fetchData(URL, currentPage, setProducts, setTotalPages);
  }, [currentPage, URL]);

  return (
    <ProductContext.Provider
      value={{
        products,
        currentPage,
        setCurrentPage,
        totalPages,
        setProducts,
        setTotalPages,
        fetchData: () =>
          fetchData(URL, currentPage, setProducts, setTotalPages),
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
