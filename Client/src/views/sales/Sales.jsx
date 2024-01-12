import style from "./Sales.module.css";
import CardProduct from "../../components/cardProduct/CardProduct";
import FormAfip from "../../components/formAfip/FormAfip";
import { useCart } from "../../context/cart/cart";
import { ProductContext } from "../../context/products/productsContext";
import { useContext, useState } from "react";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
	toast: true,
	showConfirmButton: false,
	position: "bottom-end",
	timer: 1000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

const Sales = () => {
	const { state, dispatch } = useCart();
	const [isClicked, setIsClicked] = useState(false);
	const products = useContext(ProductContext);

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

		if (e.key === "Enter") {
			const selectedProduct = products.find(
				(product) => product.name === value || product.barcode === value
			);

			if (selectedProduct) {
				dispatch({ type: "ADD_TO_CART", payload: selectedProduct });
				e.target.value = "";
			} else {
				Toast.fire({
					icon: "warning",
					title: "Producto no encontrado",
					customClass: {
						popup: "mySwal",
					},
				});
			}
		}
	};

	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	return (
		<section className={style.salesContainer}>
			{isClicked ? (
				<div className={style.inputContainer}>
					{" "}
					<input
						id="search"
						type="text"
						placeholder="Ingresa el producto o su código:"
						onKeyDown={handleInputChange}
						list="productsList"
						onClick={handleClick}
					/>
				</div>
			) : (
				<div className={style.inputAndSugestionsContainer}>
					{" "}
					<input
						id="search"
						type="text"
						placeholder="Ingresa el producto o su código:"
						onKeyDown={handleInputChange}
						list="productsList"
						onClick={handleClick}
					/>{" "}
					<div className={style.suggestions}>
						{products &&
							products.map((product) => (
								<div
									className={style.option}
									key={product.productId}
									value={product.name}
									onClick={() => {
										dispatch({ type: "ADD_TO_CART", payload: product });
										document.getElementById("search").value = "";
										setIsClicked(!isClicked);
									}}
								>
									{product.name}
								</div>
							))}
					</div>
				</div>
			)}

			<article className={style.tableContainer}>
				{groupedProducts && groupedProducts.length > 0 ? (
					<ul>
						{groupedProducts.map((product) => (
							<li key={product.productId}>
								<CardProduct product={product} />
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

// return (
//   <section className={style.salesContainer}>
//     <label htmlFor="search">
//       <input
//         id="search"
//         type="text"
//         placeholder="Ingresa el producto o su código:"
//         onKeyDown={handleInputChange}
//         list="productsList"
//       />
//     </label>
//     <datalist id="productsList">
//       {products &&
//         products.map((product) => (
//           <option
//             key={product.productId}
//             value={product.name}
//             onClick={() => {
//               dispatch({ type: "ADD_TO_CART", payload: product });
//               document.getElementById("search").value = "";
//             }}
//           />
//         ))}
//     </datalist>

//     <article className={style.tableContainer}>
//       {groupedProducts && groupedProducts.length > 0 ? (
//         <ul>
//           {groupedProducts.map((product) => (
//             <li key={product.productId}>
//               <CardProduct product={product} />
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <div className={style.null}>
//           Aún no se han seleccionado productos para la venta.
//         </div>
//       )}
//     </article>

//     <div className={style.formContainer}>
//       <FormAfip />
//     </div>
//   </section>
// );
// };
