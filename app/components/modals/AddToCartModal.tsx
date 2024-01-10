"use client";

import styles from "./AddToCartModal.module.css";
import { useProductsContext } from "@/app/context/context-provider";
import Image from "next/image";
import close from "@/public/icons/close.svg";
import dynamic from "next/dynamic";

const Cart = dynamic(() => import("./../cart/Cart"), { ssr: false });

export default function AddToCartModal() {
  const { addToCartModalOpen, setAddToCartModalOpen } = useProductsContext();
  return (
    <div
      className={`${styles.modal} ${
        addToCartModalOpen ? styles.modal_open : styles.modal_closed
      }`}
      onClick={() => setAddToCartModalOpen(false)}
    >
      <div className={styles.modal_overlay}></div>
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="modal_heading">
          <h3 className="modal_heading_text">Kurv</h3>
          <div
            className="modal_close_button"
            onClick={() => {
              setAddToCartModalOpen(false);
            }}
          >
            <Image
              alt="close icon"
              src={close}
              width={15}
              height={15}
              style={{
                maxWidth: "30px",
                height: "auto",
              }}
            />
          </div>
        </div>

        <div className={styles.modal_body}>
          <Cart />
        </div>
      </div>
    </div>
  );
}
