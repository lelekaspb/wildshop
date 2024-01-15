"use client";

import { DeliveryMethod } from "@/sanity/types/DeliveryMethod";
import styles from "./CartDeliveryForm.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCheckoutContext } from "@/app/context/checkout-context-provider";

export default function CartDeliveryForm(props: {
  deliveryMethods: DeliveryMethod[];
}) {
  const [error, setError] = useState(false);
  const { deliveryMethod, setDeliveryMethod } = useCheckoutContext();

  const router = useRouter();

  const handleProceedFurtherClick = (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.currentTarget as typeof e.currentTarget & {
      delivery_method: { value: string };
    };

    const deliveryMethodId = target.delivery_method.value;

    if (deliveryMethodId.length > 0 && deliveryMethod != null) {
      router.push("/cart/payment");
      setError(false);
    } else {
      console.error("no delivery method has been chosen");
      setError(true);
    }
  };

  const handleOptionChange = (e: React.FormEvent<HTMLInputElement>) => {
    const deliveryMethod = props.deliveryMethods.find(
      (elem) => elem._id == e.currentTarget.value
    );
    setDeliveryMethod(deliveryMethod);
    setError(false);
  };

  return (
    <form className={styles.form} onSubmit={handleProceedFurtherClick}>
      <fieldset className={styles.list}>
        {props.deliveryMethods.map((method) => (
          <div className={styles.radio_field} key={`delivery-${method._id}`}>
            <input
              className={styles.input}
              type="radio"
              name="delivery_method"
              id={`delivery_${method.slug}`}
              value={method._id}
              onChange={handleOptionChange}
              checked={deliveryMethod?._id == method._id}
            />
            <label htmlFor={`delivery_${method.slug}`} className={styles.label}>
              {method.title}
            </label>
            <div className={styles.price}>
              {method.price == 0 ? (
                <span>Gratis</span>
              ) : (
                <span>{method.price} kr.</span>
              )}
            </div>
          </div>
        ))}

        <span
          className={`${"error_placeholder"} ${error ? "shown" : "hidden"}`}
        >
          Vælg venligst en leveringsmetode
        </span>
      </fieldset>

      <div className={styles.buttons_wrapper}>
        <Link href="/cart/info">
          <button className="secondary_button">Tilbage</button>
        </Link>

        <button className="primary_button_upper_case" type="submit">
          Fortsæt
        </button>
      </div>
    </form>
  );
}
