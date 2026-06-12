import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3001;

const corsOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (origin && corsOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(204);
    return;
  }

  next();
});

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "api-node" });
});

app.get("/", (_req, res) => {
  res.json({ message: "Aivest Node API — local dev" });
});

app.listen(port, "0.0.0.0", () => {
  console.log(`api-node listening on 0.0.0.0:${port}`);
});
