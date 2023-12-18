import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs() {
  return (
    <nav className={styles.breadcrumbs}>
      <Link href="/" className={styles.link}>
        Produkter
      </Link>
      <span> &gt; </span>
      <Link href="/products/sale" className={styles.active_link}>
        Tilbud
      </Link>
    </nav>
  );
}
