"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { PortfolioHoldingRow } from "@/lib/services/portfolio";
import {
  formatCompactUsd,
  formatPercent,
  formatUsd,
  percentClass,
} from "@/lib/utils/currency";

type PortfolioHoldingsProps = {
  holdings: PortfolioHoldingRow[];
};

export function PortfolioHoldings({ holdings }: PortfolioHoldingsProps) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function handleDelete(holdingId: string) {
    setDeletingId(holdingId);

    try {
      const res = await fetch(`/api/portfolio/holdings/${holdingId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh();
      }
    } finally {
      setDeletingId(null);
    }
  }

  if (holdings.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-zinc-300 px-5 py-10 text-center dark:border-zinc-700">
        <p className="font-medium text-zinc-900 dark:text-zinc-100">No holdings yet</p>
        <p className="mt-1 text-sm text-zinc-500">
          Add a coin above to start tracking your portfolio value.
        </p>
      </section>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
              <th className="px-4 py-3 font-medium">Coin</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium text-right">Price</th>
              <th className="px-4 py-3 font-medium text-right">24h</th>
              <th className="px-4 py-3 font-medium text-right">Value</th>
              <th className="px-4 py-3 font-medium text-right"> </th>
            </tr>
          </thead>
          <tbody>
            {holdings.map((holding) => (
              <tr
                key={holding.id}
                className="border-b border-zinc-100 last:border-b-0 dark:border-zinc-800/80"
              >
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    {holding.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={holding.image}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full"
                      />
                    ) : (
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-200 text-[10px] font-medium uppercase text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                        {holding.symbol.slice(0, 2)}
                      </span>
                    )}
                    <div>
                      <p className="font-medium text-zinc-900 dark:text-zinc-100">
                        {holding.name}
                      </p>
                      <p className="text-xs uppercase text-zinc-500">{holding.symbol}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {holding.amount}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-medium text-zinc-900 dark:text-zinc-100">
                  {holding.currentPrice === null ? "—" : formatUsd(holding.currentPrice)}
                </td>
                <td
                  className={`px-4 py-3 text-right tabular-nums font-medium ${percentClass(holding.priceChangePercent24h)}`}
                >
                  {formatPercent(holding.priceChangePercent24h)}
                </td>
                <td className="px-4 py-3 text-right tabular-nums font-medium text-zinc-900 dark:text-zinc-100">
                  {holding.valueUsd === null ? "—" : formatCompactUsd(holding.valueUsd)}
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => void handleDelete(holding.id)}
                    disabled={deletingId === holding.id}
                    className="text-sm text-zinc-500 transition hover:text-red-600 disabled:opacity-50 dark:hover:text-red-400"
                  >
                    {deletingId === holding.id ? "Removing…" : "Remove"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
