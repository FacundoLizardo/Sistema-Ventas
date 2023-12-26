import { useEffect, useState } from "react";
import { useCart } from "../../../context/cart/cart";
import axios from "axios";

const PayButton = () => {
  const { state } = useCart();
  const cart = state.cart;

  const baseURL = import.meta.env.VITE_URL_BACKEND;
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({
    amount: 0,
    discount: 0,
    extraCharge: 0,
    debtAmount: "",
    local: "",
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
  }, [cart, modalData.discount]);

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
    setShowModal(true);
  };

  const handleDiscount = (event) => {
    const discountValue = event.target.value;
    setModalData((prevData) => ({
      ...prevData,
      discount: discountValue,
    }));
  };

  return (
    <section>
      {!showModal ? (
        <button onClick={handleModalOpen}>Cargar datos</button>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <p>Monto sin descuento:</p>
            <p>{showTotalAmount()}</p>
          </div>
          <div>
            <label htmlFor="discount">Descuento:</label>
            <input
              type="number"
              id="discount"
              value={modalData.discount}
              placeholder={modalData.discount}
              onChange={handleDiscount}
              min="0"
              max="100"
            />
          </div>
          <div>
            <p>Total a pagar:</p>
            <p>{modalData.amount}</p>
          </div>
          <button type="submit">Comprar</button>
        </form>
      )}
    </section>
  );
};

export default PayButton;
