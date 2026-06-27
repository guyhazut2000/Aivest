import { CryptoMarketTable } from "@/components/crypto-market-table";
import { SiteNav } from "@/components/site-nav";
import { getTopCryptoMarkets } from "@/lib/services/crypto";

export default async function Home() {
  const markets = await getTopCryptoMarkets(100);

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16 sm:px-10">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Live markets
            </p>
            <SiteNav active="/" />
          </div>
          <div className="space-y-3">
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Crypto prices
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Track the top cryptocurrencies by market cap. Manage your holdings on
            the portfolio page.
          </p>
          </div>
        </header>

        {markets.ok ? (
          <CryptoMarketTable
            coins={markets.coins}
            fetchedAt={markets.fetchedAt.toISOString()}
          />
        ) : (
          <section className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
            <p className="font-medium">Could not load market data</p>
            <p className="mt-1">{markets.error}</p>
            <p className="mt-2 text-amber-800/80 dark:text-amber-300/80">
              CoinGecko&apos;s free API has rate limits. Try refreshing in a
              minute.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
