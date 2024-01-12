"use client";

import { CartItem } from "@/app/client-utils/utils";
import styles from "./CartOverviewItem.module.css";
import { useCheckoutContext } from "@/app/context/checkout-context-provider";
import Image from "next/image";
import placeholder from "@/public/placeholder/photo-on-the-way.svg";

export default function CartOverviewItem(props: { cartItem: CartItem }) {
  const { deliveryMethod } = useCheckoutContext();
  console.log(deliveryMethod);
  console.log(props.cartItem);
  return (
    <article className={styles.cart_overview_item}>
      <div className={styles.image_wrapper}>
        <Image
          alt={props.cartItem.title}
          src={props.cartItem.image ? props.cartItem.image : placeholder}
          width={100}
          height={100}
          style={{
            maxWidth: "100px",
            height: "auto",
          }}
        />
      </div>
      <div className={styles.details_wrapper}>
        <h5 className={styles.title}>{props.cartItem.title}</h5>
        <span className={styles.amount}>
          {props.cartItem.amountInCart} stk.
        </span>
      </div>
      <div className={styles.subtotal_wrapper}>
        <span>
          {(props.cartItem.amountInCart * props.cartItem.price).toFixed(2)} kr.
        </span>
      </div>
    </article>
  );
}
