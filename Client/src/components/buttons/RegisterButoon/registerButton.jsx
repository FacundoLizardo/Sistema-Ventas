import styles from "../LoginButton/LoginButton.module.css";
// import axios from "axios";
// import Swal2 from "sweetalert2";
// import { useNavigate } from "react-router-dom";

const RegisterButton = () => {
    // const nav = useNavigate();

    // const handleSubmit = async () => {
    //     try {
    //         const response = await axios.post(`/users/`, {newUserData
    //         });
    //         //const user = response.data.user;
    //         if (response.data.success === true) {
    //             Swal2.fire({
    //                 title: "Gracias por registrarte, ya puedes iniciar sesion.",
    //                 icon: "success",
    //                 confirmButtonText: "Iniciar sesion",
    //                 customClass: {
    //                     popup: "mySwal",
    //                 },
    //             })
    //                 .then(() => nav("/login"));
    //         }
    //     } catch (error) {
    //
    //         window.alert(error.response.data.error);
    //     }
    // };
    //
    // const handleClick = (e) => {
    //     e.preventDefault();
    //     handleSubmit();
    // };
    return (
        <div className={styles.buttonContainer}>
            <button className={`${styles.buttonColor}`} type={"submit"}>
                Registrarse
            </button>
        </div>
    );
};

export default RegisterButton;
