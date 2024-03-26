import styles from "./input.module.css"

const Input = ({
                   children,
                   placeholder,
                   id,
                   name,
                   label,
                   type,
                   required,
                   value,
                   handleChange

               }) => {
    return (
        <div className={styles.inputContainer}>
            <label
            >
                {label}
            </label>
            <div className={styles.input}>
                {children && children}
                <input
                    id={id}
                    type={type}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    required={required}
                    onChange={handleChange}
                />

            </div>
        </div>
    )
}

export default Input;