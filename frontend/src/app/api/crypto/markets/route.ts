import { NextResponse } from "next/server";

import { getTopCryptoMarkets } from "@/lib/services/crypto";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number(searchParams.get("limit") ?? "100");
  const result = await getTopCryptoMarkets(limit, { fresh: true });

  if (!result.ok) {
    return NextResponse.json({ ok: false, error: result.error }, { status: 502 });
  }

  return NextResponse.json({
    ok: true,
    coins: result.coins,
    fetchedAt: result.fetchedAt.toISOString(),
  });
}
