import styles from "./checkboxInput.module.css"

const CheckboxInput = ({children, id, name, required, label, value, handleChange}) => {
    return (
        <div className={styles.container}>
            <div className={styles.inputContainer}>
                <input id={id}
                       type={"checkbox"}
                       name={name}
                       required={required}
                       value={value}
                       onChange={handleChange}/>
                {children && children}
                <label>{label}</label>
            </div>
        </div>

    )
}

export default CheckboxInput;