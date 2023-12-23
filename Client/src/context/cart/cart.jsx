/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const CartContext = createContext();
const URL = import.meta.env.VITE_URL_BACKEND;

const initialState = {
  cart: [],
};

console.log("initialState", initialState);

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedProducts = [...state.cart, action.payload];
      return {
        ...state,
        cart: updatedProducts,
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const addToCart = async (productData) => {
    try {
      const response = await axios.post(`${URL}/cart`, productData);
      console.log("carrito: ", response);
      /* dispatch({ type: "ADD_TO_CART", payload: response.data }); */
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return (
    <CartContext.Provider value={{ state, addToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
