import { auth } from "@/auth";

/** Entra ID access token for server-side API calls (attach as Bearer). */
export async function getEntraAccessToken(): Promise<string | null> {
  const session = await auth();
  return session?.accessToken ?? null;
}
