import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/products/productsContext.jsx";
import CartProvider from "./context/cart/cart.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<Auth0Provider
		domain="dev-jbxxsvehnnjpnonn.us.auth0.com"
		clientId="MJmMRquEmQAPZFygwW9oYHPMZ5oOeI4f"
		authorizationParams={{
			redirect_uri: window.location.origin,
		}}
	>
		{" "}
		<CartProvider>
			<ProductProvider>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</ProductProvider>
		</CartProvider>
	</Auth0Provider>
);
