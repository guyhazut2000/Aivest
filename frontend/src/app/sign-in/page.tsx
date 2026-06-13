import { auth, signIn } from "@/auth";

export default async function SignInPage() {
  const session = await auth();

  if (session?.user) {
    return (
      <div className="flex min-h-full flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
        <p className="text-zinc-600 dark:text-zinc-400">
          You are already signed in as {session.user.name ?? session.user.email}.
        </p>
        <a
          href="/dashboard"
          className="mt-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          Go to dashboard
        </a>
      </div>
    );
  }

  return (
    <div className="flex min-h-full flex-col items-center justify-center bg-zinc-50 px-6 dark:bg-zinc-950">
      <div className="w-full max-w-sm space-y-6 rounded-xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">
            Sign in
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Use your Microsoft account via Entra ID
          </p>
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("microsoft-entra-id", { redirectTo: "/dashboard" });
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg bg-zinc-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Sign in with Microsoft
          </button>
        </form>
      </div>
    </div>
  );
}
