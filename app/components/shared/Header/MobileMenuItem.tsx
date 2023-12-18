"use client";

import { ProductType } from "@/sanity/types/ProductType";
import Link from "next/link";
import { useState } from "react";
import styles from "./MobileMenuItem.module.css";
import Image from "next/image";
import MobileCategoryMenuItem from "./MobileCategoryMenuItem";
import { Dispatch, SetStateAction } from "react";

export default function MobileMenuItem(props: {
  type: ProductType;
  burgerOpen: boolean;
  setBurgerOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    type,
    burgerOpen,
    setBurgerOpen,
  }: {
    type: ProductType;
    burgerOpen: boolean;
    setBurgerOpen: Dispatch<SetStateAction<boolean>>;
  } = props;
  const [categoryListOpen, setCategoryListOpen] = useState(false);

  return (
    <li className={styles.type_list_item}>
      <div className={styles.ancor_wrapper}>
        <Link
          href={`/products/${type.slug}`}
          onClick={() => {
            setBurgerOpen(!burgerOpen);
          }}
        >
          {type.title}
        </Link>
        {type.productCategories && (
          <Image
            alt="chevron"
            src="./../../../../icons/chevron-up.svg"
            width={10}
            height={10}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
            className={
              categoryListOpen ? styles.chevron_open : styles.chevron_closed
            }
            onClick={() => {
              setCategoryListOpen(!categoryListOpen);
            }}
          />
        )}
      </div>

      {type.productCategories && (
        <ul
          className={`${styles.category_list} ${
            categoryListOpen ? styles.list_open : styles.list_closed
          }`}
        >
          {type.productCategories.map((category) => (
            <MobileCategoryMenuItem
              key={category._id}
              category={category}
              typeSlug={type.slug}
              burgerOpen={burgerOpen}
              setBurgerOpen={setBurgerOpen}
            />
          ))}
        </ul>
      )}
    </li>
  );
}
