import Link from "next/link";
import styles from "./page.module.css";
import Cart from "@/app/components/cart/Cart";

export default async function CartPage() {
  return (
    <div className={styles.cart_page}>
      <section className={styles.heading}>
        <Link href="/" className={styles.home_link}>
          Fortsæt med at shoppe
        </Link>
      </section>
      <section className={styles.cart_section}>
        <Cart />
      </section>
    </div>
  );
}
