import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `${process.env.SHOP_NAME} | Kurv - Error`,
};

export default async function CartError() {
  return (
    <div className={styles.cart_error_page}>
      <section className={styles.cart_error_content}>
        <p>Nonet er gald ... </p>
        <p>Prøv igen senere.</p>
      </section>
    </div>
  );
}
