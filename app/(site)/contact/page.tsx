import { getCompanyGeneralInformation } from "@/sanity/sanity-utils";
import { PortableText } from "@portabletext/react";
import styles from "./page.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wild Orchid Professional | Kontakt",
};

export default async function Contact() {
  const companyInfo = await getCompanyGeneralInformation();
  return (
    <div className={styles.contact_page}>
      <section className={styles.heading}>
        <h1 className={styles.heading_text}>Kontakt</h1>
      </section>
      <section className={styles.instagram}>
        <h2 className={styles.section_heading}>Instagram</h2>
        <p className={styles.section_text}>
          Find os på Instagram under navnet {companyInfo.instagram}
        </p>
      </section>
      <section className={styles.phone}>
        <h2 className={styles.section_heading}>Telefon</h2>
        <p className={styles.section_text}>
          Ring til os på telefonnumer {companyInfo.phone}
        </p>
      </section>
      <section className={styles.email}>
        <h2 className={styles.section_heading}>Email</h2>
        <p className={styles.section_text}>
          Skriv en mail på {companyInfo.email}. Vi svarer så hurtigt som muligt.
        </p>
      </section>
      <section className={styles.address}>
        <h2 className={styles.section_heading}>Adresse</h2>
        <div className={styles.section_text}>
          <PortableText value={companyInfo.address} />
        </div>
      </section>
      <section className={styles.working_hours}>
        <h2 className={styles.section_heading}>Åbningstider</h2>
        <div className={styles.section_text}>
          <PortableText value={companyInfo.workingHours} />
        </div>
      </section>
    </div>
  );
}
