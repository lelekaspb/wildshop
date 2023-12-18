import Link from "next/link";
import styles from "./Breadcrumbs.module.css";

export default function Breadcrumbs(props: {
  typeSlug: string;
  typeTitle: string;
}) {
  const {
    typeSlug,
    typeTitle,
  }: {
    typeSlug: string;
    typeTitle: string;
  } = props;
  return (
    <nav className={styles.breadcrumbs}>
      <Link href="/" className={styles.link}>
        Produkter
      </Link>
      <span> &gt; </span>
      <Link href={`/products/${typeSlug}`} className={styles.active_link}>
        {typeTitle}
      </Link>
    </nav>
  );
}
