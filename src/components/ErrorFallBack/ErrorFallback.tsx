import { Button } from "../Button/Button";
import styles from "./ErrorFallBack.module.css";
interface IErrorFallBack {
    error: any;
    resetErrorBoundary: any;
}
function ErrorFallBack({ error, resetErrorBoundary }: IErrorFallBack) {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1>Something went wrong </h1>
        <pre className="text-default">{error.message}</pre>
        <Button onClick={resetErrorBoundary} label="Back" />
      </div>
    </div>
  );
}

export default ErrorFallBack;