import { NextResponse } from "next/server";

import { removeHolding } from "@/lib/services/portfolio";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;

  try {
    await removeHolding(id);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Holding not found" }, { status: 404 });
  }
}
