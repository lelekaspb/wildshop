"use client";

import { useCheckoutContext } from "@/app/context/checkout-context-provider";
import { PaymentMethod } from "@/sanity/types/PaymentMethod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./CartPaymentForm.module.css";
import Link from "next/link";
import { CreateOrder } from "@/sanity/types/CreateOrder";
import { CreateInvoiceInfo } from "@/sanity/types/CreateInvoiceInfo";
import { useProductsContext } from "@/app/context/context-provider";
import { DeliveryMethod } from "@/sanity/types/DeliveryMethod";
import { CartItem } from "@/app/client-utils/utils";

export default function CartPaymentForm(props: {
  paymentMethods: PaymentMethod[];
  postOrder: (
    createInvoiceInfo: CreateInvoiceInfo,
    createOrderInfo: CreateOrder,
    deliveryMethod: DeliveryMethod,
    paymentMethod: PaymentMethod,
    shoppingCart: CartItem[]
  ) => { success: boolean; message: string };
}) {
  const [methodError, setMethodError] = useState(false);
  const [tradeConditionsError, setTradeConditionsError] = useState(false);
  const {
    paymentMethod,
    setPaymentMethod,
    agreeToTradeConditions,
    setAgreeToTradeConditions,
    setTradeConditionsModalOpen,
    canSubmit,
    contactInfo,
    invoiceInfo,
    deliveryMethod,
    clearCheckoutContext,
  } = useCheckoutContext();

  const { shoppingCart, clearShoppingCart } = useProductsContext();

  const router = useRouter();

  const handleProceedFurtherClick = async (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: run query for every shopping cart item to make sure that we have enough to sell
    // in case information in local storage is outdated
    // if not, show which item cannot be ordered

    const target = e.currentTarget as typeof e.currentTarget & {
      payment_method: { value: string };
      trade_conditions: { value: string };
    };

    const paymentRadio = target.payment_method as HTMLInputElement;

    const agreementCheckbox = target.trade_conditions as HTMLInputElement;

    if (paymentRadio.checked && agreementCheckbox.checked) {
      console.log(canSubmit);
      const createOrderInfo: CreateOrder = {
        _type: "order",
        customerEmail: contactInfo.email,
        customerPhone: contactInfo.phone,
        comment: contactInfo.comment,
      };
      const createInvoiceInfo: CreateInvoiceInfo = {
        _type: "invoiceInfo",
        customerName: invoiceInfo.name,
        company: invoiceInfo.company,
        address: invoiceInfo.address,
        addressLineTwo: invoiceInfo.address_line_2,
        zipcode: invoiceInfo.zipcode,
        city: invoiceInfo.city,
        country: invoiceInfo.country,
      };

      if (canSubmit && deliveryMethod && paymentMethod) {
        // send post request via server action
        const response: any = await props.postOrder(
          createInvoiceInfo,
          createOrderInfo,
          deliveryMethod,
          paymentMethod,
          shoppingCart
        );
        console.log(response);

        if (response.success) {
          if (typeof window !== "undefined" && window.localStorage) {
            localStorage.removeItem("wopcart");
          }
          clearShoppingCart();
          clearCheckoutContext();
          router.push("/cart/success");
        } else {
          router.push("/cart/error");
        }
      } else {
        // show error saying that on previous steps info missing
        console.error(
          "some fields from information or delivery steps are missing."
        );
      }

      setMethodError(false);
      setTradeConditionsError(false);
    } else {
      if (!agreementCheckbox.checked) {
        console.error("the agreement checkbox is not checked");
        setTradeConditionsError(true);
      }
      if (!paymentRadio.checked) {
        console.error("no payment method has been chosen");
        setMethodError(true);
      }
    }
  };

  const handleRadioChange = (e: React.FormEvent<HTMLInputElement>) => {
    const paymentMethod = props.paymentMethods.find(
      (elem) => elem._id == e.currentTarget.value
    );
    setPaymentMethod(paymentMethod);
    setMethodError(false);
  };

  const handleCheckboxChange = (e: React.FormEvent<HTMLInputElement>) => {
    setAgreeToTradeConditions(!agreeToTradeConditions);
    setTradeConditionsError(!e.currentTarget.checked);
  };

  return (
    <form className={styles.form} onSubmit={handleProceedFurtherClick}>
      <fieldset className={styles.list}>
        {props.paymentMethods.map((method) => (
          <div className={styles.radio_field} key={`payment-${method._id}`}>
            <input
              className={styles.input}
              type="radio"
              name="payment_method"
              id={`payment_${method.slug}`}
              value={method._id}
              onChange={handleRadioChange}
              checked={paymentMethod?._id == method._id}
            />
            <label htmlFor={`payment_${method.slug}`} className={styles.label}>
              {method.title}
            </label>
          </div>
        ))}

        <span
          className={`${"error_placeholder"} ${
            methodError ? "shown" : "hidden"
          }`}
        >
          Vælg venligst en betalingsmetode
        </span>
      </fieldset>

      <fieldset className={styles.trade_conditions_fieldset}>
        <div className={styles.checkbox_field}>
          <input
            className={styles.checkbox}
            type="checkbox"
            name="trade_conditions"
            id="trade_conditions"
            value="yes"
            onChange={handleCheckboxChange}
            checked={agreeToTradeConditions}
          />
          <label htmlFor="trade_conditions" className={styles.label}>
            <button
              type="button"
              className={styles.link}
              onClick={() => {
                setTradeConditionsModalOpen(true);
              }}
            >
              Jeg har læst og accepterer handelsbetingelse
            </button>
          </label>
        </div>
        <span
          className={`${"error_placeholder"} ${
            tradeConditionsError ? "shown" : "hidden"
          }`}
        >
          Læs venligst og accepter vores handelsbetingelser
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
