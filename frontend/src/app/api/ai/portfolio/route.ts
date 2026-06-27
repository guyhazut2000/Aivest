import { NextResponse } from "next/server";

import { analyzePortfolio } from "@/lib/services/ai";
import { getPortfolioSnapshot } from "@/lib/services/portfolio";

export async function POST() {
  const snapshot = await getPortfolioSnapshot();

  const result = await analyzePortfolio({
    totalValueUsd: snapshot.totalValueUsd,
    holdings: snapshot.holdings.map((holding) => ({
      name: holding.name,
      symbol: holding.symbol,
      amount: holding.amount,
      valueUsd: holding.valueUsd,
      priceChangePercent24h: holding.priceChangePercent24h,
    })),
  });

  if (!result.ok) {
    return NextResponse.json(result, { status: 502 });
  }

  return NextResponse.json(result);
}
