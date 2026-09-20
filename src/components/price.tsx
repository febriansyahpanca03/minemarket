"use client";

import { useMoney } from "@/components/currency-provider";

export default function Price({
  amount,
  className,
}: {
  amount: number;
  className?: string;
}) {
  const money = useMoney();
  return <span className={className}>{money(amount)}</span>;
}
