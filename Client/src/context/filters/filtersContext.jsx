import { createContext, useContext, useState } from "react";

const FilterContext = createContext();

export const useFilterContext = () => {
  return useContext(FilterContext);
};

export const FilterProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    page: 1,
  });
  
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <FilterContext.Provider value={{ filters, updateFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
