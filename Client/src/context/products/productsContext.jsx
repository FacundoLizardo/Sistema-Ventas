import axios from "axios";
import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();

const ProductProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	const URL = import.meta.env.VITE_URL_BACKEND;

	useEffect(() => {
		const fetchData = async () => {
			try {
				const { data } = await axios.get(`${URL}/products`);
				setProducts(data);
			} catch (error) {
				console.error("Error fetching data:", error.message);
			}
		};

		fetchData();
	}, []);

	return (
		<ProductContext.Provider value={products}>
			{children}
		</ProductContext.Provider>
	);
};

export { ProductContext, ProductProvider };
