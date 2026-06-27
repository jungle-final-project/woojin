# Sprint 1 Start Checklist

This checklist turns the final plan into concrete starting work without requiring finished feature logic.

## Common

- Confirm each owner can run `docker compose up --build`.
- Keep feature work inside the assigned package or feature folder first.
- Update `docs/openapi.yaml` whenever request or response fields change.
- Keep route smoke tests passing when adding screens.

## Owner 1: Quote/Auth

- Wire login/signup form fields to real state.
- Replace static quote actions with calls to `/api/requirements/parse` and `/api/builds/recommend`.
- Add loading, error, and success UI states around the existing screens.

## Owner 2: Part/Price

- Add DTO/service boundaries for part list and tool checks.
- Define rule input shape for compatibility, power, size, performance, and price tools.
- Keep `/api/price-snapshots/collect` as the starting point for collection job wiring.

## Owner 3: Agent/RAG

- Implement the session state transition: `QUEUED -> RUNNING -> RAG_SEARCHED -> TOOLS_CALLED -> SUMMARY_READY`.
- Add fallback path: `FAILED -> FALLBACK_READY`.
- Replace RAG seed rows with pgvector-backed evidence retrieval later.
- Use `/admin/agent-sessions/:id`, `/admin/tool-invocations/:id`, and `/admin/rag-evidence/:id` as review screens.

## Owner 4: PC Agent/AS

- Keep JSONL format stable before adding more metrics.
- Enforce explicit upload consent and recent 30-minute export range.
- Make cause candidates visible to admin only.

## Owner 5: Infra/Admin/Auth

- Add user/admin route guards.
- Maintain `.github/workflows/ci.yml` for PR build, route smoke, API bootJar, and compose config checks.
- Expand the k6 script skeleton toward the planned 300/1000 concurrent-user checks.
- Keep Redis, RabbitMQ, Mailpit, and PostgreSQL startup reproducible through Docker Compose.
