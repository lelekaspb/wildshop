"use client";

import { Product } from "@/sanity/types/Product";
import { useProductsContext } from "@/app/context/context-provider";
import AddToCartModal from "./../../modals/AddToCartModal";

export default function AddToCartButton(props: { product: Product }) {
  const { addToCartModalOpen, setAddToCartModalOpen } = useProductsContext();

  const action = () => {
    console.log("add to cart ");
  };

  return (
    <>
      <button className="primary_button" onClick={() => action()}>
        Tiføj til kurven
      </button>
      {addToCartModalOpen && (
        <AddToCartModal
          product={props.product}
          isOpen={addToCartModalOpen}
          setIsOpen={setAddToCartModalOpen}
        />
      )}
    </>
  );
}
