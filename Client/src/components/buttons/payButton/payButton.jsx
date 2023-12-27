import { useEffect, useState } from "react";
import { useCart } from "../../../context/cart/cart";
import axios from "axios";

const PayButton = () => {
  const { state } = useCart();
  const cart = state.cart;

  const baseURL = import.meta.env.VITE_URL_BACKEND;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
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
  });

  useEffect(() => {
    totalAmount();
  }, [modalData.discount]);

  const totalAmount = () => {
    const total = cart.reduce((total, product) => {
      return total + (parseFloat(product.finalPrice) || 0);
    }, 0);

    const discountDecimal = modalData.discount / 100;
    const totalWithDescount = total * (1 - discountDecimal);
    setModalData((prevData) => ({
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

      const response = await axios.post(`${baseURL}/operations`, modalData);
      console.log("Respuesta de la solicitud:", response.data);
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };

  const handleModalOpen = () => {
    setModalData((prevData) => ({
      ...prevData,
      products: cart,
    }));
    setShowModal(true);
  };

  const handleFormValue = (event) => {
    const { name, value } = event.target;
    setModalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section>
      {!showModal ? (
        <button onClick={handleModalOpen}>Completar Detalles de Venta</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <p>Monto sin descuento:</p>
            <p>$ {showTotalAmount()}</p>
          </div>

          <div>
            <label htmlFor="discount">Descuento:</label>
            <input
              type="number"
              name="discount"
              value={modalData.discount}
              placeholder={modalData.discount}
              onChange={handleFormValue}
              min="0"
              max="100"
            />
          </div>

          {/* <div>
            <label htmlFor="debtAmount">Monto pendiente:</label>
            <input
              type="numer"
              name="debtAmount"
              value={modalData.debtAmount}
            />
          </div> */}

          <div>
            <label htmlFor="local" name="local">
              Sucursal:
            </label>
          </div>

          <div>
            <label htmlFor="paymentType">Forma de pago</label>
            <select name="paymentType">
              <option value="cash">Efectivo</option>
              <option value="credit">Tarjeta de crédito</option>
              <option value="debit">Tarjeta de débito</option>
              <option value="mercadoPago">Mercado Pago</option>
            </select>
          </div>

          <div>
            <label htmlFor="invoiceNumber">Cupón de cobro:</label>
            <input type="text" name="invoiceNumber" />
          </div>

          <div>
            <p>Total a pagar:</p>
            <p>$ {modalData.amount}</p>
          </div>
          <button type="submit">Comprar</button>
        </form>
      )}
    </section>
  );
};

export default PayButton;
