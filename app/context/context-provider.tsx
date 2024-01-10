"use client";

import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import { CartItem } from "@/app/client-utils/utils";

type subscribeProductStateType = {
  id: string;
  productTitle: string;
};

type contextType = {
  subscribeModalOpen: boolean;
  setSubscribeModalOpen: Dispatch<SetStateAction<boolean>>;
  subscribeProduct: subscribeProductStateType;
  setSubscribeProduct: Dispatch<SetStateAction<subscribeProductStateType>>;
  addToCartModalOpen: boolean;
  setAddToCartModalOpen: Dispatch<SetStateAction<boolean>>;
  shoppingCart: CartItem[];
  setShoppingCart: Dispatch<SetStateAction<CartItem[]>>;
};

const Context = createContext<contextType | null>(null);

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [subscribeProduct, setSubscribeProduct] = useState({
    id: "",
    productTitle: "",
  });
  const [addToCartModalOpen, setAddToCartModalOpen] = useState(false);

  const getInitialState = () => {
    const cart = localStorage.getItem("wopcart");
    return cart ? JSON.parse(cart) : [];
  };

  const [shoppingCart, setShoppingCart] = useState<CartItem[]>(getInitialState);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.setItem("wopcart", JSON.stringify(shoppingCart));
    }
  }, [shoppingCart]);

  return (
    <Context.Provider
      value={{
        subscribeModalOpen,
        setSubscribeModalOpen,
        subscribeProduct,
        setSubscribeProduct,
        addToCartModalOpen,
        setAddToCartModalOpen,
        shoppingCart,
        setShoppingCart,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useProductsContext() {
  const context = useContext(Context);
  if (!context) {
    throw new Error("useProductContext must be used within a ContextProvider");
  }
  return context;
}
