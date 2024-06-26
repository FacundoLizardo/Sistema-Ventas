import axios from "axios";
import {createContext, useState, useEffect} from "react";

const ProductContext = createContext();

const ProductProvider = ({children}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const {data} = await axios.get(`/products`);
                setProducts(data);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <ProductContext.Provider value={{products, setProducts}}>
            {children}
        </ProductContext.Provider>
    );
};

export {ProductContext, ProductProvider};
