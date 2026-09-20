"use client";

import { BASE_CURRENCY } from "@/lib/currency";
import { useCurrency } from "@/components/currency-provider";

export default function CurrencyNote() {
  const { currency, live, updatedAt } = useCurrency();

  if (currency === BASE_CURRENCY) return null;

  return (
    <p className="mt-3 text-xs text-cream/45">
      Prices shown in {currency} are converted from rupiah{" "}
      {live && updatedAt ? `at rates from ${updatedAt}` : "at an approximate rate"}. Payment is
      taken in rupiah.
    </p>
  );
}
