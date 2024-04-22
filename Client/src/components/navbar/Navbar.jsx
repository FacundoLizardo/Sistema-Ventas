import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
const Navbar = () => {
  //TODO hacer menu para telefonos (no entra la navbar)
  return (
    <div className={style.navbarContainer}>
      <nav>
        <ul>
          <li>
            <NavLink to="/" activeclassname={style.activeLink}>
              Ventas
            </NavLink>
          </li>
          <li>
            <NavLink to="/stock" activeclassname={style.activeLink}>
              Inventario
            </NavLink>
          </li>
          <li>
            <NavLink to="/statistics" activeclassname={style.activeLink}>
              Estadísticas
            </NavLink>
          </li>
          <li>
            <NavLink to="/administration" activeclassname={style.activeLink}>
              Administration
            </NavLink>
          </li>
          {/* {isAuthenticated ? (
						<li>
							<LogOutButton />
						</li>
					) : (
						<li>
							<LoginButton />
						</li>
					)} */}
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
