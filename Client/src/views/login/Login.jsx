import React from "react";
import styles from "./Login.module.css";
import LoginButton from "../../components/buttons/LoginButton/LoginButton";
import LogOutButton from "../../components/buttons/LogOutButton/LogOutButton";

const Login = () => {
	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<p className={styles.title}>Iniciar sesión</p>
				<form className={styles.form}>
					<div className={styles.inputGroup}>
						<label htmlFor="username">Email</label>
						<input
							type="text"
							name="username"
							id="username"
							placeholder="ejemplo@ejemplo.com"
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							name="password"
							id="password"
							placeholder="Contraseña123456"
						/>
						<div className={styles.forgot}>
							<a rel="noopener noreferrer" href="#">
								Olvidaste la contraseña?
							</a>
						</div>
					</div>
					<div>
						<LoginButton />
						<LogOutButton />
					</div>
				</form>
				<div className={styles.socialMessage}>
					<div className={styles.line}></div>
					<p className={styles.message}>Iniciar sesión con Google</p>
					<div className={styles.line}></div>
				</div>
				<div className={styles.socialIcons}>
					<button aria-label="Log in with Google" className={styles.icon}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 32 32"
							class="w-5 h-5 fill-current"
						>
							<path d="M16.318 13.714v5.484h9.078c-0.37 2.354-2.745 6.901-9.078 6.901-5.458 0-9.917-4.521-9.917-10.099s4.458-10.099 9.917-10.099c3.109 0 5.193 1.318 6.38 2.464l4.339-4.182c-2.786-2.599-6.396-4.182-10.719-4.182-8.844 0-16 7.151-16 16s7.156 16 16 16c9.234 0 15.365-6.49 15.365-15.635 0-1.052-0.115-1.854-0.255-2.651z"></path>
						</svg>
					</button>
				</div>
				<div className={styles.signup}>
					No tienes una cuenta?
					<a rel="noopener noreferrer" href="#">
						Crear cuenta
					</a>
				</div>
			</div>
		</div>
	);
};

export default Login;
