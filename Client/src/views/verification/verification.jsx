import {useEffect, useState} from 'react';
import style from "./verification.module.css";
import axios from "axios";
import ButtonOne from "../../components/buttons/ButtonOne/ButtonOne.jsx";

function VerifyUserEmail() {
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState({
        error: false,
        alreadyVerified: false,
        invalidToken: false,
        invalidUser: false,
    });

    useEffect(() => {
        const handleVerification = async () => {
            try {
                const url = window.location.href;
                const token = url.substring(url.lastIndexOf('/') + 1);

                const response = await axios.post(`/users/confirm/${token}`);

                if (response.data.success) {
                    setIsVerified(true);
                }
            } catch (error) {
                console.log("en el catch",error)
                if (error.response.data.message === 'user already verified') {
                    setError(prevState => ({
                        ...prevState,
                        alreadyVerified: true
                    }));
                } else if (error.response.data.message === 'invalid token') {
                    setError(prevState => ({
                        ...prevState,
                        invalidToken: true,
                    }));
                } else if (error.response.data.message === 'user not found') {
                    setError(prevState => ({
                        ...prevState,
                        invalidUser: true,
                    }));
                }else setError(prevState => ({
                    ...prevState,
                    error: true,
                }));
            }
        };

        handleVerification();
    }, []);

    function renderVerificationMessage() {
        if (error.error) {
            return <h1>Ocurrió un error</h1>;
        } else if (error.alreadyVerified) {
            return <h1>Esta cuenta ya ha sido verificada.</h1>;
        } else if (error.invalidToken) {
            return <h1>Token inválido, vuelva a intentarlo.</h1>;
        } else if (error.invalidUser) {
            return <h1>Usuario no válido, vuelva a intentarlo.</h1>;
        } else if (isVerified) {
            return <h1>¡Tu email fue verificado exitosamente!</h1>;
        } else {
            return <h1>Estamos verificando tu email...</h1>;
        }
    }
//todo cambiar url por la del deploy
    return (
        <div className={style.verificationContainer}>
            <div className={style.background}>
                {renderVerificationMessage()}
                <div className={style.buttonSection}>
                    <ButtonOne text={<a href="http://localhost:5173/">Ir al inicio</a>}></ButtonOne>
                </div>
            </div>


        </div>
    );
}

export default VerifyUserEmail;
