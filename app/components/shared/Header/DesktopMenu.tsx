import styles from "./DesktopMenu.module.css";
import Link from "next/link";
import DesktopMenuItem from "./DesktopMenuItem";
import { ProductType } from "@/sanity/types/ProductType";

export default async function DesktopMenu(props: { types: ProductType[] }) {
  const types = props.types;

  // types.forEach((type) => {
  //   console.log("Type - " + type.title);
  //   type.productCategories.forEach((category) => {
  //     console.log("Category - " + category.title);
  //     if (category.productSubcategories) {
  //       category.productSubcategories.forEach((subcategory) => {
  //         console.log("Subcategory - " + subcategory.title);
  //         if (subcategory.productCollections) {
  //           subcategory.productCollections.forEach((collection) => {
  //             console.log("Collection - " + collection.title);
  //           });
  //         }
  //       });
  //     }
  //   });
  // });

  return (
    <nav className={styles.desktop_nav}>
      <ul className={styles.menulist}>
        {types.map((type) => (
          <DesktopMenuItem key={`pt-d-${type._id}`} type={type} />
        ))}
        <li key="pt-s-1" className={styles.menu_item}>
          <Link href="/products/new" className={styles.menu_item_ancor}>
            Ny Kollektion
          </Link>
        </li>
        <li key="pt-s-2" className={styles.menu_item}>
          <Link href="/products/sale" className={styles.menu_item_ancor}>
            Tilbud
          </Link>
        </li>
        <li key="c-s-3" className={styles.menu_item}>
          <Link href="/contact" className={styles.menu_item_ancor}>
            Kontakt
          </Link>
        </li>
      </ul>
    </nav>
  );
}
