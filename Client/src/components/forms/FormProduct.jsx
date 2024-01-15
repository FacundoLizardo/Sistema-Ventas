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
  console.log(dataProduct);

  const handleData = (e) => {
    const { name, value } = e.target;
    setDataProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form className={style.formContainer}>
      {/* Sección 1: Nombre y Categoría */}
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            onChange={handleData}
          />
        </div>
        <div className={style.item}>
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            name="category"
            id="category"
            autoComplete="category"
          />
        </div>
      </div>

      {/* Sección 2: Costo, Impuestos, Descuento, Precio Final */}
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="cost">Costo</label>
          <input type="number" name="cost" id="cost" autoComplete="cost" />
        </div>
        <div className={style.item}>
          <label htmlFor="taxes">Impuestos</label>
          <input type="number" name="taxes" id="taxes" autoComplete="taxes" />
        </div>
        <div className={style.item}>
          <label htmlFor="discount">Descuento</label>
          <input
            type="number"
            name="discount"
            id="discount"
            autoComplete="discount"
          />
        </div>
        <div className={style.item}>
          <p>Precio Final</p>
          <p>{dataProduct.finalPrice}</p>
        </div>
      </div>

      {/* Sección 3: Código de Barras y Disponibilidad */}
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="barcode">Código de barras</label>
          <input
            type="text"
            name="barcode"
            id="barcode"
            autoComplete="barcode"
          />
        </div>
        <div className={style.item}>
          <label htmlFor="enabled">Disponible</label>
          <select
            type="text"
            name="enabled"
            id="enabled"
            autoComplete="enabled"
          >
            <option value="true">Habilitado</option>
            <option value="false">Deshabilitado</option>
          </select>
        </div>
      </div>

      {/* Sección 4: Descripción */}
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="notesDescription">Descripción</label>
          <textarea
            type="text"
            name="notesDescription"
            id="notesDescription"
            autoComplete="notesDescription"
          />
        </div>
      </div>
    </form>
  );
};

export default FormProducts;
