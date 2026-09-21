export const BASE_CURRENCY = "IDR";
export const CURRENCY_COOKIE = "minestack_currency";

export type Currency = {
  code: string;
  label: string;
  locale: string;
  decimals: number;
};

/**
 * Non-rupiah amounts all format under en-US so Intl disambiguates the dollar
 * currencies: USD stays "$", SGD becomes "SGD", AUD becomes "A$".
 */
export const CURRENCIES: Currency[] = [
  { code: "IDR", label: "Indonesian rupiah", locale: "id-ID", decimals: 0 },
  { code: "USD", label: "US dollar", locale: "en-US", decimals: 2 },
  { code: "EUR", label: "Euro", locale: "en-US", decimals: 2 },
  { code: "GBP", label: "British pound", locale: "en-US", decimals: 2 },
  { code: "SGD", label: "Singapore dollar", locale: "en-US", decimals: 2 },
  { code: "MYR", label: "Malaysian ringgit", locale: "en-US", decimals: 2 },
  { code: "PHP", label: "Philippine peso", locale: "en-US", decimals: 2 },
  { code: "THB", label: "Thai baht", locale: "en-US", decimals: 2 },
  { code: "AUD", label: "Australian dollar", locale: "en-US", decimals: 2 },
  { code: "JPY", label: "Japanese yen", locale: "en-US", decimals: 0 },
];

/**
 * Used only when the rates endpoint is unreachable, so prices still render.
 * Deliberately rough: the UI flags converted prices as approximate anyway.
 */
const FALLBACK_RATES: Record<string, number> = {
  IDR: 1,
  USD: 0.0000615,
  EUR: 0.0000569,
  GBP: 0.0000478,
  SGD: 0.0000799,
  MYR: 0.000262,
  PHP: 0.00355,
  THB: 0.00203,
  AUD: 0.0000937,
  JPY: 0.00934,
};

export type Rates = {
  rates: Record<string, number>;
  updatedAt: string | null;
  live: boolean;
};

export function isSupportedCurrency(code: string | undefined): code is string {
  return !!code && CURRENCIES.some((c) => c.code === code);
}

/**
 * Rates are quoted per 1 IDR, refreshed hourly. Uses the keyed ExchangeRate-API
 * endpoint when a key is configured and the free open endpoint otherwise; both
 * return the same numbers under a different field name.
 */
export async function getRates(): Promise<Rates> {
  const apiKey = process.env.EXCHANGE_RATE_API_KEY;
  const url = apiKey
    ? `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${BASE_CURRENCY}`
    : `https://open.er-api.com/v6/latest/${BASE_CURRENCY}`;

  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) throw new Error(`rates responded ${res.status}`);

    const data = await res.json();
    const table = data.conversion_rates ?? data.rates;
    if (data.result !== "success" || !table) throw new Error("unexpected rates payload");

    const rates: Record<string, number> = { IDR: 1 };
    for (const { code } of CURRENCIES) {
      rates[code] = typeof table[code] === "number" ? table[code] : FALLBACK_RATES[code];
    }

    return { rates, updatedAt: data.time_last_update_utc ?? null, live: true };
  } catch {
    return { rates: FALLBACK_RATES, updatedAt: null, live: false };
  }
}

export function formatMoney(amountInIdr: number, code: string, rate: number): string {
  const currency = CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];
  const converted = amountInIdr * rate;

  return new Intl.NumberFormat(currency.locale, {
    style: "currency",
    currency: currency.code,
    minimumFractionDigits: currency.decimals,
    maximumFractionDigits: currency.decimals,
  }).format(converted);
}
