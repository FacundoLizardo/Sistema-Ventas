import { Link } from "react-router-dom";
import style from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div className={style.navbarContainer}>
      <nav>
        <ul>
          <li>
            <Link to={"/sales"}>Sales</Link>
          </li>
          <li>
            <Link to={"/stock"}>Stock</Link>
          </li>
          <li>
            <Link to={"/statistics"}>Statistics</Link>
          </li>
          <li>
            <Link to={"/administration"}>Administration</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
