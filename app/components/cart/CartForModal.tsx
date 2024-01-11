"use client";

import styles from "./CartForModal.module.css";
import { useProductsContext } from "@/app/context/context-provider";
import CartItemComponentForModal from "./CartItemComponentForModal";
import EmptyCart from "./EmptyCart";
import Link from "next/link";

import dynamic from "next/dynamic";

const TotalPrice = dynamic(() => import("@/app/components/cart/TotalPrice"), {
  ssr: false,
});

export default function CartForModal() {
  const { shoppingCart } = useProductsContext();

  const cart: JSX.Element =
    shoppingCart.length > 0 ? (
      <div className={styles.cart_wrapper}>
        <div className={styles.cart_list}>
          {shoppingCart.map((cartItem) => (
            <CartItemComponentForModal
              key={`cart-modal-${cartItem.id}`}
              cartItem={cartItem}
            />
          ))}
        </div>
        <div className={styles.cart_checkout}>
          <TotalPrice />
          <div className={styles.checkout_link}>
            <Link href="/cart/info">
              <button className={styles.primary_button}>check ud</button>
            </Link>
          </div>
        </div>
      </div>
    ) : (
      <EmptyCart />
    );
  return cart;
}
