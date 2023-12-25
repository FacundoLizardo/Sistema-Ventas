import style from "./CardProduct.module.css";
import { useCart } from "../../context/cart/cart";

const CardProduct = ({ product }) => {
  const { state, dispatch } = useCart();

  const handleAddToCart = async (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleDeleteToCart = async (product) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: product });
  };

  const countProducts = (productId) => {
    if (state.cart && state.cart.length > 0) {
      const countProduct = state.cart.filter(
        (item) => item.productId === productId
      );
      return countProduct.length;
    } else {
      return 0;
    }
  };

  return (
    <article className={style.cardProductContainer}>
      <div className={style.info}>
        <div className={style.infoTop}>
          <h3>{product.name}</h3>
          <p>${product.finalPrice}</p>
        </div>
        <div className={style.infoBottom}>
          <p>{product.category}</p>
          <p>Disponible: {product.quantity}</p>
        </div>
      </div>
      <div className={style.buttons}>
        <div>
          <button onClick={() => handleDeleteToCart(product)}>-</button>
        </div>
        <div>{countProducts(product.productId)}</div>
        <div>
          <button onClick={() => handleAddToCart(product)}>+</button>
        </div>
      </div>
    </article>
  );
};

export default CardProduct;
