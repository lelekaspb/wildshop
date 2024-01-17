import styles from "./Header.module.css";
import MobileMenu from "./MobileMenu";
import DesktopMenu from "./DesktopMenu";
import Link from "next/link";
import Image from "next/image";
import { getNavigationItems } from "@/sanity/sanity-utils";
import search from "@/public/icons/search.svg";

import logo from "@/public/logo/logo-merienda.svg";
import dynamic from "next/dynamic";

const CartButton = dynamic(() => import("./CartButton"), { ssr: false });

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
              maxHeight: "auto",
            }}
            priority={true}
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
              maxWidth: "auto",
            }}
          />
        </button>
        <CartButton />
      </div>
    </header>
  );
}
