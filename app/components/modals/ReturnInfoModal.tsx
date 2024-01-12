"use client";

import styles from "./CheckoutInfoModal.module.css";
import { useCheckoutContext } from "@/app/context/checkout-context-provider";
import Image from "next/image";
import close from "@/public/icons/close.svg";
import { PortableTextBlock } from "sanity";
import { PortableText } from "@portabletext/react";

export default function ReturnInfoModal(props: {
  bodyText: [PortableTextBlock];
}) {
  const { returnModalOpen, setReturnModalOpen } = useCheckoutContext();
  return (
    <div
      className={`${styles.modal} ${
        returnModalOpen ? styles.modal_open : styles.modal_closed
      }`}
      onClick={() => setReturnModalOpen(false)}
    >
      <div className={styles.modal_overlay}></div>
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.modal_heading}>
          <h3 className={styles.modal_heading_text}>Returoplysninger</h3>
          <div
            className={styles.modal_close_button}
            onClick={() => {
              setReturnModalOpen(false);
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

        <div className={`${styles.modal_body} rich_text`}>
          <PortableText value={props.bodyText} />
        </div>
      </div>
    </div>
  );
}
