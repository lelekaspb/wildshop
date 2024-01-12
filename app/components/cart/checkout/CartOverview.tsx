"use client";

import { useProductsContext } from "@/app/context/context-provider";
import styles from "./CartOverview.module.css";
import CartOverviewItem from "./CartOverviewItem";
import { useCheckoutContext } from "@/app/context/checkout-context-provider";

export default function CartOverview() {
  const { shoppingCart } = useProductsContext();
  const { deliveryMethod } = useCheckoutContext();

  let totalPrice: number = shoppingCart.reduce(
    (total, item) => item.price * item.amountInCart + total,
    0
  );
  if (deliveryMethod) {
    totalPrice += deliveryMethod.price;
  }

  return (
    <section className={styles.cart_overview}>
      <div className={styles.cart_overview_list}>
        {shoppingCart.map((cartItem) => (
          <CartOverviewItem
            key={`cart-overview-${cartItem.id}`}
            cartItem={cartItem}
          />
        ))}

        {deliveryMethod && (
          <article className={styles.delivery_method}>
            <div className={styles.delivery_method_title}>
              {deliveryMethod.title}
            </div>
            <div className={styles.delivery_method_price}>
              {deliveryMethod.price.toFixed(2)} kr.
            </div>
          </article>
        )}
      </div>
      <div className={styles.total_price_wrapper}>
        <span className={styles.price_text}> Pris i alt (incl.moms)</span>
        <span className={styles.price_number}>{totalPrice.toFixed(2)} kr.</span>
      </div>
    </section>
  );
}
