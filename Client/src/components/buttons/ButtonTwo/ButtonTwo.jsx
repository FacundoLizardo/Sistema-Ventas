import style from "./ButtonTwo.module.css";

const ButtonTwo = ({ text }) => {
  return (
    <div className={style.buttonContainer}>
      <button>{text}</button>
    </div>
  );
};

export default ButtonTwo;
