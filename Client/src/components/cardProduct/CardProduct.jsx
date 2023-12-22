import style from "./CardProduct.module.css";

const CardProduct = ({ product }) => {
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
          <button>+</button>
        </div>
      </div>
    </div>
  );
};

export default CardProduct;
