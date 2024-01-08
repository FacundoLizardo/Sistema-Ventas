import { createContext, useEffect, useState } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const URL = import.meta.env.VITE_URL_BACKEND;

  useEffect(() => {
    fetch(`${URL}/products?page=${currentPage}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
        setTotalPages(data.totalPages);
      })
      .catch((error) => console.error(error));
  }, [currentPage]);


  return (
    <ProductContext.Provider
      value={{ products, currentPage, setCurrentPage, totalPages }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export { ProductContext, ProductProvider };
