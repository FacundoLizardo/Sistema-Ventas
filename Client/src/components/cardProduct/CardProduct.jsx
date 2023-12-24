import style from "./CardProduct.module.css";
import { useCart } from "../../context/cart/cart";

const CardProduct = ({ product }) => {
  const { state, dispatch } = useCart();

  const handleAddToCart = async (product) => {
    console.log(product);
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <div className={style.cardProductContainer}>
      <div className={style.info}>
        <div className={style.infoTop}>
          <h3>{product.name}</h3>
          <p>${product.finalPrice}</p>
        </div>
        <div className={style.infoBottom}>
          <p>{product.category}</p>
          <div>{}</div>
        </div>
      </div>
      <div className={style.buttons}>
        <div>
          <button>-</button>
        </div>
        <div>0</div>
        <div>
          <button onClick={() => handleAddToCart(product)}>+</button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
