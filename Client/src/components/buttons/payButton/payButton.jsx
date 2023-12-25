import { useState } from "react";
import { useCart } from "../../../context/cart/cart";
import axios from "axios";

const PayButton = () => {
  const [sendInfo, setSendInfo] = useState(false);
  const { state } = useCart();
  const cart = state.cart;

  const baseURL = import.meta.env.VITE_URL_BACKEND;

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!Array.isArray(cart) || cart.length === 0) {
        throw new Error("El carrito está vacío o no es un array válido");
      }

      const totalAmount = cart
        .reduce((total, product) => {
          return total + (parseFloat(product.finalPrice) || 0);
        }, 0)
        .toFixed(2);

      const saleData = {
        products: cart,
        amount: totalAmount,
        paymentType: "cash",
        local: "prueba",
        state: "pending",
        debtAmount: totalAmount,
      };

      console.log("saleData", saleData);

      const response = await axios.post(`${baseURL}/sales`, saleData);
      console.log("Respuesta de la solicitud:", response.data);
    } catch (error) {
      console.error("Error al procesar la compra:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Comprar</button>
    </form>
  );
};

export default PayButton;
