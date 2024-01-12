import style from "./Filters.module.css";
import { useContext, useEffect } from "react";
import { useFilterContext } from "../../context/filters/filtersContext";
import axios from "axios";
import { ProductContext } from "../../context/products/productsContext";

const Filters = () => {
	const { filters, updateFilters } = useFilterContext();
	const { setProducts } = useContext(ProductContext);
	const URL = import.meta.env.VITE_URL_BACKEND;

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		updateFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
	};

	useEffect(() => {
		const fetchFilter = async () => {
			let url = `${URL}/filter`;

			if (filters.query || filters.category) {
				url += `?query=${filters.query}&category=${filters.category}&page=${filters.page}`;
			}

			try {
				const { data } = await axios.get(url);
				console.log("data", data);
				setProducts(data.products);
			} catch (error) {
				console.error("Error fetching data:", error.message);
			}
		};

		if (!filters.query && !filters.category) {
			("");
		} else {
			fetchFilter();
		}
	}, [filters]);

	return (
		<div className={style.filtersContainer}>
			<label>
				<input
					type="text"
					name="query"
					value={filters.query}
					onChange={handleInputChange}
				/>
			</label>

			<label>
				<select
					name="category"
					value={filters.category}
					onChange={handleInputChange}
				>
					<option value="">Categoría</option>
					<option value="tinto">Tinto</option>
					<option value="espumante">Espumante</option>
				</select>
			</label>
		</div>
	);
};

export default Filters;
