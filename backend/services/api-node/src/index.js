import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "api-node" });
});

app.get("/", (_req, res) => {
  res.json({ message: "Aivest Node API — local dev" });
});

app.listen(port, () => {
  console.log(`api-node listening on :${port}`);
});
