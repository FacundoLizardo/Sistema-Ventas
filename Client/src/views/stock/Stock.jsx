import { useContext } from "react";
import Filters from "../../components/filters/Filters";
import style from "./Stock.module.css";
import CardProduct from "../../components/cardProduct/CardProduct";
import { ProductContext } from "../../context/products/productsContext";

const Stock = () => {
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
    <section className={style.stockContainer}>
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
    </section>
  );
};

export default Stock;
