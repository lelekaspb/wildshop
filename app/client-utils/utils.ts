"use client";

export function validateEmail(string: string) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return string.match(emailRegex);
}

export type CartItem = {
  title: string;
  image: string | null;
  amountInStorage: number;
  amountInCart: number;
  price: number;
  id: string;
};
