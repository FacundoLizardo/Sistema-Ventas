/* eslint-disable react/no-unknown-property */
import style from "./PayButton.module.css";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/cart/cart";
import axios from "axios";

const PayButton = () => {
  const { state } = useCart();
  const cart = state.cart;

  const baseURL = import.meta.env.VITE_URL_BACKEND;
  const [dataAfip, setDataAfip] = useState({
    products: cart,
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

    cbteTipo: 1,
    concepto: 1,
  });
  console.log(dataAfip);

  useEffect(() => {
    totalAmount();
  }, [
    cart,
    dataAfip.products,
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
  ]);

  const totalAmount = () => {
    const total = cart.reduce((total, product) => {
      return total + (parseFloat(product.finalPrice) || 0);
    }, 0);

    const discountDecimal = dataAfip.discount / 100;
    const totalWithDescount = total * (1 - discountDecimal);
    setDataAfip((prevData) => ({
      ...prevData,
      amount: parseFloat(totalWithDescount).toFixed(2),
    }));
  };

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

      const response = await axios.post(`${baseURL}/operations`, dataAfip);
      console.log("Respuesta de la solicitud:", response.data);
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };

  const handleFormValue = (event) => {
    const { name, value } = event.target;
    setDataAfip((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
      <div className={style.totalAmount}>
        <p htmlFor="totalAmount" name="totalAmount">
          Monto sin descuento
        </p>
        <p>$ {showTotalAmount()}</p>
      </div>

      <div className={style.discount}>
        <label htmlFor="discount">Descuento por compra (%)</label>
        <input
          type="number"
          id="discount"
          placeholder="Ingrese el descuento"
          onChange={handleFormValue}
          min="0"
          max="100"
        />
      </div>

      {/* <div className={style.item}>
            <label htmlFor="debtAmount">Monto pendiente:</label>
            <input
              type="numer"
              name="debtAmount"
              value={modalData.debtAmount}
            />
          </div> */}

      {/*  <div className={style.item}>
              <label htmlFor="local" name="local">
                Sucursal:
              </label>
            </div> */}

      <div className={style.paymentType}>
        <label htmlFor="paymentType">Forma de pago:</label>
        <select
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

      <div className={style.invoiceNumber}>
        <label htmlFor="invoiceNumber">Cupón de cobro:</label>
        <input type="text" id="invoiceNumber" />
      </div>

      <div className={style.item}>
        <label htmlFor="cbteTipo">Tipo de factura:</label>
        <select
          id="cbteTipo"
          onChange={handleFormValue}
          value={dataAfip.cbteTipo}
        >
          <option value="1">Factura A</option>
          <option value="6">Factura B</option>
          <option value="11">Factura C</option>
          <option value="201">Factura de Crédito electrónica A</option>
          <option value="206">Factura de Crédito electrónica B</option>
          <option value="211">Factura de Crédito electrónica C</option>
          <option value="3">Nota de Crédito A</option>
          <option value="8">Nota de Crédito B</option>
          <option value="13">Nota de Crédito C</option>
        </select>
      </div>

      <div>
        <label htmlFor="concepto">Concepto:</label>
        <select
          if="concepto"
          onChange={handleFormValue}
          value={dataAfip.concepto}
        >
          <option value="1">Productos</option>
          <option value="2">Servicios</option>
          <option value="3">Productos y Servicios</option>
        </select>
      </div>

      <div className={style.total}>
        <label>Total a pagar:</label>
        <h2>$ {dataAfip.amount}</h2>
      </div>
      <button type="submit">Vender</button>
    </form>
  );
};

export default PayButton;
