import styles from "./Loading.module.css";

export const Loading = () => (
  <div className={styles.spinnerBox}>
    <div className={styles.circleBorder}>
      <div className={styles.circleCore}></div>
    </div>
  </div>
);
