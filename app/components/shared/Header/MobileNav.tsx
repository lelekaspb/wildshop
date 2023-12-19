"use client";

import styles from "./MobileNav.module.css";
import { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import MobileMenuItem from "./MobileMenuItem";
import { ProductType } from "@/sanity/types/ProductType";

export default function MobileNav(props: {
  burgerOpen: boolean;
  setBurgerOpen: Dispatch<SetStateAction<boolean>>;
  types: ProductType[];
}) {
  const burgerOpen = props.burgerOpen;
  const setBurgerOpen = props.setBurgerOpen;
  const types = props.types;
  return (
    <nav
      className={`${styles.mobile_nav} ${
        burgerOpen ? styles.open : styles.closed
      }`}
    >
      <ul className={styles.menulist}>
        {types.map((type, index) => (
          <MobileMenuItem
            key={`nav-${index}-${type._id}`}
            type={type}
            burgerOpen={burgerOpen}
            setBurgerOpen={setBurgerOpen}
          />
        ))}
        <li key="pt-s-1" className={styles.menu_item}>
          <Link
            href="/products/new"
            className={styles.menu_item_ancor}
            onClick={() => {
              setBurgerOpen(!burgerOpen);
            }}
          >
            Ny Kollektion
          </Link>
        </li>
        <li key="pt-s-2" className={styles.menu_item}>
          <Link
            href="/products/sale"
            className={styles.menu_item_ancor}
            onClick={() => {
              setBurgerOpen(!burgerOpen);
            }}
          >
            Tilbud
          </Link>
        </li>
        <li key="c-s-3" className={styles.menu_item}>
          <Link
            href="/contact"
            className={styles.menu_item_ancor}
            onClick={() => {
              setBurgerOpen(!burgerOpen);
            }}
          >
            Kontakt
          </Link>
        </li>
      </ul>
    </nav>
  );
}
