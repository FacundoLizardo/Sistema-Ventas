/* eslint-disable react/no-unknown-property */
import style from "./FormAfip.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/cart/cart";
import Buttons from "../buttons/buttons";

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
      </div>

      {/* Invoice Type and Details */}

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
        <div className={style.total}>
          <p>Total a pagar</p>
          <p className={style.totalNumber}>$ {dataAfip.amount}</p>
        </div>
        <div className={style.item}>
          <Buttons type="submit" text="Vender" onClick={handleSubmit} />
        </div>
      </div>

      <div className={style.itemContainer}>
        <div className={style.item}>
          <Buttons type="" text="Cancelar" onClick={""} />
        </div>
        <div className={style.item}>
          <Buttons type="" text="Pendiente" onClick={""} />
        </div>
      </div>
    </form>
  );
};

export default FormAfip;
