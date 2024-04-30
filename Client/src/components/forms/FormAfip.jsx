/* eslint-disable react/no-unknown-property */
import style from "./Forms.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../../context/cart/cart";
import ButtonOne from "../buttons/ButtonOne/ButtonOne.jsx";
import Spinner from "../spinner/Spinner.jsx";

// TODO emitir sin factura (emite un ticket común)
// TODO chequear emitir factura a + validación errores
// TODO emitir factura b + validación errores
// TODO emitir factura c + validación errores
// TODO emitir factura de credito electronica a + validación errores
// TODO emitir factura de credito electronica b + validación errores
// TODO emitir factura de credito electronica c + validación errores
// TODO emitir nota de crédito a + validación errores
// TODO emitir nota de crédito b + validación errores
// TODO emitir nota de crédito c + validación errores
// TODO calcular descuento (iva+exento+desc) en productos

const FormAfip = () => {
  const URL = import.meta.env.VITE_URL_BACKEND;
  const {
    state: { cart },
    dispatch,
  } = useCart();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
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
    docTipo: 80,
    docNro: 0,
    importeExentoIva: 0,
    importeIva: 21,

    ptoVta: 1,
  });

  console.log(dataAfip);

  useEffect(() => {
    const totalAmount = () => {
      const total = cart.reduce((total, product) => {
        return total + (parseInt(product.finalPrice) || 0);
      }, 0);

      const discountDecimal = dataAfip.discount / 100;
      const totalWithDiscount = (total * (1 - discountDecimal) * 100) / 100;

      setDataAfip((prevData) => ({
        ...prevData,
        products: cart,
        amount: Math.floor(+totalWithDiscount),
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (!Array.isArray(cart) || cart.length === 0) {
        throw new Error("El carrito está vacío o no es un array válido");
      }

      const response = await axios.post(`${URL}/afip`, dataAfip);
      console.log("response", response);

      if (dataAfip.cbteTipo !== 0) {
        const pdfUrl = response.data.afipInvoice.generatedPDF.file;
        window.open(pdfUrl);
      } else {
        const pdfData = response.data.afipInvoice.pdfFile.data;
        const blob = new Blob([new Uint8Array(pdfData)], { type: 'application/pdf' });
        const pdfUrl = URL.createObjectURL(blob);
        window.open(pdfUrl);
      }

      dispatch({ type: "CLEAR" });
      setLoading(false);
      return response;
    } catch (error) {
      console.error("Error processing the purchase:", error);
      setLoading(false);
    }
  };

  const handleFormValue = (event) => {
    const { name, value } = event.target;
    let importeIva = dataAfip.importeIva;

    switch (parseInt(value)) {
      case 0: // Sin factura
        importeIva = 0;
        break;
      case 1: // Factura A
      case 201: // Factura de Crédito electrónica A
      case 6: // Factura B
      case 206: // Factura de Crédito electrónica B
      case 11: // Factura C
      case 211: // Factura de Crédito electrónica C
        importeIva = 21;
        break;
      case 3: // Nota de Crédito A
      case 8: // Nota de Crédito B
      case 13: // Nota de Crédito C
        importeIva = 0;
        break;
      default:
        importeIva = 0;
        break;
    }

    const parseValue =
      name === "cbteTipo" ||
      name === "importeExentoIva" ||
      name === "docTipo" ||
      name === "discount" ||
      name === "docNro"
        ? parseInt(value)
        : value;

    setDataAfip((prevData) => ({
      ...prevData,
      [name]: parseValue,
      importeIva: importeIva,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className={style.formContainer}>
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
          <label for="docNro">Número</label>
          <input
            type="text"
            name="docNro"
            id="docNro"
            onChange={handleFormValue}
          />
        </div>

        <div className={style.item}>
          <label for="docNro">Cliente</label>
          <input type="text" name="" id="" disabled />
        </div>
      </div>

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
            <option value={"0"}>Sin factura</option>
            <option value={"1"}>Factura A</option>
            <option value={"6"}>Factura B</option>
            <option value={"11"}>Factura C</option>
            {/*   <option value={"201"}>Factura de Crédito electrónica A</option>
            <option value={"206"}>Factura de Crédito electrónica B</option>
            <option value={"211"}>Factura de Crédito electrónica C</option>
            <option value={"3"}>Nota de Crédito A</option>
            <option value={"8"}>Nota de Crédito B</option>
            <option value={"13"}>Nota de Crédito C</option> */}
          </select>
        </div>
      </div>

      {dataAfip.cbteTipo === 1 ||
      dataAfip.cbteTipo === 6 ||
      dataAfip.cbteTipo === 201 ||
      dataAfip.cbteTipo === 206 ||
      dataAfip.cbteTipo === 3 ||
      dataAfip.cbteTipo === 8 ? (
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
        </div>
      ) : (
        ""
      )}

      <div className={style.itemContainer}>
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
        <div className={style.item}>
          <div className={style.totalPrice}>
            {cart.length === 0 ? (
              <p>Actualmente no tienes productos seleccionados. </p>
            ) : (
              <div>
                <p>{`Total a pagar por ${cart.length} artículo${
                  cart.length !== 1 ? "s" : ""
                }:`}</p>
                <p>
                  {dataAfip.cbteTipo !== 0 ? (
                    <span className={style.totalNumber}>
                      $ {Math.floor(dataAfip.amount * 1.21)}
                    </span>
                  ) : (
                    <span className={style.totalNumber}>
                      $ {Math.floor(dataAfip.amount)}
                    </span>
                  )}
                </p>
              </div>
            )}
          </div>{" "}
        </div>
      </div>

      <div className={style.buttonsSectionAfip}>
        <ButtonOne type="" text="Cancelar" onClick={""} />

        <ButtonOne type="" text="Pendiente" onClick={""} />

        {loading ? (
          <Spinner />
        ) : (
          <ButtonOne type="submit" text="Vender" onClick={handleSubmit} />
        )}
      </div>
    </form>
  );
};

export default FormAfip;
