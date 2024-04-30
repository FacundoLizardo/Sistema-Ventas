/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import style from "./Forms.module.css";
import styles from "../modal/modal.module.css";
import axios from "axios";
import CheckboxInput from "../inputs/checkboxInput/checkboxInput.jsx";
import ButtonTwo from "../buttons/ButtonTwo/ButtonTwo.jsx";

const URL = import.meta.env.VITE_URL_BACKEND;

//TODO refactorizar a menos de 300 lineas
const FormProducts = ({ productToEdit = {}, setProductToEdit = () => {} }) => {
  // name, category, stock, allowNegativeStock, trackStock, enabled, barcode are required
  const defaultFormValues = {
    name: undefined,
    category: undefined,
    cost: undefined,
    finalPrice: undefined,
    discount: undefined,
    profitPercentage: undefined,
    stock: undefined,
    allowNegativeStock: undefined,
    trackStock: undefined,
    minimumStock: undefined,
    enabled: undefined,
    notesDescription: undefined,
    taxes: undefined,
    barcode: undefined,
  };

  const [dataProduct, setDataProduct] = useState(defaultFormValues);

  useEffect(() => {
    //if in the stock view is a product selected
    if (Object.keys(productToEdit).length >= 1) {
      setDataProduct((prevState) => ({
        ...prevState,
        name: productToEdit.name,
        category: productToEdit.category,
        cost: productToEdit.cost,
        finalPrice: productToEdit.finalPrice,
        discount: productToEdit.discount,
        profitPercentage: productToEdit.profitPercentage,
        stock: productToEdit.stock,
        allowNegativeStock: productToEdit.allowNegativeStock || undefined,
        trackStock: productToEdit.trackStock || undefined,
        minimumStock: productToEdit.minimumStock || undefined,
        enabled: productToEdit.enabled || undefined,
        notesDescription: productToEdit.notesDescription,
        taxes: productToEdit.taxes,
        barcode: productToEdit.barcode,
      }));
    }
  }, [productToEdit]);

  const handleChangeDataForm = (e) => {
    const { name, value, type, checked } = e.target;
    setDataProduct((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : type === "number" ? value : value,
    }));
  };

  function resetDataForm() {
    document.getElementById("productForm").reset();
    setProductToEdit({});
    setDataProduct(defaultFormValues);
  }

  const handleSubmit = async () => {
    event.preventDefault();
    const response = await axios.put(
      `${URL}/products/${productToEdit.productId}`,
      dataProduct
    );
    if (response.status === 200) {
      setProductToEdit({});
      setDataProduct(defaultFormValues);
      resetDataForm();
      window.alert(`Se modifico el producto ${dataProduct.name} con exito.`);
      //TODO hacer la busqueda de nuevo para que se actualize el producto modificado
      //TODO agregar boton de buscar/usar el enter?
    }
  };

  async function createProduct() {
    event.preventDefault();
    const response = await axios.post(`${URL}/products`, dataProduct);
    if (response.status === 200) {
      window.alert(`Se creo el producto ${dataProduct.name} con exito.`);
      setProductToEdit({});
      setDataProduct(defaultFormValues);
      resetDataForm();
    } else {
      window.alert(`Se produjo un error,.`);
    }
  }

  return (
    <form
      className={style.formContainer}
      onSubmit={handleSubmit}
      id="productForm"
    >
      {Object.keys(productToEdit).length > 1 ? (
        <p>Modificar producto</p>
      ) : (
        <p>Crear producto</p>
      )}

      {/* Sección 1: Nombre y Categoría */}
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="name">* Nombre</label>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="name"
            onChange={handleChangeDataForm}
            value={dataProduct.name}
          />
        </div>

        {/*TODO renderizar un select y un input en caso de querer crear una categoria nueva*/}
        <div className={style.item}>
          <label htmlFor="category">* Categoría</label>
          <input
            type="text"
            name="category"
            id="category"
            autoComplete="category"
            onChange={handleChangeDataForm}
            value={dataProduct.category}
          />
        </div>
      </div>

      {/* Sección 2: Costo, Impuestos, Descuento, Precio Final */}
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="cost">Costo</label>
          <input
            type="number"
            name="cost"
            id="cost"
            autoComplete="cost"
            onChange={handleChangeDataForm}
            value={dataProduct.cost}
          />
        </div>
        <div className={style.item}>
          <label htmlFor="taxes">Impuestos</label>
          <input
            type="number"
            name="taxes"
            id="taxes"
            autoComplete="taxes"
            onChange={handleChangeDataForm}
            value={dataProduct.taxes}
          />
        </div>
        <div className={style.item}>
          <label htmlFor="discount">Descuento</label>
          <input
            type="number"
            name="discount"
            id="discount"
            autoComplete="discount"
            onChange={handleChangeDataForm}
            value={dataProduct.discount}
          />
        </div>
        <div className={style.item}>
          <label htmlFor="discount">Precio final</label>
          <input
            type="number"
            name="finalPrice"
            id="finalPrice"
            onChange={handleChangeDataForm}
            autoComplete="finalPrice"
            value={dataProduct.finalPrice}
          />
        </div>
      </div>

      {/* Sección 3: Código de Barras y Disponibilidad */}
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="barcode">* Código de barras</label>
          <input
            type="text"
            name="barcode"
            id="barcode"
            autoComplete="barcode"
            onChange={handleChangeDataForm}
            value={dataProduct.barcode}
          />
        </div>
      </div>

      {/* Sección 4: Descripción */}
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="notesDescription">Descripción</label>
          <input
            type="text"
            name="notesDescription"
            id="notesDescription"
            autoComplete="notesDescription"
            onChange={handleChangeDataForm}
            value={dataProduct.notesDescription}
          />
        </div>
      </div>
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label htmlFor="cost">Stock minimo</label>
          <input
            type="number"
            name="minimumStock"
            id="minimumStock"
            autoComplete="minimumStock"
            onChange={handleChangeDataForm}
            value={dataProduct.minimumStock}
          />
        </div>
        <div className={style.item}>
          <label htmlFor="taxes">Ganancia % / Costo</label>
          <input
            type="number"
            name="profitPercentage"
            id="profitPercentage"
            autoComplete="profitPercentage"
            onChange={handleChangeDataForm}
            value={dataProduct.taxes}
          />
        </div>
        <div className={style.item}>
          <label htmlFor="discount">Stock</label>
          <input
            type="number"
            name="stock"
            id="stock"
            autoComplete="stock"
            onChange={handleChangeDataForm}
            value={dataProduct.discount}
          />
        </div>
      </div>
      {/* Sección 4: checkInputs */}
      {/*TODO mejorar responsive*/}
      <div className={style.itemContainer}>
        <CheckboxInput
          id="allowNegativeStockInput"
          name="allowNegativeStock"
          label="* Permitir stock negativo"
          value={dataProduct.allowNegativeStock}
          handleChange={handleChangeDataForm}
        ></CheckboxInput>

        <CheckboxInput
          id="allowTrackStockInput"
          name="trackStock"
          label="* Llevar registro del stock"
          value={dataProduct.trackStock}
          handleChange={handleChangeDataForm}
        ></CheckboxInput>

        <CheckboxInput
          id="enableProductInput"
          name="enabled"
          label="* Producto disponible para la venta"
          value={dataProduct.enabled === true}
          handleChange={handleChangeDataForm}
        ></CheckboxInput>
      </div>

      {Object.keys(productToEdit).length === 0 ? (
        <div className={style.buttonsSection}>
          <ButtonTwo
            text={"Cancelar"}
            className={styles.openModal}
            onClick={() => {
              event.preventDefault();
              resetDataForm();
            }}
          />

          <ButtonTwo
            className={styles.openModal}
            onClick={() => createProduct()}
            text={"Crear producto"}
          />
        </div>
      ) : (
        <div className={style.buttonsSection}>
          <ButtonTwo
            className={styles.openModal}
            onClick={() => {
              event.preventDefault();
              setProductToEdit({});
              resetDataForm();
            }}
            text={"Limpiar formulario"}
          />

          <ButtonTwo
            className={styles.openModal}
            onClick={() => createProduct()}
            text={"Crear producto"}
          />

          {Object.keys(productToEdit).length >= 1 && (
            <ButtonTwo
              className={styles.openModal}
              type={"submit"}
              text={"Enviar cambios"}
            />
          )}
        </div>
      )}
    </form>
  );
};

export default FormProducts;
