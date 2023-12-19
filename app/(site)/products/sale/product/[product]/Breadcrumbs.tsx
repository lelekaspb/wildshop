import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs(props: {
  productSlug: string;
  productTitle: string;
}) {
  const {
    productSlug,
    productTitle,
  }: {
    productSlug: string;
    productTitle: string;
  } = props;
  return (
    <nav className={styles.breadcrumbs}>
      <Link href="/" className={styles.link}>
        Produkter
      </Link>
      <span> &gt; </span>
      <Link href={`/products/sale`} className={styles.link}>
        Tilbud
      </Link>
      <span> &gt; </span>
      <Link
        href={`/products/sale/${productSlug}/${productSlug}`}
        className={styles.active_link}
      >
        {productTitle}
      </Link>
    </nav>
  );
}
