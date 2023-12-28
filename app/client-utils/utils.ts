"use client";

export function validateEmail(string: string) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return string.match(emailRegex);
}
