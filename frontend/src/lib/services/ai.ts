export type PortfolioAnalysis = {
  insights: string[];
  narrative: string | null;
  mode: "rules" | "openai" | string;
};

export type PortfolioAnalysisResult =
  | { ok: true; analysis: PortfolioAnalysis }
  | { ok: false; error: string };

function pythonApiBase(): string {
  return (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000").replace(
    /\/$/,
    "",
  );
}

export async function analyzePortfolio(payload: {
  totalValueUsd: number;
  holdings: Array<{
    name: string;
    symbol: string;
    amount: number;
    valueUsd: number | null;
    priceChangePercent24h: number | null;
  }>;
}): Promise<PortfolioAnalysisResult> {
  const url = `${pythonApiBase()}/ai/portfolio/analyze`;

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
      signal: AbortSignal.timeout(30_000),
    });

    if (!res.ok) {
      return {
        ok: false,
        error: `Python API returned HTTP ${res.status}`,
      };
    }

    const analysis = (await res.json()) as PortfolioAnalysis;
    return { ok: true, analysis };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Request failed";
    return { ok: false, error: message };
  }
}
