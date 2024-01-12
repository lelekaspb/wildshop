import type { Metadata } from "next";
import { CheckoutContextProvider } from "@/app/context/checkout-context-provider";

export const metadata: Metadata = {
  title: "Wild Orchid Professional | Kurv",
  description: "Beauty supplies online shop",
};

export default async function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <CheckoutContextProvider>{children}</CheckoutContextProvider>
    </div>
  );
}
