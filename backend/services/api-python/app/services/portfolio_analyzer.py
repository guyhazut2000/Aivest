from __future__ import annotations

import os
from typing import TYPE_CHECKING

import httpx

if TYPE_CHECKING:
    from app.models.portfolio import PortfolioAnalyzeRequest

OPENAI_CHAT_URL = "https://api.openai.com/v1/chat/completions"
OPENAI_MODEL = os.getenv("OPENAI_MODEL", "gpt-4o-mini")


def analyze_portfolio_rules(payload: PortfolioAnalyzeRequest) -> list[str]:
    holdings = payload.holdings

    if not holdings:
        return [
            "Your portfolio is empty. Add holdings to get allocation and risk insights.",
        ]

    total = payload.total_value_usd
    valued = [h for h in holdings if h.value_usd is not None and h.value_usd > 0]

    insights: list[str] = [
        f"You hold {len(holdings)} asset{'s' if len(holdings) != 1 else ''}.",
    ]

    if total > 0 and valued:
        sorted_by_value = sorted(valued, key=lambda h: h.value_usd or 0, reverse=True)
        top = sorted_by_value[0]
        top_pct = ((top.value_usd or 0) / total) * 100
        insights.append(
            f"Largest position: {top.name} ({top.symbol.upper()}) at {top_pct:.1f}% of portfolio value.",
        )

        if top_pct >= 50:
            insights.append(
                "Concentration risk: a single asset makes up half or more of your portfolio.",
            )
        elif len(valued) >= 3 and top_pct <= 40:
            insights.append("Allocation looks reasonably spread across multiple assets.")

    movers = [
        h
        for h in holdings
        if h.price_change_percent_24h is not None
    ]
    if movers:
        best = max(movers, key=lambda h: h.price_change_percent_24h or 0)
        worst = min(movers, key=lambda h: h.price_change_percent_24h or 0)
        insights.append(
            f"Best 24h mover: {best.name} ({best.price_change_percent_24h:+.2f}%).",
        )
        if worst.symbol != best.symbol:
            insights.append(
                f"Weakest 24h mover: {worst.name} ({worst.price_change_percent_24h:+.2f}%).",
            )

        weighted_change = _weighted_24h_change(valued, total)
        if weighted_change is not None:
            insights.append(
                f"Portfolio-weighted 24h change: {weighted_change:+.2f}%.",
            )

    return insights


def _weighted_24h_change(
    holdings: list,
    total_value: float,
) -> float | None:
    if total_value <= 0:
        return None

    weighted = 0.0
    covered = 0.0

    for holding in holdings:
        if holding.value_usd is None or holding.price_change_percent_24h is None:
            continue
        weight = holding.value_usd / total_value
        weighted += weight * holding.price_change_percent_24h
        covered += weight

    if covered == 0:
        return None

    return weighted


def build_llm_prompt(payload: PortfolioAnalyzeRequest, insights: list[str]) -> str:
    lines = [
        "Portfolio summary for a crypto investor learning app:",
        f"Total value USD: {payload.total_value_usd:.2f}",
        "Holdings:",
    ]

    for holding in payload.holdings:
        value = holding.value_usd if holding.value_usd is not None else 0
        change = holding.price_change_percent_24h
        change_text = f"{change:+.2f}%" if change is not None else "n/a"
        lines.append(
            f"- {holding.name} ({holding.symbol.upper()}): "
            f"amount={holding.amount}, value=${value:.2f}, 24h={change_text}",
        )

    lines.append("Rule-based insights already computed:")
    lines.extend(f"- {insight}" for insight in insights)
    lines.append(
        "Write 2-3 short sentences of plain-language commentary. "
        "No financial advice disclaimers beyond one brief note. Be educational.",
    )

    return "\n".join(lines)


async def generate_openai_narrative(prompt: str) -> str | None:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        return None

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                OPENAI_CHAT_URL,
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json={
                    "model": OPENAI_MODEL,
                    "messages": [
                        {
                            "role": "system",
                            "content": (
                                "You are a concise crypto portfolio analyst for a learning app."
                            ),
                        },
                        {"role": "user", "content": prompt},
                    ],
                    "max_tokens": 220,
                    "temperature": 0.4,
                },
            )
            response.raise_for_status()
            data = response.json()
            content = data["choices"][0]["message"]["content"]
            return content.strip() if isinstance(content, str) else None
    except (httpx.HTTPError, KeyError, IndexError, TypeError):
        return None
