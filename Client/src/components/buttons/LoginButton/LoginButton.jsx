import styles from "./LoginButton.module.css";

const LoginButton = ({ type }) => {
	return (
		<div className={styles.buttonContainer}>
			<button type={type} className={`${styles.buttonColor}`}>
				Iniciar sesión
			</button>
		</div>
	);
};

export default LoginButton;
