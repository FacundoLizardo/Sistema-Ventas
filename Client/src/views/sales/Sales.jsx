import style from "./Sales.module.css";
import { useContext } from "react";
import { ProductContext } from "../../context/products/products";
import CardProduct from "../../components/cardProduct/CardProduct";
import FormAfip from "../../components/buttons/formAfip/FormAfip";

const Sales = () => {
  const { products, currentPage, setCurrentPage, totalPages } =
    useContext(ProductContext);

  const previousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section className={style.salesContainer}>
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
          <div>No hay productos</div>
        )}
      </article>
      <div>
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
