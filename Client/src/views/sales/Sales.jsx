// Sales.jsx
import style from "./Sales.module.css";
import { useContext } from "react";
import { ProductContext } from "../../context/products/productsContext";
import CardProduct from "../../components/cardProduct/CardProduct";
import FormAfip from "../../components/formAfip/FormAfip";
import Filters from "../../components/filters/Filters";

const Sales = () => {
  const { products, currentPage, setCurrentPage, totalPages } =
    useContext(ProductContext);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <section className={style.salesContainer}>
      <div>
        <Filters />
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
          <div className={style.null}>No hay productos disponibles</div>
        )}
      </article>
      <div className={style.paginationContainer}>
        <button onClick={previousPage} disabled={currentPage === 1}>
          -
        </button>
        <span>
          Página {currentPage} de {totalPages}
        </span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          +
        </button>
      </div>
      <div className={style.formContainer}>
        <FormAfip />
      </div>
    </section>
  );
};

export default Sales;
