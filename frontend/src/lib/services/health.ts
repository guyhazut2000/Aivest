export type ServiceHealth = {
  name: string;
  url: string;
  ok: boolean;
  detail?: string;
};

async function fetchHealth(
  name: string,
  baseUrl: string,
): Promise<ServiceHealth> {
  const url = `${baseUrl.replace(/\/$/, "")}/health`;

  try {
    const res = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(3000) });
    if (!res.ok) {
      return { name, url, ok: false, detail: `HTTP ${res.status}` };
    }
    const data = (await res.json()) as { ok?: boolean; service?: string };
    return {
      name,
      url,
      ok: data.ok === true,
      detail: data.service,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : "unreachable";
    return { name, url, ok: false, detail: message };
  }
}

export async function getBackendHealth(): Promise<ServiceHealth[]> {
  const services = [
    { name: "Python API", url: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000" },
    { name: "Node API", url: process.env.NEXT_PUBLIC_API_NODE_URL ?? "http://localhost:3001" },
  ];

  return Promise.all(services.map((s) => fetchHealth(s.name, s.url)));
}
