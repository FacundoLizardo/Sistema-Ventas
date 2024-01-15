import style from "./Stock.module.css";
import CardProduct from "../../components/cardProduct/CardProduct";
import { useEffect, useState } from "react";
import axios from "axios";
import FormProducts from "../../components/forms/FormProduct";

const Stock = () => {
  const [filters, setFilters] = useState({
    query: "",
    category: "",
    page: 1,
  });

  const [filteredProducts, setFilteredProducts] = useState({
    products: [],
    totalCount: 0,
    currentPage: 1,
    totalPages: 0,
  });

  const { products, totalCount, currentPage, totalPages } = filteredProducts;
  const URL = import.meta.env.VITE_URL_BACKEND;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value, page: 1 }));
  };

  const previousPage = () => {
    if (currentPage > 1) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: prevFilters.page - 1,
      }));
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setFilters((prevFilters) => ({
        ...prevFilters,
        page: prevFilters.page + 1,
      }));
    }
  };

  useEffect(() => {
    const fetchFilter = async () => {
      let url = `${URL}/filter`;

      if (filters.query.trim() !== "" || filters.category !== "") {
        if (filters.query || filters.category) {
          url += `?query=${filters.query}&category=${filters.category}&page=${filters.page}`;
        }

        try {
          const { data } = await axios.get(url);
          console.log(data);

          setFilteredProducts({
            products: data.products,
            totalCount: data.totalCount,
            currentPage: filters.page,
            totalPages: Math.ceil(data.totalCount / 5),
          });
        } catch (error) {
          console.error("Error fetching data:", error.message);
        }
      } else {
        setFilteredProducts({
          products: [],
          totalCount: 0,
          currentPage: 1,
          totalPages: 0,
        });
      }
    };

    // Evita solicitudes innecesarias mientras se escribe, podemos cambiarlo a más de 300 de última, hay que probar.
    const debounce = setTimeout(() => {
      fetchFilter();
    }, 300);

    return () => clearTimeout(debounce);
  }, [filters]);

  return (
    <section className={style.stockContainer}>
      <div className={style.filtersContainer}>
        <label>
          <input
            type="text"
            name="query"
            value={filters.query}
            onInput={handleInputChange}
            placeholder="Ingresa el producto o su código de barras:"
          />
        </label>

        <label>
          <select
            name="category"
            value={filters.category}
            onChange={handleInputChange}
          >
            <option value="">Categoría</option>
            <option value="tinto">Tinto</option>
            <option value="espumante">Espumante</option>
          </select>
        </label>
      </div>
      <article className={style.tableContainer}>
        {products && products.length > 0 ? (
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                <CardProduct product={product} />
              </li>
            ))}
          </ul>
        ) : (
          "No tienes ningún producto en la lista, realiza una búsqueda."
        )}
      </article>
      <div className={style.paginationContainer}>
        <button onClick={previousPage} disabled={currentPage === 1}>
          -
        </button>
        <span>
          Página {currentPage} de {totalPages === 0 ? 1 : totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          +
        </button>
      </div>
      <div>
        <FormProducts />
      </div>
    </section>
  );
};

export default Stock;
