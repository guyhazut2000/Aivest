import { NextResponse } from "next/server";

import { getPortfolioSnapshot } from "@/lib/services/portfolio";

export async function GET() {
  const snapshot = await getPortfolioSnapshot();
  return NextResponse.json(snapshot);
}
