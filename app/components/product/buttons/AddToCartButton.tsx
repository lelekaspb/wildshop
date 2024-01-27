"use client";

import { Product } from "@/sanity/types/Product";
import { useProductsContext } from "@/app/context/context-provider";
import { addItem } from "@/app/client-utils/cart-utils";

export default function AddToCartButton(props: {
  product: Product;
  quantityAvailable: number;
  imageUrl: string | null;
}) {
  const { setAddToCartModalOpen, shoppingCart, setShoppingCart } =
    useProductsContext();

  const addCartItem = (quantity: number) => {
    const updatedShoppingCart = addItem(
      quantity,
      shoppingCart,
      props.product,
      props.quantityAvailable,
      props.imageUrl
    );
    setShoppingCart(updatedShoppingCart);
    setAddToCartModalOpen(true);
  };

  return (
    <>
      <button
        className="primary_button"
        onClick={() => {
          addCartItem(1);
        }}
      >
        Tiføj til kurven
      </button>
    </>
  );
}
