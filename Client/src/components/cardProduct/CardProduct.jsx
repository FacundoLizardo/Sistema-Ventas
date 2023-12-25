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
        <div>0</div>
        <div>
          <button onClick={() => handleAddToCart(product)}>+</button>
        </div>
      </div>
    </article>
  );
};

export default CardProduct;
