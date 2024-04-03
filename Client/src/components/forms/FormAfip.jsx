/* eslint-disable react/no-unknown-property */
import style from "./Forms.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/cart/cart";
import Buttons from "../buttons/Buttons.jsx";

const FormAfip = () => {
  const {
    state: { cart },
    dispatch,
  } = useCart();
  const [errors, setErrors] = useState({});

  const baseURL = import.meta.env.VITE_URL_BACKEND;
  const [dataAfip, setDataAfip] = useState({
    products: [],
    amount: 0,
    discount: 0,
    extraCharge: 0,
    debtAmount: 0,
    local: "prueba",
    paymentType: "cash",
    invoiceNumber: "",
    state: "pending",
    isdelivery: false,
    deliveryAddress: "",
    customersId: "",
    comments: "",

    cbteTipo: 0,
    concepto: 1,
    docTipo: "99",
    docNro: "",
    importeExentoIva: 0,
    importeIva: 21,

    ptoVta: 1,
  });

  console.log(dataAfip);

  useEffect(() => {
    const totalAmount = () => {
      const total = cart.reduce((total, product) => {
        return total + (parseFloat(product.finalPrice) || 0);
      }, 0);

      const discountDecimal = dataAfip.discount / 100;
      const totalWithDiscount = total * (1 - discountDecimal);

      setDataAfip((prevData) => ({
        ...prevData,
        products: cart,
        amount: parseFloat(totalWithDiscount).toFixed(2),
      }));
    };

    totalAmount();
  }, [
    cart,
    dataAfip.discount,
    dataAfip.extraCharge,
    dataAfip.debtAmount,
    dataAfip.paymentType,
    dataAfip.invoiceNumber,
    dataAfip.state,
    dataAfip.isdelivery,
    dataAfip.deliveryAddress,
    dataAfip.customersId,
    dataAfip.comments,
    dataAfip.cbteTipo,
    dataAfip.concepto,
    dataAfip.docTipo,
    dataAfip.docNro,
    dataAfip.importeExentoIva,
    dataAfip.importeIva,
  ]);

  const showTotalAmount = () => {
    const total = cart
      .reduce((total, product) => {
        return total + (parseFloat(product.finalPrice) || 0);
      }, 0)
      .toFixed(2);

    return total;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!Array.isArray(cart) || cart.length === 0) {
        throw new Error("El carrito está vacío o no es un array válido");
      }

      const discountPercentage = parseFloat(dataAfip.discount) / 100;

      const updateDataAfip = {
        ...dataAfip,
        discount: discountPercentage,
      };

      const response = await axios.post(`${baseURL}/afip`, updateDataAfip);
      dispatch({ type: "CLEAR" });

      return response;
    } catch (error) {
      console.error("Error processing the purchase:", error);
    }
  };

  const handleFormValue = (event) => {
    const { name, value } = event.target;
    const parsedValue = name === "cbteTipo" ? parseInt(value) : value;
    setDataAfip((prevData) => ({
      ...prevData,
      [name]: parsedValue,
    }));
  };

  let additionalFields = null;
  if (
    dataAfip.cbteTipo === 1 ||
    dataAfip.cbteTipo === 6 ||
    dataAfip.cbteTipo === 201 ||
    dataAfip.cbteTipo === 206 ||
    dataAfip.cbteTipo === 3 ||
    dataAfip.cbteTipo === 8
  ) {
    additionalFields = (
      <div className={style.itemContainer}>
        <div className={style.item}>
          <label for="concepto">Concepto</label>
          <select name="concepto" id="concepto" onChange={handleFormValue}>
            <option value="1">Productos</option>
            <option value="2">Servicios</option>
            <option value="3">Productos y Servicios</option>
          </select>
        </div>

        <div className={style.item}>
          <label for="importeExentoIva">Imp. Exento IVA</label>
          <input
            type="number"
            name="importeExentoIva"
            id="importeExentoIva"
            onChange={handleFormValue}
          />
        </div>

        <div className={style.item}>
          <label for="importeIva">Importe IVA</label>
          <input
            type="number"
            name="importeIva"
            id="importeIva"
            onChange={handleFormValue}
            value={dataAfip.importeIva}
          />
        </div>

        <div className={style.item}>
          <label for="discount">Desc. (%)</label>
          <input
            type="number"
            name="discount"
            id="discount"
            placeholder="Ingrese el descuento"
            onChange={handleFormValue}
            min="0"
            max="100"
          />
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      {/* Document Details */}

      <div className={style.itemContainer}>
        <div className={style.item}>
          <label for="docTipo">Tipo de documento</label>
          <select
            id="docTipo"
            name="docTipo"
            onChange={handleFormValue}
            defaultValue={dataAfip.docTipo}
          >
            <option value="80">CUIT</option>
            <option value="86">CUIL</option>
            <option value="96">DNI</option>
            <option value="99">Consumidor Final</option>
          </select>
        </div>

        <div className={style.item}>
          <label for="docNro">Número de documento</label>
          <input
            type="text"
            name="docNro"
            id="docNro"
            onChange={handleFormValue}
          />
        </div>
      </div>

      {/* Payment Details */}

      <div className={style.itemContainer}>
        <div className={style.item}>
          <label for="paymentType">Forma de pago</label>
          <select
            name="paymentType"
            id="paymentType"
            onChange={handleFormValue}
            value={dataAfip.paymentType}
          >
            <option value="cash">Efectivo</option>
            <option value="credit">Tarjeta de crédito</option>
            <option value="debit">Tarjeta de débito</option>
            <option value="mercadoPago">Mercado Pago</option>
          </select>
        </div>

        <div className={style.item}>
          <label for="cbteTipo">Tipo de factura</label>
          <select
            name="cbteTipo"
            id="cbteTipo"
            onChange={handleFormValue}
            value={dataAfip.cbteTipo}
          >
            <option value={0}>Sin factura</option>
            <option value={1}>Factura A</option>
            <option value={6}>Factura B</option>
            <option value={11}>Factura C</option>
            <option value={201}>Factura de Crédito electrónica A</option>
            <option value={206}>Factura de Crédito electrónica B</option>
            <option value={211}>Factura de Crédito electrónica C</option>
            <option value={3}>Nota de Crédito A</option>
            <option value={8}>Nota de Crédito B</option>
            <option value={13}>Nota de Crédito C</option>
          </select>
        </div>
      </div>

      {/* Invoice Type and Details */}

      {additionalFields}

      {/* Amount */}

      <div className={style.itemContainer}>
        <div className={style.item}>
          <span>Sin descuento</span>
          <span>$ {showTotalAmount()}</span>
        </div>

        <div className={style.item}>
          <span>Con descuento</span>
          <span>$ {showTotalAmount()}</span>
        </div>

        <div className={style.item}>
          <span>Monto IVA</span>
          <span>$ {showTotalAmount()}</span>
        </div>
      </div>

      {/* Total to Pay */}

      <div className={style.itemContainer}>
        <div className={style.totalProducts}>
          <p>
            {cart.length === 0
              ? "Actualmente no tienes productos seleccionados."
              : `Actualmente tienes ${cart.length} artículo${
                  cart.length !== 1 ? "s" : ""
                } en tu selección.`}
          </p>
        </div>
        <div className={style.totalPrice}>
          <p>Total a pagar</p>
          <p className={style.totalNumber}>$ {dataAfip.amount}</p>
        </div>
      </div>

      <div className={style.itemContainer}>
{/*         <div className={style.item}>
          <Buttons type="" text="Cancelar" onClick={""} />
        </div>
        <div className={style.item}>
          <Buttons type="" text="Pendiente" onClick={""} />
        </div>
 */}        <div className={style.item}>
          <Buttons type="submit" text="Vender" onClick={handleSubmit} />
        </div>
      </div>
    </form>
  );
};

export default FormAfip;
