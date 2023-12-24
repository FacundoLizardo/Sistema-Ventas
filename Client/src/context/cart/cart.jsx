/* eslint-disable no-case-declarations */
import { createContext, useContext, useEffect, useReducer } from "react";
import { ADD_TO_CART } from "./cartTypes";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

console.log("initialState", initialState);

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        cart: [...state.cart, action.payload],
      };

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  useEffect(() => {
		localStorage.setItem("cart", JSON.stringify(state.cart));
	}, [state.cart]);

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

	if (!context) {
		throw new Error("useCart debe utilizarse dentro de un CartProvider");
	}

	return context;
};

export default CartProvider;
