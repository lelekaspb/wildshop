import styles from "./Footer.module.css";
import { getCompanyGeneralInformation } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";

export default async function Footer() {
  const info = await getCompanyGeneralInformation();
  return (
    <footer className={styles.footer}>
      <section className={styles.general}>
        <div className={styles.copyringt}> © 2024 {process.env.SHOP_NAME}</div>
        <div className={styles.explain}>
          Denne webshop er lavet som et studieprojekt. Oplysningerne og
          produkterne her er ikke ægte.
        </div>
      </section>
      <section className={styles.details}>
        <div className={styles.address}>
          <PortableText value={info.address} />
        </div>
        <div className={styles.contact}>
          <p>Phone: {info.phone}</p>
          <p>Email: {info.email}</p>
        </div>
      </section>
    </footer>
  );
}
