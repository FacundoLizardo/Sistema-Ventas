import style from "./Sales.module.css";
import CardProduct from "../../components/cardProduct/CardProduct";
import FormAfip from "../../components/forms/FormAfip";
import { useCart } from "../../context/cart/cart";
import { ProductContext } from "../../context/products/productsContext";
import { UserContext } from "../../context/user/userContext";
import { useContext, useState } from "react";

const Sales = () => {
	const { state, dispatch } = useCart();
	const [isOpen, setIsOpen] = useState(false);
	const { products } = useContext(ProductContext);
	const { validUser } = useContext(UserContext);
	const [searchTerm, setSearchTerm] = useState("");

	console.log(validUser);
	const groupedProducts = state.cart.reduce((grouped, item) => {
		const existingProduct = grouped.find(
			(group) => group.productId === item.productId
		);

		if (existingProduct) {
			existingProduct.quantity += item.quantity;
		} else {
			grouped.push({
				...item,
				quantity: item.quantity,
			});
		}

		return grouped;
	}, []);

	const handleInputChange = (e) => {
		const value = e.target.value;
		setSearchTerm(value);

		if (value.trim() !== "") {
			setIsOpen(true);
		} else {
			setIsOpen(false);
		}
	};

	const handleClick = () => {
		setIsOpen(!isOpen);
	};

	const manageClickToCloseSuggestions = () => {
		if (isOpen === true) {
			setIsOpen(false);
		}
	};

	const filteredProducts = products.filter(
		(product) =>
			product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product.barcode.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<section
			className={style.salesContainer}
			onClick={manageClickToCloseSuggestions}
		>
			{!isOpen ? (
				<div className={style.inputContainer} onClick={handleClick}>
					<input
						className={style.searchInput}
						id="search"
						type="text"
						placeholder="Ingresa el producto o su código de barras:"
						onChange={handleInputChange}
						list="productsList"
						value={searchTerm}
					/>
				</div>
			) : (
				<div className={style.inputAndSugestionsContainer}>
					<input
						className={style.searchInput}
						id="search"
						type="text"
						placeholder="Ingresa el producto o su código:"
						list="productsList"
						onClick={handleClick}
						onChange={handleInputChange}
						value={searchTerm}
					/>{" "}
					<datalist className={style.suggestions}>
						<ul>
							{filteredProducts.map((product) => (
								<li
									className={style.option}
									key={product.productId}
									value={product.name}
									onClick={() => {
										dispatch({ type: "ADD_TO_CART", payload: product });
										setIsOpen(!isOpen);
										setSearchTerm("");
									}}
								>
									{product.name}
								</li>
							))}
						</ul>
					</datalist>
				</div>
			)}

			<article className={style.tableContainer}>
				{groupedProducts && groupedProducts.length > 0 ? (
					<ul>
						{groupedProducts.map((product) => (
							<li key={product.productId}>
								<CardProduct
									product={product}
									onHandleAddToCart={true}
									onHandleDeleteToCart={true}
								/>
							</li>
						))}
					</ul>
				) : (
					<div className={style.null}>
						Aún no se han seleccionado productos para la venta.
					</div>
				)}
			</article>

			<div className={style.formContainer}>
				<FormAfip />
			</div>
		</section>
	);
};

export default Sales;
