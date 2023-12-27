"use client";

export function ValidateEmail(string: string) {
  const emailRegex = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  return string.match(emailRegex);
}
