/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import style from "./Forms.module.css";

const FormProducts = () => {
  const [dataProduct, setDataProduct] = useState({
    name: "",
    category: "",
    cost: 0,
    finalPrice: 0,
    discount: 0,
    profitPercentage: 30,
    stock: 70,
    enabled: true,
    notesDescription: "",
    taxes: 0,
    barcode: "",
  });

  return (
    <form className={style.formContainer}>
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label for="name">Nombre</label>
          <input type="text" name="name" id="name" />
        </div>
        <div className={style.item}>
          <label for="category">Categoría</label>
          <input type="text" name="category" id="category" />
        </div>
      </div>

      <div className={style.itemContainer}>
      <div className={style.item}>
          <label for="category">Costo</label>
          <input type="text" name="category" id="category" />
        </div>
        <div className={style.item}>
          <label for="category">Descuento</label>
          <input type="text" name="category" id="category" />
        </div>
        <div className={style.item}>
          <label for="category">Precio final</label>
          <input type="text" name="category" id="category" />
        </div>
      </div>

      <div className={style.itemContainer}>
      
        <div className={style.item}>
          <label for="category">Categoría</label>
          <input type="text" name="category" id="category" />
        </div>
      </div>

      <div className={style.itemContainer}>
        <div className={style.item}>
          <label for="name">Disponible</label>
          <input type="checkbox" name="enabled" id="enabled" />
        </div>
        <div className={style.item}>
          <label for="category">Categoría</label>
          <input type="text" name="category" id="category" />
        </div>
      </div>
    </form>
  );
};

export default FormProducts;
