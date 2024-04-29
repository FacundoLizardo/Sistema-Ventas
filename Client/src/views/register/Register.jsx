import styles from "./Register.module.css";
import RegisterButton from "../../components/buttons/RegisterButoon/registerButton.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import Swal2 from "sweetalert2";
import {useNavigate} from "react-router-dom";


const Register = () => {
    const [newUserData, setUser] = useState({
        firstName: undefined,
        lastName: undefined,
        email: undefined,
        password: undefined,
        address: undefined,
        phoneNumber: undefined,
        cuit: undefined,
        enabled: true,
    });

    const nav = useNavigate();

    useEffect(() => {
        console.log(newUserData)
    }, [newUserData])

    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`/users`, {
                ...newUserData
            });
            //const newUserData = response.data.user;
            if (response.status === 200) {
                Swal2.fire({
                    title: "Gracias por registrarte, ya puedes iniciar sesion.",
                    icon: "success",
                    confirmButtonText: "Iniciar sesion",
                    customClass: {
                        popup: "mySwal",
                    },
                })
                    .then(() =>console.log(response))
                    .then(() => nav("/login"));
            }
        } catch (error) {
            window.alert(error.response.data.error);
        }
    };

//todo mensajes de error custom (esta el default: please fill out this field)
    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <p className={styles.title}>Registro de usuario</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="firstName">Nombre</label>
                        <input
                            onChange={handleChange}
                            value={newUserData.firstName}
                            type="text"
                            name="firstName"
                            id="firstName"
                            placeholder="Nombre"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="lastName">Apellido</label>
                        <input
                            onChange={handleChange}
                            value={newUserData.lastName}
                            type="text"
                            name="lastName"
                            id="lastName"
                            placeholder="Apellido"
                            required
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email">Email</label>
                        <input
                            onChange={handleChange}
                            value={newUserData.email}
                            type="email"
                            name="email"
                            id="email"
                            placeholder="ejemplo@ejemplo.com"
                            required
                        />
                    </div>
                    <div className={styles.passwordSection}>
                        <label htmlFor="password">Contraseña</label>
                        <input
                            onChange={handleChange}
                            value={newUserData.password}
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Contraseña"
                            required
                        />
                        {/*<input*/}
                        {/*    onChange={handleChange}*/}
                        {/*    value={newUserData.password}*/}
                        {/*    type="password"*/}
                        {/*    name="password2"*/}
                        {/*    id="password2"*/}
                        {/*    placeholder="Confirme la contraseña"*/}
                        {/*    required*/}
                        {/*/>*/}
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="address">Dirección</label>
                        <input
                            onChange={handleChange}
                            value={newUserData.address}
                            type="text"
                            name="address"
                            id="address"
                            placeholder="Dirección"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="phoneNumber">Número de teléfono</label>
                        <input
                            onChange={handleChange}
                            value={newUserData.phoneNumber}
                            type="text"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Número de teléfono"
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cuit">CUIT</label>
                        <input
                            onChange={handleChange}
                            value={newUserData.cuit}
                            type="text"
                            name="cuit"
                            id="cuit"
                            placeholder="CUIT"
                        />
                    </div>

                    <RegisterButton newUserData={newUserData}/>

                </form>
            </div>
        </div>
    );
};

export default Register;
