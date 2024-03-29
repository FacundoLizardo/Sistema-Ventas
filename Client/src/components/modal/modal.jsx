import styles from "./modal.module.css";
import { CgClose } from "react-icons/cg";
import React, {useState} from "react";

export  const ModalContext = React.createContext(<function/>)
const Modal = ({ children, buttonText }) => {
    const [isOpen, setIsOpen] = useState(false)

    const openModal =()=>{
        setIsOpen(true)
        const body = document.querySelector("body");
        body.style.overflow = "hidden";
    }

    const closeModal = () => {
        const modal = document.querySelector('#modal');
        const body = document.querySelector("body");
        body.style.overflow = "scroll";
        modal.className = styles.modalContentClose
        setTimeout(() => {
            setIsOpen(false);
        }, 200);
    };


    return (
        <ModalContext.Provider  value={closeModal} >
        <div className={ styles.container}>
        <button className={styles.openModal}
        onClick={openModal}>
            {buttonText}
        </button>

            {isOpen && (
                <div className={styles.modal}
                     onClick={closeModal}>

                    <div className={styles.modalContent}
                         id={"modal"}
                         onClick={(e) => e.stopPropagation()}>
                        <div className={styles.buttonContainer}>
                            <button onClick={closeModal} className={styles.closeButton}>
                                <CgClose/>
                            </button>
                        </div>
                        <div className={styles.children}>

                                {children}


                        </div>

                    </div>
                </div>
            )}

        </div>
        </ModalContext.Provider>
    );
};

export default Modal;



