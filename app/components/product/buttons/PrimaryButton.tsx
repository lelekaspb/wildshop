"use client";

import styles from "./PrimaryButton.module.css";
import { ButtonAction } from "./../utils/utils";

export default function PrimaryButton(props: {
  text: string;
  onClickAction: ButtonAction;
}) {
  const action = () => {
    if (props.onClickAction == ButtonAction.addtocart) {
      console.log("add to cart ");
    } else if (props.onClickAction == ButtonAction.signuserup) {
      console.log("sign user up");
    }
  };
  return (
    <button className={styles.primary_button} onClick={() => action()}>
      {props.text}
    </button>
  );
}
