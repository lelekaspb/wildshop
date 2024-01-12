import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
  return (
    <nav className={styles.breadcrumbs}>
      <Link href="/cart" className={styles.link}>
        Indkøbskurv
      </Link>
      <span> &gt; </span>
      <Link href="/cart/info" className={styles.active_link}>
        Oplysninger
      </Link>
      <span> &gt; </span>
      <Link href="/cart/delivery" className={styles.link}>
        Levering
      </Link>
      <span> &gt; </span>
      <Link href="/cart/payment" className={styles.link}>
        Betaling
      </Link>
    </nav>
  );
}
