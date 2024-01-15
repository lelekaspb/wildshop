import styles from "./page.module.css";
import { Metadata } from "next";
import {
  getCompanyGeneralInformation,
  getDeliveryMethods,
} from "@/sanity/sanity-utils";
import Breadcrumbs from "./Breadcrumbs";
import CartFooter from "@/app/components/cart/checkout/CartFooter";
import CartDeliveryForm from "@/app/components/cart/checkout/CartDeliveryForm";
import dynamic from "next/dynamic";

const CartOverview = dynamic(
  () => import("@/app/components/cart/checkout/CartOverview"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: "Wild Orchid Professional | Kurv - Levering",
};

export default async function CartDelivery() {
  const deliveryMethods = await getDeliveryMethods();
  const companyInfo = await getCompanyGeneralInformation();

  return (
    <div className={styles.cart_delivery_page}>
      <section className={styles.bredcrumbs}>
        <Breadcrumbs />
      </section>

      <div className={styles.cart_delivery_content}>
        <section className={styles.form}>
          <CartDeliveryForm deliveryMethods={deliveryMethods} />
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
