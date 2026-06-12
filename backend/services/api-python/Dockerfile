# syntax=docker/dockerfile:1
# Build context: repo root

FROM python:3.12-slim AS base
WORKDIR /app
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

COPY backend/services/api-python/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ── Development (uvicorn --reload) ────────────────────────────────────────────
FROM base AS dev
COPY backend/services/api-python/app ./app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

# ── Production ────────────────────────────────────────────────────────────────
FROM base AS runner
COPY backend/services/api-python/app ./app
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
