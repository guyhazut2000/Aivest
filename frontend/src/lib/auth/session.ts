import { auth } from "@clerk/nextjs/server";

/** Clerk session token for server-side API calls (attach as Bearer). */
export async function getClerkAccessToken(): Promise<string | null> {
  const { getToken } = await auth();
  return getToken();
}
