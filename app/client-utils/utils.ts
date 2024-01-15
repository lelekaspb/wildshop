"use client";

export function validateEmail(string: string) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return string.match(emailRegex);
}

export function validateOnlyDigits(string: string) {
  const regex = new RegExp(/^\d+$/);
  return string.match(regex);
}

export function validateOnlyLetters(string: string) {
  const regex = new RegExp(/^[A-Za-z]+$/);
  return string.match(regex);
}

export type CartItem = {
  title: string;
  image: string | null;
  amountInStorage: number;
  amountInCart: number;
  price: number;
  id: string;
};
