import styles from "./LoginButton.module.css";
import axios from "axios";
import Swal2 from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../../context/user/userContext";

const LoginButton = ({ user }) => {
	const { email, password } = user;
	const nav = useNavigate();
	const { validUser, setValidUser } = useContext(UserContext);

	const handleSubmit = async () => {
		try {
			const response = await axios.post(`/users/login`, {
				email,
				password,
			});
			const user = response.data.user;
			if (response.data.success === true) {
				Swal2.fire({
					title: "Bienvenido",
					icon: "success",
					confirmButtonText: "Comenzar a vender",
					customClass: {
						popup: "mySwal",
					},
				})
					.then(() => setValidUser(user))
					.then(() => nav("/"));
			}
		} catch (error) {
			window.alert(error.response.data.error);
		}
	};

	const handleClick = (e) => {
		event.preventDefault();
		handleSubmit();
	};
	return (
		<div className={styles.buttonContainer}>
			<button className={`${styles.buttonColor}`} onClick={handleClick}>
				Iniciar sesión
			</button>
		</div>
	);
};

export default LoginButton;
