import styles from "./LoginButton.module.css";
import axios from "axios";
import Swal2 from "sweetalert2";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import {UserContext} from "../../../context/user/userContext";

const LoginButton = ({user}) => {
    const {email, password} = user;
    const nav = useNavigate();
    const {validUser, setValidUser} = useContext(UserContext);

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

            Swal2.fire({
                title: `No se encontró el usuario con el email: ${email}`,
                icon: "error",
                confirmButtonText: "Volver a intentar",
                showDenyButton: true,
                denyButtonColor: "#3085d6",
                denyButtonText: "Registrarse",
                customClass: {
                    popup: "mySwal",
                },
            }).then((result) => {
                if (result.isConfirmed) {

                } else if (result.isDenied) {
                    nav("/register")
                }
            });
        }
    }

    const handleClick = (e) => {
        e.preventDefault();
        handleSubmit();
    };

    return (
        <div className={styles.buttonContainer}>
            <button className={`${styles.buttonColor}`} onClick={handleClick}>
                Iniciar sesión
            </button>
        </div>
    );

}

export default LoginButton;
