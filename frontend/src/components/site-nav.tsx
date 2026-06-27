import Link from "next/link";

const links = [
  { href: "/", label: "Markets" },
  { href: "/portfolio", label: "Portfolio" },
] as const;

type SiteNavProps = {
  active: (typeof links)[number]["href"];
};

export function SiteNav({ active }: SiteNavProps) {
  return (
    <nav className="flex items-center gap-1 rounded-lg border border-zinc-200 bg-white p-1 dark:border-zinc-800 dark:bg-zinc-900">
      {links.map((link) => {
        const isActive = link.href === active;

        return (
          <Link
            key={link.href}
            href={link.href}
            className={[
              "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100",
            ].join(" ")}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
