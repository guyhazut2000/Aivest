import { prisma } from "@/lib/db";

export type DbHealthResult =
  | { ok: true; latencyMs: number }
  | { ok: false; error: string };

export async function checkDbHealth(): Promise<DbHealthResult> {
  const started = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    return { ok: true, latencyMs: Date.now() - started };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Database unreachable";
    return { ok: false, error: message };
  }
}
