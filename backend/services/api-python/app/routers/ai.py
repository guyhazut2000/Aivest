from fastapi import APIRouter

from app.models.portfolio import PortfolioAnalyzeRequest, PortfolioAnalyzeResponse
from app.services.portfolio_analyzer import (
    analyze_portfolio_rules,
    build_llm_prompt,
    generate_openai_narrative,
)

router = APIRouter(prefix="/ai", tags=["ai"])


@router.post("/portfolio/analyze", response_model=PortfolioAnalyzeResponse)
async def analyze_portfolio(body: PortfolioAnalyzeRequest) -> PortfolioAnalyzeResponse:
    insights = analyze_portfolio_rules(body)
    prompt = build_llm_prompt(body, insights)
    narrative = await generate_openai_narrative(prompt)
    mode = "openai" if narrative else "rules"

    return PortfolioAnalyzeResponse(
        insights=insights,
        narrative=narrative,
        mode=mode,
    )
