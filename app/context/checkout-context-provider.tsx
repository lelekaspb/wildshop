"use client";

import { DeliveryMethod } from "@/sanity/types/DeliveryMethod";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  validateEmail,
  validateOnlyDigits,
  validateOnlyLetters,
} from "@/app/client-utils/utils";
import { PaymentMethod } from "@/sanity/types/PaymentMethod";

export type ContactInfo = {
  email: string;
  phone: string;
  comment: string;
};

type InvoiceInfo = {
  name: string;
  company: string;
  address: string;
  address_line_2: string;
  zipcode: string;
  city: string;
  country: string;
};

type checkoutContextType = {
  deliveryModalOpen: boolean;
  setDeliveryModalOpen: Dispatch<SetStateAction<boolean>>;
  returnModalOpen: boolean;
  setReturnModalOpen: Dispatch<SetStateAction<boolean>>;
  tradeConditionsModalOpen: boolean;
  setTradeConditionsModalOpen: Dispatch<SetStateAction<boolean>>;
  deliveryMethod: DeliveryMethod | null;
  setDeliveryMethod: Dispatch<SetStateAction<any>>;
  paymentMethod: PaymentMethod | null;
  setPaymentMethod: Dispatch<SetStateAction<any>>;
  contactInfo: ContactInfo;
  setContactInfo: Dispatch<SetStateAction<any>>;
  invoiceInfo: InvoiceInfo;
  setInvoiceInfo: Dispatch<SetStateAction<any>>;
  agreeToTradeConditions: boolean;
  setAgreeToTradeConditions: Dispatch<SetStateAction<boolean>>;
  canSubmit: boolean;
  setCanSubmit: Dispatch<SetStateAction<boolean>>;
  clearCheckoutContext: () => void;
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
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [tradeConditionsModalOpen, setTradeConditionsModalOpen] =
    useState(false);
  const contactInfoInit: ContactInfo = {
    email: "",
    phone: "",
    comment: "",
  };
  const [contactInfo, setContactInfo] = useState<ContactInfo>(contactInfoInit);
  const invoiceInfoInit: InvoiceInfo = {
    name: "",
    company: "",
    address: "",
    address_line_2: "",
    zipcode: "",
    city: "",
    country: "Danmark",
  };
  const [invoiceInfo, setInvoiceInfo] = useState<InvoiceInfo>(invoiceInfoInit);
  const [agreeToTradeConditions, setAgreeToTradeConditions] =
    useState<boolean>(false);

  const [canSubmit, setCanSubmit] = useState<boolean>(false);

  useEffect(() => {
    if (
      validateEmail(contactInfo.email) &&
      validateOnlyDigits(contactInfo.phone) &&
      invoiceInfo.name.length > 0 &&
      invoiceInfo.address.length > 0 &&
      validateOnlyDigits(invoiceInfo.zipcode) &&
      validateOnlyLetters(invoiceInfo.city) &&
      invoiceInfo.country.length > 0 &&
      deliveryMethod &&
      paymentMethod &&
      agreeToTradeConditions
    ) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [
    contactInfo,
    invoiceInfo,
    deliveryMethod,
    paymentMethod,
    agreeToTradeConditions,
  ]);

  const clearCheckoutContext = () => {
    setDeliveryMethod(null);
    setPaymentMethod(null);
    setContactInfo({
      email: "",
      phone: "",
      comment: "",
    });
    setInvoiceInfo({
      name: "",
      company: "",
      address: "",
      address_line_2: "",
      zipcode: "",
      city: "",
      country: "Danmark",
    });
    setAgreeToTradeConditions(false);
    setCanSubmit(false);
  };

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
        contactInfo,
        setContactInfo,
        invoiceInfo,
        setInvoiceInfo,
        paymentMethod,
        setPaymentMethod,
        agreeToTradeConditions,
        setAgreeToTradeConditions,
        canSubmit,
        setCanSubmit,
        clearCheckoutContext,
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
