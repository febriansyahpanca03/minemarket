"use client";

import { createContext, useContext } from "react";
import { BASE_CURRENCY, formatMoney } from "@/lib/currency";

type CurrencyContextValue = {
  currency: string;
  rate: number;
  live: boolean;
  updatedAt: string | null;
};

const CurrencyContext = createContext<CurrencyContextValue>({
  currency: BASE_CURRENCY,
  rate: 1,
  live: false,
  updatedAt: null,
});

export function CurrencyProvider({
  value,
  children,
}: {
  value: CurrencyContextValue;
  children: React.ReactNode;
}) {
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  return useContext(CurrencyContext);
}

export function useMoney() {
  const { currency, rate } = useCurrency();
  return (amountInIdr: number) => formatMoney(amountInIdr, currency, rate);
}
