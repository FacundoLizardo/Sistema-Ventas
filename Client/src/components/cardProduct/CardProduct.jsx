import style from "./CardProduct.module.css";
import { useCart } from "../../context/cart/cart";

const CardProduct = ({ product, onHandleAddToCart, onHandleDeleteToCart }) => {
  const { state, dispatch } = useCart();
  let stylesStock = product.stock <= 0 ? style.withoutStock : "";

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const handleDeleteToCart = () => {
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
    <article className={`${style.cardProductContainer} ${stylesStock}`}>
      <div className={style.info}>
        <div className={style.infoTop}>
          <h3>{product.name}</h3>
          <p>${product.finalPrice}</p>
        </div>
        <div className={style.infoBottom}>
          <p>{product.category}</p>
          <p>Disponible: {product.stock}</p>
        </div>
      </div>
      {(onHandleAddToCart || onHandleDeleteToCart) && (
        <div className={style.buttons}>
          {onHandleDeleteToCart && (
            <div>
              <button onClick={handleDeleteToCart}>-</button>
            </div>
          )}
          <div>{countProducts(product.productId)}</div>
          {onHandleAddToCart && (
            <div>
              <button onClick={handleAddToCart}>+</button>
            </div>
          )}
        </div>
      )}
    </article>
  );
};

export default CardProduct;