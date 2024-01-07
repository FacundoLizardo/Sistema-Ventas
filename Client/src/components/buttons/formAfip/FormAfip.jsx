/* eslint-disable react/no-unknown-property */
import style from "./FormAfip.module.css";
import { useEffect, useState } from "react";
import { useCart } from "../../../context/cart/cart";
import axios from "axios";

const FormAfip = () => {
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

    cbteTipo: 0,
    concepto: 1,
    docTipo: "99",
    docNro: "",
    importeExentoIva: 0,
    importeIva: 21,

    ptoVta: 1,

    razonSocial: "Facudno Lizardo S.A.",
    direccion: "Calle Henry 123",
    cuit: "30123456789",
    responsableInscripto: "RESPONSABLE INSCRIPTO",
    iibb: "543210",
    inicioActividad: "01/01/2023",
  });

  useEffect(() => {
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

      const discountPercentage = parseFloat(dataAfip.discount) / 100;

      const updateDataAfip = {
        ...dataAfip,
        discount: discountPercentage,
      };

      const response = await axios.post(`${baseURL}/afip`, updateDataAfip);
      console.log("Back End response:", response.data);
      return response;
    } catch (error) {
      console.error("Error processing the purchase:", error);
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
      {/* Document Details */}

      <div className={style.itemContainer}>
        <div className={style.item}>
          <label>Tipo de documento</label>
          <select
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
          <label>Número de documento</label>
          <input type="text" name="docNro" onChange={handleFormValue} />
        </div>
      </div>

      {/* Payment Details */}

      <div className={style.itemContainer}>
        <div className={style.item}>
          <label>Forma de pago</label>
          <select
            name="paymentType"
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
          <label>Cupón de cobro</label>
          <input type="text" name="invoiceNumber" />
        </div>
      </div>

      {/* Invoice Type and Details */}

      <div className={style.itemContainer}>
        <div className={style.item}>
          <label>Tipo de factura</label>
          <select
            name="cbteTipo"
            onChange={handleFormValue}
            value={dataAfip.cbteTipo}
          >
            <option value="0">Sin factura</option>
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

        <div className={style.item}>
          <label>Concepto</label>
          <select name="concepto" onChange={handleFormValue}>
            <option value="1">Productos</option>
            <option value="2">Servicios</option>
            <option value="3">Productos y Servicios</option>
          </select>
        </div>

        <div className={style.item}>
          <label>Imp. Exento IVA</label>
          <input
            type="number"
            name="importeExentoIva"
            onChange={handleFormValue}
          />
        </div>

        <div className={style.item}>
          <label>Importe IVA</label>
          <input
            type="number"
            name="importeIva"
            onChange={handleFormValue}
            value={dataAfip.importeIva}
          />
        </div>
      </div>

      {/* Amount */}

      <div className={style.itemContainer}>
        <div className={style.item}>
          <p htmlFor="totalAmount" name="totalAmount">
            Monto sin descuento
          </p>
          <p>$ {showTotalAmount()}</p>
        </div>

        <div className={style.item}>
          <label>Descuento por compra (%)</label>
          <input
            type="number"
            name="discount"
            placeholder="Ingrese el descuento"
            onChange={handleFormValue}
            min="0"
            max="100"
          />
        </div>
      </div>
      
      {/* Total to Pay */}

      <div className={style.total}>
        <label>Total a pagar</label>
        <h2>$ {dataAfip.amount}</h2>
      </div>
      <button type="submit">Vender</button>
    </form>
  );
};

export default FormAfip;
