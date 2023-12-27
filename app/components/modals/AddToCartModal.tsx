import { Product } from "@/sanity/types/Product";
import { Dispatch, SetStateAction } from "react";

export default function AddToCartModal(props: {
  product: Product;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return <div>Add to cart modal</div>;
}
