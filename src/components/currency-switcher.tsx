"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { CURRENCIES, CURRENCY_COOKIE } from "@/lib/currency";
import { useCurrency } from "@/components/currency-provider";

export default function CurrencySwitcher() {
  const { currency } = useCurrency();
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleChange(code: string) {
    document.cookie = `${CURRENCY_COOKIE}=${code}; path=/; max-age=31536000; samesite=lax`;
    startTransition(() => router.refresh());
  }

  return (
    <div className="relative">
      <label htmlFor="currency" className="sr-only">
        Display currency
      </label>
      <select
        id="currency"
        value={currency}
        disabled={pending}
        onChange={(e) => handleChange(e.target.value)}
        className="appearance-none rounded-full border border-steel/45 bg-transparent py-2 pl-3.5 pr-8 text-sm font-medium text-cream/80 transition hover:border-steel/80 hover:text-cream disabled:opacity-60"
      >
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code} className="bg-navy text-cream">
            {c.code}
          </option>
        ))}
      </select>
      <CaretDown
        weight="bold"
        className="pointer-events-none absolute right-3 top-1/2 h-3 w-3 -translate-y-1/2 text-cream/50"
      />
    </div>
  );
}
