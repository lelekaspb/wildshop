import Link from "next/link";
import styles from "./page.module.css";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("@/app/components/cart/Cart"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Wild Orchid Professional | Kurv",
};

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
