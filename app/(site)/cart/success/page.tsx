import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `${process.env.SHOP_NAME} | Kurv - Succes`,
};

export default async function CartSuccess() {
  return (
    <div className={styles.cart_success_page}>
      <section className={styles.cart_success_content}>
        <p>Tak for ordren! </p>
        <p>Du modtager faktura via e-mail i løbet af kort tid.</p>
      </section>
    </div>
  );
}
