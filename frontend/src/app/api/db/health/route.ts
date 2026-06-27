import { NextResponse } from "next/server";

import { checkDbHealth } from "@/lib/services/db-health";

export async function GET() {
  const result = await checkDbHealth();

  if (!result.ok) {
    return NextResponse.json(result, { status: 503 });
  }

  return NextResponse.json(result);
}
