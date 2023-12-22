import style from "./Sales.module.css";
import { useContext } from "react";
import { ProductContext } from "../../context/products/products";
import CardProduct from "../../components/cardProduct/CardProduct";

const Sales = () => {
  const { products } = useContext(ProductContext);

  return (
    <section className={style.salesContainer}>
      <div className={style.tableContainer}>
        <ul>
          {products.map((product, index) => (
            <CardProduct product={product} key={index} />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Sales;
