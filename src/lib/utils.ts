import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function computeUpfrontCost(rent: number, deposit: number, brokerage: number): number {
  return rent + deposit + brokerage;
}

export function getWhatsAppUrl(referenceId: string, title: string): string {
  const phone = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";
  if (!phone) return "#";
  const message = encodeURIComponent(
    `Hi, I'm interested in the property ${referenceId} — "${title}" listed on HomeHop. Could you share more details?`
  );
  return `https://wa.me/${phone}?text=${message}`;
}
