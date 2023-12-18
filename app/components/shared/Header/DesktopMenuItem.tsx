"use client";

import { ProductType } from "@/sanity/types/ProductType";
import styles from "./DesktopMenuItem.module.css";
import Link from "next/link";
import { useState } from "react";

export default function DesktopMenuItem(props: { type: ProductType }) {
  const type = props.type;
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseEnter = () => {
    setIsFocused(true);
  };

  const handleMouseLeave = (e: any) => {
    console.log(e.target);
    const dropdown = e.target.closest("div.dropdown_grid");
    console.log(dropdown);
    if (!dropdown) {
      setIsFocused(false);
    }
  };

  return (
    <li
      className={styles.menu_item_with_dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        href={`/products/${type.slug}`}
        className={styles.menu_item_item_ancor}
        onClick={handleMouseLeave}
        style={{ backgroundSize: isFocused ? "100% 1px" : "0% 1px" }}
      >
        {type.title}
      </Link>

      {type.productCategories &&
        type.productCategories.some(
          (element) => element.productSubcategories
        ) &&
        isFocused && (
          <div className={styles.dropdown_grid} onMouseLeave={handleMouseLeave}>
            <ul className={styles.category_list}>
              {type.productCategories.map((category) => (
                <li key={category._id} className={styles.category_item}>
                  <Link
                    href={`/products/${type.slug}/${category.slug}`}
                    onClick={handleMouseLeave}
                  >
                    {category.title}
                  </Link>
                  {category.productSubcategories && (
                    <ul className={styles.subcategory_list}>
                      {category.productSubcategories.map((subcategory) => (
                        <li
                          key={subcategory._id}
                          className={styles.subcategory_item}
                        >
                          <Link
                            href={`/products/${type.slug}/${category.slug}/${subcategory.slug}`}
                            onClick={handleMouseLeave}
                          >
                            {subcategory.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}

      {type.productCategories &&
        !type.productCategories.some(
          (element) => element.productSubcategories
        ) &&
        isFocused && (
          <div className={styles.dropdown_grid} onMouseLeave={handleMouseLeave}>
            <ul className={styles.category_list_no_subcategories}>
              {type.productCategories.map((category) => (
                <li
                  key={category._id}
                  className={styles.category_item_no_subcategories}
                >
                  <Link
                    href={`/products/${type.slug}/${category.slug}`}
                    onClick={handleMouseLeave}
                  >
                    {category.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}
