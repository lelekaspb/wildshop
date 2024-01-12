"use client";

import { DeliveryMethod } from "@/sanity/types/DeliveryMethod";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

type checkoutContextType = {
  deliveryModalOpen: boolean;
  setDeliveryModalOpen: Dispatch<SetStateAction<boolean>>;
  returnModalOpen: boolean;
  setReturnModalOpen: Dispatch<SetStateAction<boolean>>;
  tradeConditionsModalOpen: boolean;
  setTradeConditionsModalOpen: Dispatch<SetStateAction<boolean>>;
  deliveryMethod: DeliveryMethod | null;
  setDeliveryMethod:
    | Dispatch<SetStateAction<DeliveryMethod>>
    | Dispatch<SetStateAction<null>>;
};

export const CheckoutContext = createContext<checkoutContextType | null>(null);

export function CheckoutContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [deliveryModalOpen, setDeliveryModalOpen] = useState(false);
  const [returnModalOpen, setReturnModalOpen] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState(null);
  const [tradeConditionsModalOpen, setTradeConditionsModalOpen] =
    useState(false);

  return (
    <CheckoutContext.Provider
      value={{
        deliveryModalOpen,
        setDeliveryModalOpen,
        returnModalOpen,
        setReturnModalOpen,
        deliveryMethod,
        setDeliveryMethod,
        tradeConditionsModalOpen,
        setTradeConditionsModalOpen,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

export function useCheckoutContext() {
  const context = useContext(CheckoutContext);
  if (!context) {
    throw new Error(
      "useCheckoutContext must be used within a CheckoutContextProvider"
    );
  }
  return context;
}
