"use client";

import styles from "./SubscribeModal.module.css";
import { Product } from "@/sanity/types/Product";
import { Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import close from "@/public/icons/close.svg";
import { CreateNotification } from "@/sanity/types/CreateNotification";
import { SanityDocumentStub } from "next-sanity";
import { useProductsContext } from "@/app/context/context-provider";
import { validateEmail } from "@/app/client-utils/utils";

export default function SubscribeModal(props: {
  product: Product;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  gibberer: (data: SanityDocumentStub<CreateNotification>) => Promise<any>;
}) {
  const { subscribeModalOpen, setSubscribeModalOpen, subscribeProduct } =
    useProductsContext();

  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
  const [errorResponse, setSrrorResponse] = useState(false);

  const handleClick = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validateEmail(email)) {
      const result = await props.gibberer({
        _type: "notification",
        customerEmail: email,
        productId: subscribeProduct.id,
      });
      setSuccess(result.success);
      setSrrorResponse(!result.success);
      setError(false);
      setEmail("");
    } else {
      setError(true);
    }
  };

  const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };

  const handleInputBlur = () => {
    setError(!validateEmail(email));
  };

  const modal: JSX.Element = (
    <div
      className={`${styles.modal} ${
        subscribeModalOpen ? styles.modal_open : styles.modal_closed
      }`}
      onClick={() => setSubscribeModalOpen(false)}
    >
      <div className={styles.modal_overlay}></div>
      <div
        className={styles.content}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className={styles.modal_heading}>
          <h3 className={styles.modal_heading_text}>Skriv mig op</h3>
          <div
            className={styles.modal_close_button}
            onClick={() => {
              props.setIsOpen(false);
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
          <p className={styles.modal_product_title}>
            Du er ved at skriv sig op til{" "}
            <strong>{subscribeProduct.productTitle}</strong>
          </p>
          <p className={styles.modal_form_intro}>
            Indtast din e-mail, så kontakter vi dig når varen igen er på lager
          </p>
        </div>

        <form className={styles.form}>
          <div className="form_field">
            <label htmlFor="user_email">
              E-mail <span className="required_star">*</span>
            </label>
            <input
              type="email"
              name="user_email"
              id="user_email"
              className="form_input"
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              value={email}
            />
            <span
              className={`${"error_placeholder"} ${error ? "shown" : "hidden"}`}
            >
              Angiv venligst en gyldig e-mail
            </span>
          </div>
          <div className="submit_form_field">
            <button
              type="button"
              className={`${"primary_button"} ${styles.button}`}
              onClick={handleClick}
              disabled={error || success}
            >
              Sende
            </button>
          </div>
        </form>

        <div className={styles.warning}>
          <p>
            * &nbsp; Bemærk at nogle varer disværre ikke kommer på lager igen.
            Din forespørgsel gemmes i 3 måneder, hvorefter den automatisk
            slettes.
          </p>
        </div>

        <div
          className={`${styles.success_message} ${
            success ? styles.message_shown : styles.message_hidden
          }`}
        >
          Du er nu skrevet op
        </div>

        <div
          className={`${styles.error_message} ${
            errorResponse ? styles.message_shown : styles.message_hidden
          }`}
        >
          Der er nogen galt, prov igen senere
        </div>
      </div>
    </div>
  );

  return modal;
}
