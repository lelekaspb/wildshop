"use client";

import styles from "./CartItemComponent.module.css";
import { CartItem } from "@/app/client-utils/utils";
import Image from "next/image";
import placeholder from "@/public/placeholder/photo-on-the-way.svg";
import { useState } from "react";
import { useProductsContext } from "@/app/context/context-provider";

export default function CartItemComponent(props: { cartItem: CartItem }) {
  const {
    cartItem,
  }: {
    cartItem: CartItem;
  } = props;

  const { shoppingCart, setShoppingCart } = useProductsContext();

  const [warningShown, setWarningShown] = useState(false);

  const removeCartItem = (id: string) => {
    const indexOfItemToDelete = shoppingCart.findIndex(
      (elem: CartItem) => elem.id === id
    );
    const firstPart = shoppingCart.slice(0, indexOfItemToDelete);
    const secondPart = shoppingCart.slice(
      indexOfItemToDelete + 1,
      shoppingCart.length
    );
    const updatedShoppingCart: CartItem[] = [...firstPart, ...secondPart];
    setShoppingCart(updatedShoppingCart);
  };

  const changeAmountOfCartItem = (id: string, amount: number) => {
    const indexOfItemToUpdate = shoppingCart.findIndex(
      (elem: CartItem) => elem.id === id
    );
    const firstPart = shoppingCart.slice(0, indexOfItemToUpdate);
    const lastPart = shoppingCart.slice(
      indexOfItemToUpdate + 1,
      shoppingCart.length
    );
    const updatedItem: CartItem = shoppingCart[indexOfItemToUpdate];
    if (amount >= 0 && amount <= updatedItem.amountInStorage) {
      updatedItem.amountInCart = amount;
      const updatedShoppingCart: CartItem[] = [
        ...firstPart,
        updatedItem,
        ...lastPart,
      ];
      setShoppingCart(updatedShoppingCart);
      setWarningShown(false);
    } else {
      setWarningShown(true);
    }
  };

  const incrementCartItem = (id: string) => {
    const indexOfItemToIncrement = shoppingCart.findIndex(
      (elem: CartItem) => elem.id === id
    );
    const firstPart = shoppingCart.slice(0, indexOfItemToIncrement);
    const lastPart = shoppingCart.slice(
      indexOfItemToIncrement + 1,
      shoppingCart.length
    );
    const updatedItem: CartItem = shoppingCart[indexOfItemToIncrement];
    if (updatedItem.amountInCart + 1 <= updatedItem.amountInStorage) {
      updatedItem.amountInCart++;
      const updatedShoppingCart: CartItem[] = [
        ...firstPart,
        updatedItem,
        ...lastPart,
      ];
      setShoppingCart(updatedShoppingCart);
    } else {
      setWarningShown(true);
    }
  };

  const decrementCartItem = (id: string) => {
    const indexOfItemToIncrement = shoppingCart.findIndex(
      (elem: CartItem) => elem.id === id
    );
    const firstPart = shoppingCart.slice(0, indexOfItemToIncrement);
    const lastPart = shoppingCart.slice(
      indexOfItemToIncrement + 1,
      shoppingCart.length
    );
    const updatedItem: CartItem = shoppingCart[indexOfItemToIncrement];
    updatedItem.amountInCart--;
    if (updatedItem.amountInStorage > updatedItem.amountInCart) {
      setWarningShown(false);
    }
    if (updatedItem.amountInCart <= 0) {
      removeCartItem(id);
    } else {
      const updatedShoppingCart: CartItem[] = [
        ...firstPart,
        updatedItem,
        ...lastPart,
      ];
      setShoppingCart(updatedShoppingCart);
    }
  };

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    id: string
  ) => {
    changeAmountOfCartItem(id, Number(e.currentTarget.value));
  };

  return (
    <article key={`cart-${cartItem.id}`} className={styles.cart_item}>
      <div className={styles.image_wrapper}>
        <Image
          alt={cartItem.title}
          src={cartItem.image ? cartItem.image : placeholder}
          width={200}
          height={200}
          style={{
            maxWidth: "100%",
            height: "auto",
          }}
        />
      </div>
      <div className={styles.details}>
        <div className={styles.title_wrapper}>
          <h4 className={styles.title}>{cartItem.title}</h4>
        </div>
        <div className={styles.price_info}>
          <div className={styles.amount_wrapper}>
            <div className={styles.amount_line_1}>
              <button
                className={styles.decrement}
                onClick={() => {
                  decrementCartItem(cartItem.id);
                }}
              >
                -
              </button>
              <div className={styles.amount_in_cart}>
                <input
                  className={styles.amount_in_cart_input}
                  type="number"
                  min={0}
                  max={10}
                  name="amount"
                  value={cartItem.amountInCart}
                  onChange={(e) => {
                    handleInputChange(e, cartItem.id);
                  }}
                />
              </div>
              <button
                className={`${styles.increment} ${
                  warningShown ? styles.button_disabled : ""
                }`}
                onClick={() => {
                  incrementCartItem(cartItem.id);
                }}
              >
                +
              </button>
            </div>
            <div
              className={`${styles.amount_in_storage} ${
                warningShown ? styles.warning_shown : styles.warning_hidden
              }`}
            >
              <span>Kun {cartItem.amountInStorage} stk. på lager</span>
            </div>
          </div>
          <div className={styles.subtotal}>
            {(cartItem.amountInCart * cartItem.price).toFixed(2)} kr
          </div>
        </div>
      </div>
    </article>
  );
}
