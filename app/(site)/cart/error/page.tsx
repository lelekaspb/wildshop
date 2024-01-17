import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Wild Orchid Professional | Kurv - Succes",
};

export default async function CartError() {
  return (
    <div className={styles.cart_error_page}>
      <section className={styles.cart_error_content}>
        <p>Nonet er gald ... </p>
        <p>
          Desværre ser det ud til, at nogen har bestilt nogle af dine produkter,
          og der er ikke nok stykker på lager til din ordre.
        </p>
      </section>
    </div>
  );
}
