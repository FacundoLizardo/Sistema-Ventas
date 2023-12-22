import style from "./Sales.module.css";
import { useContext } from "react";
import { ProductContext } from "../../context/products/products";

const Sales = () => {
  const { products } = useContext(ProductContext);
  console.log(products);

  return (
    <section className={style.salesContainer}>
      <div className={style.tableContainer}>
        <table className={style.productTable}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.product_id}>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Sales;
