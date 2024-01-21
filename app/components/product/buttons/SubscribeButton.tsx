"use client";

import { Product } from "@/sanity/types/Product";

import { useProductsContext } from "@/app/context/context-provider";

export default function SubscribeButton(props: { product: Product }) {
  const { setSubscribeModalOpen, setSubscribeProduct } = useProductsContext();

  const action = () => {
    setSubscribeModalOpen(true);
    setSubscribeProduct({
      id: props.product._id,
      productTitle: props.product.title,
    });
  };
  return (
    <>
      <button className="primary_button" onClick={() => action()}>
        Skriv mig op
      </button>
    </>
  );
}
