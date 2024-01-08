import style from "./GlobalButton.module.css";

const Buttons = ({ type, text, onClick }) => {
  let buttonColor = "";
  text === "Vender"
    ? (buttonColor = style.buyButtonColor)
    : text === "Pendiente"
    ? (buttonColor = style.pendingButtonColor)
    : text === "Cancelar"
    ? (buttonColor = style.cancelButtonColor)
    : (buttonColor = style.basicColor);

  return (
    <div className={style.buttonContainer}>
      <button type={type} onClick={onClick} className={`${buttonColor}`}>
        {text}
      </button>
    </div>
  );
};

export default Buttons;
