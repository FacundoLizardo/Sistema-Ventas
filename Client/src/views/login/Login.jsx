import styles from "./Login.module.css";
import { useState } from "react";

const Login = () => {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const handleChange = (e) => {
		const { name, value } = e.target;
		setUser((prevUser) => ({
			...prevUser,
			[name]: value,
		}));
	};

	return (
		<div className={styles.container}>
			<div className={styles.formContainer}>
				<p className={styles.title}>Iniciar sesión</p>
				<form className={styles.form}>
					<div className={styles.inputGroup}>
						<label htmlFor="username">Email</label>
						<input
							onChange={handleChange}
							value={user.email}
							type="text"
							name="email"
							id="username"
							placeholder="ejemplo@ejemplo.com"
						/>
					</div>
					<div className={styles.inputGroup}>
						<label htmlFor="password">Contraseña</label>
						<input
							onChange={handleChange}
							value={user.password}
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
					{/* 	<LoginButton user={user} /> */}
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
