"use client";

import cart from "@/public/icons/cart.svg";
import styles from "./Header.module.css";
import { useProductsContext } from "@/app/context/context-provider";
import Link from "next/link";
import Image from "next/image";

export default function CartButton() {
  const { shoppingCart } = useProductsContext();
  return (
    <button
      className={`${styles.cart_button} ${
        shoppingCart.length > 0 ? styles.cart_with_items : ""
      } `}
    >
      <Link href="/cart">
        <Image
          alt="Cart icon"
          src={cart}
          width={18}
          height={20}
          style={{
            maxHeight: "100%",
            maxWidth: "auto",
          }}
        />
      </Link>
    </button>
  );
}
