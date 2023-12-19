import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs(props: {
  typeSlug: string;
  typeTitle: string;
  categorySlug: string;
  categoryTitle: string;
  subcategorySlug: string;
  subcategoryTitle: string;
  productSlug: string;
  productTitle: string;
}) {
  const {
    typeSlug,
    typeTitle,
    categorySlug,
    categoryTitle,
    subcategorySlug,
    subcategoryTitle,
    productSlug,
    productTitle,
  }: {
    typeSlug: string;
    typeTitle: string;
    categorySlug: string;
    categoryTitle: string;
    subcategorySlug: string;
    subcategoryTitle: string;
    productSlug: string;
    productTitle: string;
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
        href={`/products/${typeSlug}/${categorySlug}/${subcategorySlug}/${productSlug}`}
        className={styles.active_link}
      >
        {productTitle}
      </Link>
    </nav>
  );
}
