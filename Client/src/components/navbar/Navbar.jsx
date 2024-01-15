import { NavLink } from "react-router-dom";
import style from "./Navbar.module.css";
import LoginButton from "../buttons/LoginButton/LoginButton";
import LogOutButton from "../buttons/LogOutButton/LogOutButton";
const Navbar = () => {
	return (
		<div className={style.navbarContainer}>
			<nav>
				<ul>
					<li>
						<NavLink exact to="/" activeClassName={style.activeLink}>
							Ventas
						</NavLink>
					</li>
					<li>
						<NavLink to="/stock" activeClassName={style.activeLink}>
							Stock
						</NavLink>
					</li>
					<li>
						<NavLink to="/statistics" activeClassName={style.activeLink}>
							Estadísticas
						</NavLink>
					</li>
					<li>
						<NavLink to="/administration" activeClassName={style.activeLink}>
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
