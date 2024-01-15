import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LoginButton.module.css";

const LoginButton = ({ type }) => {
	const { loginWithRedirect } = useAuth0();
	const { user, isAuthenticated, isLoading } = useAuth0();
	console.log(user, isAuthenticated, isLoading);
	return (
		<div className={styles.buttonContainer}>
			<button
				type={type}
				onClick={() => loginWithRedirect()}
				className={`${styles.buttonColor}`}
			>
				Iniciar sesión
			</button>
		</div>
	);
};

export default LoginButton;
