import style from "./ButtonTwo.module.css";

const ButtonTwo = ({ text, onClick }) => {
  return (
    <div className={style.buttonContainer} onClick={onClick}>
      <button>{text}</button>
    </div>
  );
};

export default ButtonTwo;
