import styles from "./page.module.css";
import { Metadata } from "next";
import Breadcrumbs from "./Breadcrumbs";
import CartInfoForm from "@/app/components/cart/checkout/CartInfoForm";
import dynamic from "next/dynamic";
import CartFooter from "@/app/components/cart/checkout/CartFooter";
import { getCompanyGeneralInformation } from "@/sanity/sanity-utils";

const CartOverview = dynamic(
  () => import("@/app/components/cart/checkout/CartOverview"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Wild Orchid Professional | Kurv - Oplysninger",
};

export default async function CartInfo() {
  const companyInfo = await getCompanyGeneralInformation();
  return (
    <div className={styles.cart_info_page}>
      <section className={styles.bredcrumbs}>
        <Breadcrumbs />
      </section>

      <div className={styles.cart_info_content}>
        <section className={styles.form}>
          <CartInfoForm />
        </section>

        <section className={styles.overview}>
          <CartOverview />
        </section>

        <section className={styles.footer}>
          <CartFooter
            deliveryInfo={companyInfo.deliveryInfo}
            returnInfo={companyInfo.returnInfo}
            tradeConditionsInfo={companyInfo.tradeConditions}
          />
        </section>
      </div>
    </div>
  );
}
