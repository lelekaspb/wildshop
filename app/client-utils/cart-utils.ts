import { Product } from "@/sanity/types/Product";
import { CartItem } from "./utils";

export const removeItem = (id: string, cart: CartItem[]) => {
  const indexOfItemToDelete = cart.findIndex(
    (elem: CartItem) => elem.id === id
  );
  const firstPart = cart.slice(0, indexOfItemToDelete);
  const secondPart = cart.slice(indexOfItemToDelete + 1, cart.length);
  const updatedShoppingCart: CartItem[] = [...firstPart, ...secondPart];

  return updatedShoppingCart;
};

export const changeAmountOfItem = (
  id: string,
  amount: number,
  cart: CartItem[]
) => {
  const indexOfItemToUpdate = cart.findIndex(
    (elem: CartItem) => elem.id === id
  );
  const firstPart = cart.slice(0, indexOfItemToUpdate);
  const lastPart = cart.slice(indexOfItemToUpdate + 1, cart.length);
  const updatedItem: CartItem = cart[indexOfItemToUpdate];
  const showWarning = amount > updatedItem.amountInStorage;
  if (amount >= 0 && !showWarning) {
    updatedItem.amountInCart = amount;
    const updatedShoppingCart: CartItem[] = [
      ...firstPart,
      updatedItem,
      ...lastPart,
    ];
    return {
      updated: true,
      cart: updatedShoppingCart,
      showWarning: showWarning,
    };
  } else {
    return {
      updated: false,
      cart: cart,
      showWarning: showWarning,
    };
  }
};

export const incrementItem = (id: string, cart: CartItem[]) => {
  const indexOfItemToIncrement = cart.findIndex(
    (elem: CartItem) => elem.id === id
  );
  const firstPart = cart.slice(0, indexOfItemToIncrement);
  const lastPart = cart.slice(indexOfItemToIncrement + 1, cart.length);
  const updatedItem: CartItem = cart[indexOfItemToIncrement];
  const showWarning =
    updatedItem.amountInCart + 1 > updatedItem.amountInStorage;
  if (!showWarning) {
    updatedItem.amountInCart++;
    const updatedShoppingCart: CartItem[] = [
      ...firstPart,
      updatedItem,
      ...lastPart,
    ];

    return {
      updated: true,
      cart: updatedShoppingCart,
      showWarning: showWarning,
    };
  } else {
    return {
      updated: true,
      cart: cart,
      showWarning: showWarning,
    };
  }
};

export const decrementItem = (id: string, cart: CartItem[]) => {
  const indexOfItemToIncrement = cart.findIndex(
    (elem: CartItem) => elem.id === id
  );
  const firstPart = cart.slice(0, indexOfItemToIncrement);
  const lastPart = cart.slice(indexOfItemToIncrement + 1, cart.length);
  const updatedItem: CartItem = cart[indexOfItemToIncrement];
  updatedItem.amountInCart--;
  const showWarning = updatedItem.amountInStorage <= updatedItem.amountInCart;

  let updatedShoppingCart = cart;
  if (updatedItem.amountInCart <= 0) {
    updatedShoppingCart = removeItem(id, cart);
  } else {
    updatedShoppingCart = [...firstPart, updatedItem, ...lastPart];
  }
  return {
    cart: updatedShoppingCart,
    showWarning: showWarning,
  };
};

export const addItem = (
  quantity: number,
  cart: CartItem[],
  product: Product,
  imageUrl: string | null
) => {
  // see if the item is already in the cart
  const itemInCartIndex = cart.findIndex(
    (elem: CartItem) => elem.id === product._id
  );

  let updatedShoppingCart = cart;

  // if the item is already in the cart, update amountInCart
  if (itemInCartIndex >= 0) {
    const updatedItem: CartItem = cart[itemInCartIndex];
    const firstPart = cart.slice(0, itemInCartIndex);
    const lastPart = cart.slice(itemInCartIndex + 1, cart.length);

    // if current amount in cart plus the quantity is not higher than the amount in storage
    const proposedQuantityInCart = updatedItem.amountInCart + quantity;
    if (updatedItem.amountInStorage >= proposedQuantityInCart) {
      updatedItem.amountInCart = proposedQuantityInCart;
      updatedShoppingCart = [...firstPart, updatedItem, ...lastPart];
    }
  } else {
    // add new item
    const cartItem: CartItem = {
      title: product.title,
      image: imageUrl,
      amountInStorage: product.amount,
      amountInCart: quantity,
      price: product.sale ? product.salePrice : product.regularPrice,
      id: product._id,
    };
    updatedShoppingCart = [...cart, cartItem];
  }
  return updatedShoppingCart;
};
