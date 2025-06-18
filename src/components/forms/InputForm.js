import styles from "./InputForm.module.css";

function InputForm({ name, text, placeholder, value, type, handleOnChange }) {
  return (
    <div className={styles.form_control}>
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
}

export default InputForm;
