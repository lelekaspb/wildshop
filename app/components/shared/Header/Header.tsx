import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import Link from "next/link";
import Image from "next/image";
import { getNavigationItems } from "@/sanity/sanity-utils";
import search from "@/public/icons/search.svg";
import cart from "@/public/icons/cart.svg";
import logo from "@/public/logo/logo-merienda.svg";

export default async function Header() {
  const types = await getNavigationItems();
  return (
    <header className={styles.header}>
      <div className={styles.hamburger}>
        <MobileMenu types={types} />
      </div>

      <div className={styles.logo}>
        <Link href="/">
          <Image
            alt="Wild Orchid Professional logo"
            src={logo}
            width={125}
            height={76}
            style={{
              maxWidth: "100%",
              height: "auto",
            }}
          />
        </Link>
      </div>

      <div className={styles.desktop_navbar}>
        <DesktopMenu types={types} />
      </div>

      <div className={styles.icons}>
        <button className={styles.search_button}>
          <Image
            alt="Search icon"
            src={search}
            width={25}
            height={18}
            style={{
              maxHeight: "100%",
              width: "auto",
            }}
          />
        </button>
        <button className={styles.cart_button}>
          <Image
            alt="Cart icon"
            src={cart}
            width={18}
            height={20}
            style={{
              maxHeight: "100%",
              width: "auto",
            }}
          />
        </button>
      </div>
    </header>
  );
}
