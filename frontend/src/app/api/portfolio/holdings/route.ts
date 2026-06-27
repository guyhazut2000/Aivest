import { NextResponse } from "next/server";

import { upsertHolding } from "@/lib/services/portfolio";

type HoldingBody = {
  coinId?: string;
  symbol?: string;
  name?: string;
  amount?: number;
};

export async function POST(request: Request) {
  const body = (await request.json()) as HoldingBody;
  const amount = Number(body.amount);

  if (!body.coinId || !body.symbol || !body.name) {
    return NextResponse.json(
      { error: "coinId, symbol, and name are required" },
      { status: 400 },
    );
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "amount must be a positive number" },
      { status: 400 },
    );
  }

  const holding = await upsertHolding({
    coinId: body.coinId,
    symbol: body.symbol,
    name: body.name,
    amount,
  });

  return NextResponse.json({ ok: true, holdingId: holding.id });
}
