"use client";

import styles from "./Burger.module.css";
import { Dispatch, SetStateAction } from "react";

export default function Burger(props: {
  burgerOpen: boolean;
  setBurgerOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const burgerOpen = props.burgerOpen;
  const setBurgerOpen = props.setBurgerOpen;

  return (
    <div
      className={styles.burger_wrapper}
      onClick={() => {
        setBurgerOpen(!burgerOpen);
      }}
    >
      <button className={styles.button} title="menu mobile">
        <div
          className={`${styles.line} ${
            burgerOpen ? styles.line1_open : styles.line1_closed
          }`}
        ></div>
        <div
          className={`${styles.line} ${
            burgerOpen ? styles.line2_open : styles.line2_closed
          }`}
        ></div>
        <div
          className={`${styles.line} ${
            burgerOpen ? styles.line3_open : styles.line3_closed
          }`}
        ></div>
      </button>
    </div>
  );
}
