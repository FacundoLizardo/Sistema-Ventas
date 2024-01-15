import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LogoutButton.module.css";

const LogOutButton = ({ type }) => {
	const { logout } = useAuth0();

	return (
		<div className={styles.buttonContainer}>
			<button
				type={type}
				className={`${styles.buttonColor}`}
				onClick={() =>
					logout({ logoutParams: { returnTo: window.location.origin } })
				}
			>
				Cerrar sesión
			</button>
		</div>
	);
};

export default LogOutButton;
