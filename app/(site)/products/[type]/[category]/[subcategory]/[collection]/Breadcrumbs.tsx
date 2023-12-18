import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs(props: {
  typeSlug: string;
  typeTitle: string;
  categorySlug: string;
  categoryTitle: string;
  subcategorySlug: string;
  subcategoryTitle: string;
  collectionSlug: string;
  collectionTitle: string;
}) {
  const {
    typeSlug,
    typeTitle,
    categorySlug,
    categoryTitle,
    subcategorySlug,
    subcategoryTitle,
    collectionSlug,
    collectionTitle,
  }: {
    typeSlug: string;
    typeTitle: string;
    categorySlug: string;
    categoryTitle: string;
    subcategorySlug: string;
    subcategoryTitle: string;
    collectionSlug: string;
    collectionTitle: string;
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
        className={styles.link}
      >
        {categoryTitle}
      </Link>
      <span> &gt; </span>
      <Link
        href={`/products/${typeSlug}/${categorySlug}/${subcategorySlug}`}
        className={styles.link}
      >
        {subcategoryTitle}
      </Link>
      <span> &gt; </span>
      <Link
        href={`/products/${typeSlug}/${categorySlug}/${subcategorySlug}/${collectionSlug}`}
        className={styles.active_link}
      >
        {collectionTitle}
      </Link>
    </nav>
  );
}
