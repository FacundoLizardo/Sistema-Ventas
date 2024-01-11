import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/products/productsContext.jsx";
import CartProvider from "./context/cart/cart.jsx";
import { FilterProvider } from "./context/filters/filtersContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CartProvider>
    <ProductProvider>
      <FilterProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FilterProvider>
    </ProductProvider>
  </CartProvider>
);
