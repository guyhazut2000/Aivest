export type CryptoMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  currentPrice: number;
  marketCap: number;
  marketCapRank: number;
  priceChangePercent24h: number | null;
  totalVolume: number;
};

export type CryptoMarketsResult =
  | { ok: true; coins: CryptoMarket[]; fetchedAt: Date }
  | { ok: false; error: string };

type CoinGeckoMarket = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number | null;
  total_volume: number;
};

const COINGECKO_MARKETS_URL =
  "https://api.coingecko.com/api/v3/coins/markets";

const REVALIDATE_SECONDS = 60;

function mapMarket(coin: CoinGeckoMarket): CryptoMarket {
  return {
    id: coin.id,
    symbol: coin.symbol,
    name: coin.name,
    image: coin.image,
    currentPrice: coin.current_price,
    marketCap: coin.market_cap,
    marketCapRank: coin.market_cap_rank,
    priceChangePercent24h: coin.price_change_percentage_24h,
    totalVolume: coin.total_volume,
  };
}

export async function getTopCryptoMarkets(
  limit = 100,
  options?: { fresh?: boolean },
): Promise<CryptoMarketsResult> {
  const perPage = Math.min(Math.max(limit, 1), 250);
  const url = new URL(COINGECKO_MARKETS_URL);
  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("order", "market_cap_desc");
  url.searchParams.set("per_page", String(perPage));
  url.searchParams.set("page", "1");
  url.searchParams.set("sparkline", "false");
  url.searchParams.set("price_change_percentage", "24h");

  return fetchMarkets(url, options);
}

export async function getCryptoMarketsByIds(
  ids: string[],
  options?: { fresh?: boolean },
): Promise<CryptoMarketsResult> {
  const uniqueIds = [...new Set(ids.filter(Boolean))];

  if (uniqueIds.length === 0) {
    return { ok: true, coins: [], fetchedAt: new Date() };
  }

  const url = new URL(COINGECKO_MARKETS_URL);
  url.searchParams.set("vs_currency", "usd");
  url.searchParams.set("ids", uniqueIds.join(","));
  url.searchParams.set("order", "market_cap_desc");
  url.searchParams.set("sparkline", "false");
  url.searchParams.set("price_change_percentage", "24h");

  return fetchMarkets(url, options);
}

async function fetchMarkets(
  url: URL,
  options?: { fresh?: boolean },
): Promise<CryptoMarketsResult> {
  try {
    const res = await fetch(url, {
      ...(options?.fresh
        ? { cache: "no-store" as const }
        : { next: { revalidate: REVALIDATE_SECONDS } }),
      signal: AbortSignal.timeout(10_000),
    });

    if (!res.ok) {
      return {
        ok: false,
        error: `CoinGecko returned HTTP ${res.status}`,
      };
    }

    const data = (await res.json()) as CoinGeckoMarket[];

    if (!Array.isArray(data)) {
      return { ok: false, error: "Unexpected response from CoinGecko" };
    }

    return {
      ok: true,
      coins: data.map(mapMarket),
      fetchedAt: new Date(),
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    return { ok: false, error: message };
  }
}
