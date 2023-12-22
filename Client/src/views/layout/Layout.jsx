import style from "./Layout.module.css";
import Navbar from "../../Components/Navbar/Navbar";

const Layout = () => {
  return (
    <div className={style.layoutContainer}>
      <Navbar />
    </div>
  );
};

export default Layout;