import style from "./Spinner.module.css";

const Spinner = () => {
  return (
    <div className={style.loaderContainer}>
      <div className={style.loader}></div>
    </div>
  );
};

export default Spinner;
