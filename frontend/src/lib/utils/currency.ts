const usdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

const compactUsdFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 2,
});

export function formatUsd(price: number): string {
  if (price >= 1) {
    return usdFormatter.format(price);
  }

  if (price >= 0.01) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }).format(price);
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 8,
  }).format(price);
}

export function formatCompactUsd(value: number): string {
  return compactUsdFormatter.format(value);
}

export function formatPercent(value: number | null): string {
  if (value === null || Number.isNaN(value)) {
    return "—";
  }

  const sign = value >= 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

export function percentClass(value: number | null): string {
  if (value === null || Number.isNaN(value)) {
    return "text-zinc-500";
  }

  if (value >= 0) {
    return "text-emerald-600 dark:text-emerald-400";
  }

  return "text-red-600 dark:text-red-400";
}
