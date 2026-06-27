"use client";

import { useState } from "react";

import type { PortfolioAnalysis } from "@/lib/services/ai";

type AnalysisResponse =
  | { ok: true; analysis: PortfolioAnalysis }
  | { ok: false; error: string };

export function PortfolioInsights() {
  const [analysis, setAnalysis] = useState<PortfolioAnalysis | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleAnalyze() {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai/portfolio", { method: "POST" });
      const data = (await res.json()) as AnalysisResponse;

      if (!res.ok || !data.ok) {
        setError(data.ok ? "Analysis failed" : data.error);
        setAnalysis(null);
        return;
      }

      setAnalysis(data.analysis);
    } catch {
      setError("Could not reach the analysis service");
      setAnalysis(null);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="space-y-4 rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
            AI insights
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Rule-based analysis from the Python API. Add{" "}
            <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs dark:bg-zinc-800">
              OPENAI_API_KEY
            </code>{" "}
            for an LLM narrative.
          </p>
        </div>
        <button
          type="button"
          onClick={() => void handleAnalyze()}
          disabled={isLoading}
          className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:opacity-60 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          {isLoading ? "Analyzing…" : "Analyze portfolio"}
        </button>
      </div>

      {error ? (
        <p className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
          {error}
          {error.includes("fetch") || error.includes("reach") ? (
            <span className="mt-1 block text-amber-800/80 dark:text-amber-300/80">
              Make sure the Python API is running on port 8000.
            </span>
          ) : null}
        </p>
      ) : null}

      {analysis ? (
        <div className="space-y-4">
          <ul className="space-y-2 text-sm text-zinc-700 dark:text-zinc-300">
            {analysis.insights.map((insight) => (
              <li key={insight} className="flex gap-2">
                <span className="text-emerald-500" aria-hidden>
                  •
                </span>
                <span>{insight}</span>
              </li>
            ))}
          </ul>

          {analysis.narrative ? (
            <blockquote className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-300">
              {analysis.narrative}
            </blockquote>
          ) : null}

          <p className="text-xs text-zinc-500">
            Mode: {analysis.mode === "openai" ? "OpenAI + rules" : "Rules only"}
          </p>
        </div>
      ) : null}
    </section>
  );
}
