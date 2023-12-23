import style from "./CardProduct.module.css";
import { useCart } from "../../context/cart/cart";

const CardProduct = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = async (product) => {
    const cleanProduct = {
      name: product.name,
      category: product.category,
      cost: product.cost,
      finalPrice: product.finalPrice,
      discount: product.discount,
      profitPercentage: product.profitPercentage,
      quantity: product.quantity,
      enabled: product.enabled,
      notesDescription: product.notesDescription,
      taxes: product.taxes,
      barcode: product.barcode,
    };
    await addToCart(cleanProduct);
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
