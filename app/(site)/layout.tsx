import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/app/components/shared/Header/Header";
import Footer from "@/app/components/shared/Footer/Footer";
import { ContextProvider } from "@/app/context/context-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Wild Orchid Professional",
  description: "Beauty supplies online shop",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="dk">
      <body suppressHydrationWarning={true} className={inter.className}>
        <ContextProvider>
          <Header />
          <main>{children}</main>
        </ContextProvider>
        <Footer />
      </body>
    </html>
  );
}
