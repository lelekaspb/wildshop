"use client";

import styles from "./TotalPrice.module.css";
import { useProductsContext } from "@/app/context/context-provider";

export default function TotalPrice() {
  const { shoppingCart } = useProductsContext();
  const totalPrice: number = shoppingCart.reduce(
    (total, item) => item.price * item.amountInCart + total,
    0
  );

  return (
    <div className={styles.total_price}>
      <span className={styles.price_text}> Pris i alt (incl.moms)</span>
      <span className={styles.price_number}>{totalPrice.toFixed(2)} kr</span>
    </div>
  );
}
