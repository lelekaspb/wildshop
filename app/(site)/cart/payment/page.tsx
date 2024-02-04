import {
  createOrder,
  getCompanyGeneralInformation,
  getPaymentMethods,
} from "@/sanity/sanity-utils";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import Breadcrumbs from "./Breadcrumbs";
import styles from "./page.module.css";
import CartFooter from "@/app/components/cart/checkout/CartFooter";
import CartPaymentForm from "@/app/components/cart/checkout/CartPaymentForm";

const CartOverview = dynamic(
  () => import("@/app/components/cart/checkout/CartOverview"),
  {
    ssr: false,
  }
);

export const metadata: Metadata = {
  title: `${process.env.SHOP_NAME} | Kurv - Betaling`,
};

export default async function CartPayment() {
  const paymentMethods = await getPaymentMethods();
  const companyInfo = await getCompanyGeneralInformation();
  return (
    <div className={styles.cart_payment_page}>
      <section className={styles.bredcrumbs}>
        <Breadcrumbs />
      </section>

      <div className={styles.cart_payment_content}>
        <section className={styles.form}>
          <CartPaymentForm
            paymentMethods={paymentMethods}
            postOrder={createOrder}
          />
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
