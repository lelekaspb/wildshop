import { CartItem } from "@/app/client-utils/utils";
import styles from "./CartItemComponentForModal.module.css";
import { useProductsContext } from "@/app/context/context-provider";
import { useState } from "react";
import Image from "next/image";
import placeholder from "@/public/placeholder/photo-on-the-way.svg";
import {
  changeAmountOfItem,
  incrementItem,
  decrementItem,
} from "@/app/client-utils/cart-utils";

export default function CartItemComponentForModal(props: {
  cartItem: CartItem;
}) {
  const {
    cartItem,
  }: {
    cartItem: CartItem;
  } = props;

  const { shoppingCart, setShoppingCart } = useProductsContext();

  const [warningShown, setWarningShown] = useState(false);

  const changeAmountOfCartItem = (id: string, amount: number) => {
    const result = changeAmountOfItem(id, amount, shoppingCart);
    if (result.updated) {
      setShoppingCart(result.cart);
    }
    setWarningShown(result.showWarning);
  };

  const incrementCartItem = (id: string) => {
    const result = incrementItem(id, shoppingCart);
    if (result.updated) {
      setShoppingCart(result.cart);
    }
    setWarningShown(result.showWarning);
  };

  const decrementCartItem = (id: string) => {
    const result = decrementItem(id, shoppingCart);
    setShoppingCart(result.cart);
    setWarningShown(result.showWarning);
  };

  const handleInputChange = (
    e: React.FormEvent<HTMLInputElement>,
    id: string
  ) => {
    changeAmountOfCartItem(id, Number(e.currentTarget.value));
  };

  return (
    <article key={`cart-modal-${cartItem.id}`} className={styles.cart_item}>
      <div className={styles.image_wrapper}>
        <Image
          alt={cartItem.title}
          src={cartItem.image ? cartItem.image : placeholder}
          width={100}
          height={100}
          style={{
            maxWidth: "150px",
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
          </div>
          <div className={styles.subtotal}>
            {(cartItem.amountInCart * cartItem.price).toFixed(2)} kr
          </div>
          <div
            className={`${styles.amount_in_storage} ${
              warningShown ? styles.warning_shown : styles.warning_hidden
            }`}
          >
            <span>Kun {cartItem.amountInStorage} stk. på lager</span>
          </div>
        </div>
      </div>
    </article>
  );
}
