import style from "./Sales.module.css";
import { useContext } from "react";
import { ProductContext } from "../../context/products/products";
import CardProduct from "../../components/cardProduct/CardProduct";
import FormAfip from "../../components/buttons/formAfip/FormAfip";

const Sales = () => {
  const { products } = useContext(ProductContext);

  return (
    <section className={style.salesContainer}>
      <div className={style.tableContainer}>
        <ul>
          {products ? (
            products.map((product, index) => (
              <CardProduct product={product} key={index} />
            ))
          ) : (
            <div>No hay productos</div>
          )}
        </ul>
      </div>
      <div className={style.formContainer}>
        <FormAfip />
      </div>
    </section>
  );
};

export default Sales;
