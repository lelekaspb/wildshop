import { ProductCategory } from "@/sanity/types/ProductCategory";
import styles from "./MobileCategoryMenuItem.module.css";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Dispatch, SetStateAction } from "react";

export default function MobileCategoryMenuItem(props: {
  category: ProductCategory;
  typeSlug: string;
  burgerOpen: boolean;
  setBurgerOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const {
    category,
    typeSlug,
    burgerOpen,
    setBurgerOpen,
  }: {
    category: ProductCategory;
    typeSlug: string;
    burgerOpen: boolean;
    setBurgerOpen: Dispatch<SetStateAction<boolean>>;
  } = props;

  const [subcategoryListOpen, setSubcategoryListOpen] = useState(false);

  return (
    <li className={styles.category_list_item}>
      <div className={styles.ancor_wrapper}>
        <Link
          href={`/products/${typeSlug}/${category.slug}`}
          className={styles.category_list_item_ancor}
          onClick={() => {
            setBurgerOpen(!burgerOpen);
          }}
        >
          {category.title}
        </Link>
        {category.productSubcategories && (
          <Image
            alt="chevron"
            src="./../../../../icons/chevron-rounded-down.svg"
            width={14}
            height={14}
            style={{
              maxWidth: "100%",
              height: "100%",
            }}
            className={
              subcategoryListOpen ? styles.chevron_open : styles.chevron_closed
            }
            onClick={() => {
              setSubcategoryListOpen(!subcategoryListOpen);
            }}
          />
        )}
      </div>
      {category.productSubcategories && (
        <ul
          className={`${styles.subcategory_list} ${
            subcategoryListOpen ? styles.list_open : styles.list_closed
          }`}
        >
          {category.productSubcategories.map((subcategory) => (
            <li className={styles.subcategory_list_item}>
              <Link
                href={`/products/${typeSlug}/${category.slug}/${subcategory.slug}`}
                onClick={() => {
                  setBurgerOpen(!burgerOpen);
                }}
              >
                {subcategory.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
