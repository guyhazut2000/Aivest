import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function DashboardPage() {
  const user = await currentUser();
  const displayName =
    user?.fullName ?? user?.username ?? user?.primaryEmailAddress?.emailAddress ?? "User";

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 px-6 py-16 font-sans dark:bg-zinc-950">
      <main className="mx-auto w-full max-w-2xl space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50">
            Dashboard
          </h1>
          <Link
            href="/"
            className="text-sm text-zinc-600 hover:underline dark:text-zinc-400"
          >
            Home
          </Link>
        </div>
        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <p className="text-sm text-zinc-500">Signed in via Clerk</p>
          <p className="mt-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
            {displayName}
          </p>
          {user?.primaryEmailAddress?.emailAddress ? (
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {user.primaryEmailAddress.emailAddress}
            </p>
          ) : null}
        </div>
      </main>
    </div>
  );
}
