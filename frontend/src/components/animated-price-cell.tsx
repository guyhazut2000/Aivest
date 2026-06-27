"use client";

import { useEffect, useRef, useState } from "react";

type PriceDirection = "up" | "down";

type AnimatedPriceCellProps = {
  price: number;
  formatted: string;
};

const FLASH_MS = 900;

export function AnimatedPriceCell({ price, formatted }: AnimatedPriceCellProps) {
  const prevPrice = useRef(price);
  const [flash, setFlash] = useState<PriceDirection | null>(null);

  useEffect(() => {
    const previous = prevPrice.current;

    if (price === previous) {
      return;
    }

    if (price > previous) {
      setFlash("up");
    } else if (price < previous) {
      setFlash("down");
    }

    prevPrice.current = price;

    const timer = window.setTimeout(() => setFlash(null), FLASH_MS);
    return () => window.clearTimeout(timer);
  }, [price]);

  return (
    <span
      className={[
        "inline-flex items-center justify-end gap-1 rounded px-1.5 py-0.5 tabular-nums transition-colors duration-300",
        flash === "up" ? "animate-price-up text-emerald-600 dark:text-emerald-400" : "",
        flash === "down" ? "animate-price-down text-red-600 dark:text-red-400" : "",
        flash === null ? "text-zinc-900 dark:text-zinc-100" : "",
      ].join(" ")}
    >
      {flash ? (
        <span
          aria-hidden
          className={
            flash === "up"
              ? "text-[10px] leading-none text-emerald-500/90"
              : "text-[10px] leading-none text-red-500/90"
          }
        >
          {flash === "up" ? "▲" : "▼"}
        </span>
      ) : null}
      {formatted}
    </span>
  );
}
