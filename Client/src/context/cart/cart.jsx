/* eslint-disable no-case-declarations */
import { createContext, useContext, useReducer } from "react";
import axios from "axios";

const CartContext = createContext();
const URL = import.meta.env.VITE_URL_BACKEND;

const initialState = {
  products: [],
};

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const updatedProducts = [...state.products, action.payload];
      return {
        ...state,
        products: updatedProducts,
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, { products: [] });

  const addToCart = async (productData) => {
    try {
      const response = await axios.post(`${URL}/cart`, productData);
      dispatch({ type: "ADD_TO_CART", payload: response.data });
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
