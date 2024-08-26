import styles from "./Button.module.css";

interface ButtonPropsParams {
  label: string;
  onClick: () => void;
  active?: boolean;
}

export const Button = ({ label, onClick, active = false }: ButtonPropsParams) => (
  <button
    onClick={onClick}
    className={styles.button}
    disabled={!active}
  >
    {label}
  </button>
);
