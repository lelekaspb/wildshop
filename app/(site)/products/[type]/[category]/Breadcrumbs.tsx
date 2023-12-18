import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs(props: {
  typeSlug: string;
  typeTitle: string;
  categorySlug: string;
  categoryTitle: string;
}) {
  const {
    typeSlug,
    typeTitle,
    categorySlug,
    categoryTitle,
  }: {
    typeSlug: string;
    typeTitle: string;
    categorySlug: string;
    categoryTitle: string;
  } = props;
  return (
    <nav className={styles.breadcrumbs}>
      <Link href="/" className={styles.link}>
        Produkter
      </Link>
      <span> &gt; </span>
      <Link href={`/products/${typeSlug}`} className={styles.link}>
        {typeTitle}
      </Link>
      <span> &gt; </span>
      <Link
        href={`/products/${typeSlug}/${categorySlug}`}
        className={styles.active_link}
      >
        {categoryTitle}
      </Link>
    </nav>
  );
}
