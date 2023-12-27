"use client";

import { Product } from "@/sanity/types/Product";
import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

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
};

const Context = createContext<contextType>({
  subscribeModalOpen: false,
  setSubscribeModalOpen: () => {},
  subscribeProduct: {
    id: "",
    productTitle: "",
  },
  setSubscribeProduct: () => {},
  addToCartModalOpen: false,
  setAddToCartModalOpen: () => {},
});

export function ContextProvider({ children }: { children: React.ReactNode }) {
  const [subscribeModalOpen, setSubscribeModalOpen] = useState(false);
  const [subscribeProduct, setSubscribeProduct] = useState({
    id: "",
    productTitle: "",
  });
  const [addToCartModalOpen, setAddToCartModalOpen] = useState(false);
  return (
    <Context.Provider
      value={{
        subscribeModalOpen,
        setSubscribeModalOpen,
        subscribeProduct,
        setSubscribeProduct,
        addToCartModalOpen,
        setAddToCartModalOpen,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export function useProductsContext() {
  return useContext(Context);
}
