import styles from "./Preloader.module.css";

export default function Preloader() {
  return (
    <div className={styles.circles_preloader}>
      <div className={`${styles.circle} ${styles.circle_1}`}></div>
      <div className={`${styles.circle} ${styles.circle_2}`}></div>
      <div className={`${styles.circle} ${styles.circle_3}`}></div>
      <div className={`${styles.circle} ${styles.circle_4}`}></div>
      <div className={`${styles.circle} ${styles.circle_5}`}></div>
      <div className={`${styles.circle} ${styles.circle_6}`}></div>
    </div>
  );
}
