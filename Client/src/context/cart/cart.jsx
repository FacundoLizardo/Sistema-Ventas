/* eslint-disable no-case-declarations */
import { createContext, useContext, useEffect, useReducer } from "react";
import { ADD_TO_CART, REMOVE_FROM_CART } from "./cartTypes";
import Swal from "sweetalert2";

const CartContext = createContext();

const initialState = {
  cart: JSON.parse(localStorage.getItem("cart")) || [],
};

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 1000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const CartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.payload;

      if (product.stock > 0) {
        Toast.fire({
          icon: "success",
          title: "¡Producto agregado!",
          customClass: {
            popup: "mySwal",
          },
        });

        const updatedCartAdd = [...state.cart, action.payload];

        return {
          ...state,
          cart: updatedCartAdd,
        };
      } else {
        Swal.fire({
          icon: "error",
          title: "No hay suficiente stock",
          customClass: {
            popup: "mySwal",
          },
        });

        return state;
      }

    case REMOVE_FROM_CART:
      const productToRemove = action.payload;

      const findProduct = state.cart.find(
        (product) => product.productId === productToRemove.productId
      );

      if (findProduct) {
        const updatedCart = [...state.cart];
        const indexToRemove = updatedCart.indexOf(findProduct);
        updatedCart.splice(indexToRemove, 1);

        Toast.fire({
          icon: "error",
          title: "Producto eliminado",
          customClass: {
            popup: "mySwal",
          },
        });

        return {
          ...state,
          cart: updatedCart,
        };
      }

      return state;

    default: {
      return state;
    }
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
