import { AddHoldingForm } from "@/components/add-holding-form";
import { PortfolioHoldings } from "@/components/portfolio-holdings";
import { SiteNav } from "@/components/site-nav";
import { getTopCryptoMarkets } from "@/lib/services/crypto";
import { getPortfolioSnapshot } from "@/lib/services/portfolio";
import { formatCompactUsd } from "@/lib/utils/currency";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const [snapshot, markets] = await Promise.all([
    getPortfolioSnapshot(),
    getTopCryptoMarkets(100),
  ]);

  const coinOptions = markets.ok ? markets.coins : [];

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-16 sm:px-10">
        <header className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
              Portfolio
            </p>
            <SiteNav active="/portfolio" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {snapshot.name}
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Total value{" "}
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                {formatCompactUsd(snapshot.totalValueUsd)}
              </span>
              {snapshot.pricedAt ? (
                <span className="text-sm text-zinc-500">
                  {" "}
                  · priced at{" "}
                  {new Date(snapshot.pricedAt).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
              ) : null}
            </p>
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Add holding
          </h2>
          <AddHoldingForm coins={coinOptions} />
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Holdings
          </h2>
          <PortfolioHoldings holdings={snapshot.holdings} />
        </section>
      </main>
    </div>
  );
}
