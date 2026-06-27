import { prisma } from "@/lib/db";

import { getCryptoMarketsByIds } from "./crypto";

export type PortfolioHoldingRow = {
  id: string;
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
  image: string | null;
  currentPrice: number | null;
  valueUsd: number | null;
  priceChangePercent24h: number | null;
};

export type PortfolioSnapshot = {
  portfolioId: string;
  name: string;
  holdings: PortfolioHoldingRow[];
  totalValueUsd: number;
  pricedAt: string | null;
};

async function getOrCreateDefaultPortfolio() {
  const existing = await prisma.portfolio.findFirst({
    orderBy: { createdAt: "asc" },
  });

  if (existing) {
    return existing;
  }

  return prisma.portfolio.create({
    data: { name: "My Portfolio" },
  });
}

export async function getPortfolioSnapshot(): Promise<PortfolioSnapshot> {
  const portfolio = await getOrCreateDefaultPortfolio();
  const holdings = await prisma.holding.findMany({
    where: { portfolioId: portfolio.id },
    orderBy: { symbol: "asc" },
  });

  if (holdings.length === 0) {
    return {
      portfolioId: portfolio.id,
      name: portfolio.name,
      holdings: [],
      totalValueUsd: 0,
      pricedAt: null,
    };
  }

  const coinIds = holdings.map((h) => h.coinId);
  const markets = await getCryptoMarketsByIds(coinIds);
  const priceByCoinId = new Map(
    markets.ok ? markets.coins.map((c) => [c.id, c] as const) : [],
  );

  const rows: PortfolioHoldingRow[] = holdings.map((holding) => {
    const market = priceByCoinId.get(holding.coinId);
    const amount = Number(holding.amount);
    const currentPrice = market?.currentPrice ?? null;
    const valueUsd = currentPrice === null ? null : amount * currentPrice;

    return {
      id: holding.id,
      coinId: holding.coinId,
      symbol: holding.symbol,
      name: holding.name,
      amount,
      image: market?.image ?? null,
      currentPrice,
      valueUsd,
      priceChangePercent24h: market?.priceChangePercent24h ?? null,
    };
  });

  const totalValueUsd = rows.reduce((sum, row) => sum + (row.valueUsd ?? 0), 0);

  return {
    portfolioId: portfolio.id,
    name: portfolio.name,
    holdings: rows,
    totalValueUsd,
    pricedAt: markets.ok ? markets.fetchedAt.toISOString() : null,
  };
}

export async function upsertHolding(input: {
  coinId: string;
  symbol: string;
  name: string;
  amount: number;
}) {
  const portfolio = await getOrCreateDefaultPortfolio();

  return prisma.holding.upsert({
    where: {
      portfolioId_coinId: {
        portfolioId: portfolio.id,
        coinId: input.coinId,
      },
    },
    create: {
      portfolioId: portfolio.id,
      coinId: input.coinId,
      symbol: input.symbol.toLowerCase(),
      name: input.name,
      amount: input.amount,
    },
    update: {
      amount: input.amount,
      symbol: input.symbol.toLowerCase(),
      name: input.name,
    },
  });
}

export async function removeHolding(holdingId: string) {
  return prisma.holding.delete({ where: { id: holdingId } });
}
