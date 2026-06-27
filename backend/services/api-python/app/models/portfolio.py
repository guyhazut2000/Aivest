from pydantic import BaseModel, ConfigDict, Field


class HoldingInput(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    name: str
    symbol: str
    amount: float
    value_usd: float | None = Field(default=None, alias="valueUsd")
    price_change_percent_24h: float | None = Field(
        default=None,
        alias="priceChangePercent24h",
    )


class PortfolioAnalyzeRequest(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    total_value_usd: float = Field(alias="totalValueUsd")
    holdings: list[HoldingInput]


class PortfolioAnalyzeResponse(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    insights: list[str]
    narrative: str | None = None
    mode: str
