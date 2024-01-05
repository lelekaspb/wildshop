"use client";

import { Product } from "@/sanity/types/Product";
import { useProductsContext } from "@/app/context/context-provider";
import AddToCartModal from "./../../modals/AddToCartModal";
import { CartItem } from "@/app/client-utils/utils";

export default function AddToCartButton(props: {
  product: Product;
  imageUrl: string | null;
}) {
  const { setAddToCartModalOpen, shoppingCart, setShoppingCart } =
    useProductsContext();

  const addCartItem = (quantity: number) => {
    // see if the item is already in the cart
    const itemInCartIndex = shoppingCart.findIndex(
      (elem: CartItem) => elem.id === props.product._id
    );

    // if the item is already in the cart, update amountInCart
    if (itemInCartIndex > 0) {
      const updatedItem: CartItem = shoppingCart[itemInCartIndex];
      const firstPart = shoppingCart.slice(0, itemInCartIndex);
      const lastPart = shoppingCart.slice(
        itemInCartIndex + 1,
        shoppingCart.length
      );

      if (quantity > 0) {
        updatedItem.amountInCart += quantity;
        const updatedShoppingCart: CartItem[] = [
          ...firstPart,
          updatedItem,
          ...lastPart,
        ];
        setShoppingCart(updatedShoppingCart);
      }
    } else if (itemInCartIndex == 0) {
      const updatedItem: CartItem = shoppingCart[0];
      if (quantity > 0) {
        updatedItem.amountInCart += quantity;

        setShoppingCart(() => {
          return [updatedItem];
        });
      }
    } else {
      // add new item
      const cartItem: CartItem = {
        title: props.product.title,
        image: props.imageUrl,
        amountInStorage: props.product.amount,
        amountInCart: quantity,
        price: props.product.sale
          ? props.product.salePrice
          : props.product.regularPrice,
        id: props.product._id,
      };

      setShoppingCart((prevState) => {
        return [...prevState, cartItem];
      });
    }
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
      <AddToCartModal />
    </>
  );
}
