"use client";

import styles from "./Cart.module.css";
import { useProductsContext } from "@/app/context/context-provider";
import CartItemComponent from "./CartItemComponent";
import Link from "next/link";

export default function Cart() {
  const { shoppingCart } = useProductsContext();

  const totalPrice: number = shoppingCart.reduce(
    (total, item) => item.price * item.amountInCart + total,
    0
  );

  const cart: JSX.Element =
    shoppingCart.length > 0 ? (
      <div className={styles.cart_wrapper}>
        <div className={styles.cart_list}>
          {shoppingCart.map((cartItem) => (
            <CartItemComponent
              key={`cart-${cartItem.id}`}
              cartItem={cartItem}
            />
          ))}
        </div>
        <div className={styles.cart_checkout}>
          <div className={styles.total_price}>
            <span className={styles.price_text}> Pris i alt (incl.moms)</span>
            <span className={styles.price_number}>
              {totalPrice.toFixed(2)} kr
            </span>
          </div>
          <div className={styles.checkout_link}>
            <Link href="/cart/info">
              <button className={styles.primary_button}>check ud</button>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <div>cart is empty</div>
    );
  return cart;
}
