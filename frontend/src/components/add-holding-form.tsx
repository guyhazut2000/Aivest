"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { CryptoMarket } from "@/lib/services/crypto";

type AddHoldingFormProps = {
  coins: CryptoMarket[];
};

export function AddHoldingForm({ coins }: AddHoldingFormProps) {
  const router = useRouter();
  const [coinId, setCoinId] = useState(coins[0]?.id ?? "");
  const [amount, setAmount] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const selectedCoin = coins.find((coin) => coin.id === coinId);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!selectedCoin) {
      setError("Select a coin");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/portfolio/holdings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coinId: selectedCoin.id,
          symbol: selectedCoin.symbol,
          name: selectedCoin.name,
          amount: Number(amount),
        }),
      });

      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Could not save holding");
        return;
      }

      setAmount("");
      router.refresh();
    } catch {
      setError("Could not save holding");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (coins.length === 0) {
    return (
      <p className="text-sm text-zinc-500">
        Market data is unavailable — try again in a minute.
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900 sm:flex-row sm:items-end"
    >
      <label className="flex flex-1 flex-col gap-1.5 text-sm">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">Coin</span>
        <select
          value={coinId}
          onChange={(event) => setCoinId(event.target.value)}
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        >
          {coins.map((coin) => (
            <option key={coin.id} value={coin.id}>
              {coin.name} ({coin.symbol.toUpperCase()})
            </option>
          ))}
        </select>
      </label>

      <label className="flex w-full flex-col gap-1.5 text-sm sm:w-40">
        <span className="font-medium text-zinc-700 dark:text-zinc-300">Amount</span>
        <input
          type="number"
          min="0"
          step="any"
          required
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          placeholder="0.5"
          className="rounded-lg border border-zinc-300 bg-white px-3 py-2 text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
        />
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
      >
        {isSubmitting ? "Saving…" : "Add holding"}
      </button>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400 sm:basis-full">{error}</p>
      ) : null}
    </form>
  );
}
