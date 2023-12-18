"use client";

import { useState } from "react";
import Burger from "./Burger";
import MobileNav from "./MobileNav";
import { ProductType } from "@/sanity/types/ProductType";

export default function MobileMenu(props: { types: ProductType[] }) {
  const types = props.types;
  const [burgerOpen, setBurgerOpen] = useState(false);
  return (
    <>
      <Burger burgerOpen={burgerOpen} setBurgerOpen={setBurgerOpen} />
      <MobileNav
        burgerOpen={burgerOpen}
        setBurgerOpen={setBurgerOpen}
        types={types}
      />
    </>
  );
}
