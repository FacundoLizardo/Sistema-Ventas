import style from "./Sales.module.css";
import { useContext } from "react";
import { ProductContext } from "../../context/products/products";

const Sales = () => {
  const { products } = useContext(ProductContext);
  console.log(products);
  const productsData = products;
  return (
    <div className={style.salesContainer}>
      {productsData.map((product) => (
        <div key={product.product_id
        }>{product.name}</div>
      ))}
    </div>
  );
};

export default Sales;
