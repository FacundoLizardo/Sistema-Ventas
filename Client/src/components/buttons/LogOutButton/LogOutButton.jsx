import styles from "./LogoutButton.module.css";

const LogOutButton = ({ type }) => {
	return (
		<div className={styles.buttonContainer}>
			<button type={type} className={`${styles.buttonColor}`}>
				Cerrar sesión
			</button>
		</div>
	);
};

export default LogOutButton;
