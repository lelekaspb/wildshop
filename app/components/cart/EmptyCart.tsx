import styles from "./EmptyCart.module.css";

export default function EmptyCart() {
  return (
    <div className={styles.wrapper}>
      <h4 className={styles.text}>Du har ingen varer i kurven</h4>
    </div>
  );
}
