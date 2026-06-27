"use client";

import { useCallback, useEffect, useState } from "react";

import { AnimatedPriceCell } from "@/components/animated-price-cell";
import type { CryptoMarket } from "@/lib/services/crypto";
import {
  formatCompactUsd,
  formatPercent,
  formatUsd,
  percentClass,
} from "@/lib/utils/currency";

type CryptoMarketTableProps = {
  coins: CryptoMarket[];
  fetchedAt: string;
};

type MarketsResponse =
  | { ok: true; coins: CryptoMarket[]; fetchedAt: string }
  | { ok: false; error: string };

const POLL_INTERVAL_MS = 30_000;

function formatUpdatedLabel(iso: string): string {
  return new Date(iso).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
}

export function CryptoMarketTable({
  coins: initialCoins,
  fetchedAt: initialFetchedAt,
}: CryptoMarketTableProps) {
  const [coins, setCoins] = useState(initialCoins);
  const [fetchedAt, setFetchedAt] = useState(initialFetchedAt);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const refreshMarkets = useCallback(async () => {
    setIsRefreshing(true);

    try {
      const res = await fetch(`/api/crypto/markets?limit=${initialCoins.length}`, {
        cache: "no-store",
      });
      const data = (await res.json()) as MarketsResponse;

      if (data.ok) {
        setCoins(data.coins);
        setFetchedAt(data.fetchedAt);
      }
    } finally {
      setIsRefreshing(false);
    }
  }, [initialCoins.length]);

  useEffect(() => {
    const interval = window.setInterval(() => {
      void refreshMarkets();
    }, POLL_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [refreshMarkets]);

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Top {coins.length} by market cap
          </h2>
          <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
            <span
              className={[
                "inline-block h-2 w-2 rounded-full bg-emerald-500",
                isRefreshing ? "animate-live-pulse" : "",
              ].join(" ")}
              aria-hidden
            />
            <span>
              Prices in USD · updated {formatUpdatedLabel(fetchedAt)}
              {isRefreshing ? " · refreshing…" : " · live"}
            </span>
          </p>
        </div>
        <span className="text-xs text-zinc-500">Data from CoinGecko</span>
      </div>

      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800">
                <th className="px-4 py-3 font-medium">#</th>
                <th className="px-4 py-3 font-medium">Coin</th>
                <th className="px-4 py-3 font-medium text-right">Price</th>
                <th className="px-4 py-3 font-medium text-right">24h</th>
                <th className="hidden px-4 py-3 font-medium text-right sm:table-cell">
                  Market cap
                </th>
                <th className="hidden px-4 py-3 font-medium text-right md:table-cell">
                  Volume (24h)
                </th>
              </tr>
            </thead>
            <tbody>
              {coins.map((coin) => (
                <tr
                  key={coin.id}
                  className="group border-b border-zinc-100 transition-colors duration-200 last:border-b-0 hover:bg-zinc-50/90 dark:border-zinc-800/80 dark:hover:bg-zinc-800/40"
                >
                  <td className="px-4 py-3 text-zinc-500">{coin.marketCapRank}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={coin.image}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 rounded-full"
                      />
                      <div>
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">
                          {coin.name}
                        </p>
                        <p className="text-xs uppercase text-zinc-500">
                          {coin.symbol}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    <AnimatedPriceCell
                      price={coin.currentPrice}
                      formatted={formatUsd(coin.currentPrice)}
                    />
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-medium tabular-nums ${percentClass(coin.priceChangePercent24h)}`}
                  >
                    {formatPercent(coin.priceChangePercent24h)}
                  </td>
                  <td className="hidden px-4 py-3 text-right tabular-nums text-zinc-700 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100 sm:table-cell">
                    {formatCompactUsd(coin.marketCap)}
                  </td>
                  <td className="hidden px-4 py-3 text-right tabular-nums text-zinc-700 transition-colors duration-200 group-hover:text-zinc-900 dark:text-zinc-300 dark:group-hover:text-zinc-100 md:table-cell">
                    {formatCompactUsd(coin.totalVolume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
