import { getBackendHealth } from "@/lib/services/health";

export default async function Home() {
  const services = await getBackendHealth();
  const onlineCount = services.filter((s) => s.ok).length;

  return (
    <div className="flex min-h-full flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-10 px-6 py-16 sm:px-10">
        <header className="space-y-3">
          <p className="text-sm font-medium uppercase tracking-wider text-zinc-500">
            Local development
          </p>
          <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Aivest
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            AI-assisted investing platform. Frontend on Vercel; Python, Go, and Node APIs
            run in Docker under <code className="text-sm">backend/services</code> until AWS
            is connected.
          </p>
        </header>

        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-zinc-100">
              Backend services
            </h2>
            <span className="text-sm text-zinc-500">
              {onlineCount}/{services.length} online
            </span>
          </div>
          <ul className="grid gap-3">
            {services.map((service) => (
              <li
                key={service.name}
                className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div>
                  <p className="font-medium text-zinc-900 dark:text-zinc-100">
                    {service.name}
                  </p>
                  <p className="text-sm text-zinc-500">{service.url}/health</p>
                </div>
                <span
                  className={
                    service.ok
                      ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                      : "rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900 dark:bg-amber-950 dark:text-amber-200"
                  }
                >
                  {service.ok ? "online" : "offline"}
                </span>
              </li>
            ))}
          </ul>
          {onlineCount === 0 ? (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              Start the stack from the repo root:{" "}
              <code className="rounded bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
                npm run docker:up
              </code>
            </p>
          ) : null}
        </section>

        <section className="rounded-xl border border-dashed border-zinc-300 p-5 text-sm text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          <p className="font-medium text-zinc-800 dark:text-zinc-200">Next steps</p>
          <ul className="mt-2 list-inside list-disc space-y-1">
            <li>Prisma + Neon for data</li>
            <li>Clerk auth (Google OAuth)</li>
            <li>AI features in Python API services</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
