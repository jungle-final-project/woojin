# Role Workspaces

| Owner | Workspace | Primary Responsibility |
| --- | --- | --- |
| 1 | `apps/web/src/features/quote`, `apps/web/src/features/auth` | Consumer quote flow, recommendation UI, auth screens |
| 2 | `apps/api/src/main/java/com/buildgraph/prototype/part`, `apps/api/src/main/java/com/buildgraph/prototype/price`, `apps/web/src/features/parts` | Parts DB, validation tools, rule-based performance, target-price alerts |
| 3 | `apps/api/src/main/java/com/buildgraph/prototype/agent`, `apps/api/src/main/java/com/buildgraph/prototype/rag` | LLM/RAG/Agent orchestration skeleton and fallback policies |
| 4 | `apps/pc-agent`, `apps/api/src/main/java/com/buildgraph/prototype/log`, `apps/api/src/main/java/com/buildgraph/prototype/ticket`, `apps/web/src/features/support` | PC Agent, log upload, AS tickets |
| 5 | `infra`, `apps/api/src/main/java/com/buildgraph/prototype/user`, `apps/api/src/main/java/com/buildgraph/prototype/admin`, `apps/web/src/features/admin` | Auth, admin, Docker, queue/cache, load-test environment |

## First PR Checklist

| Owner | First PR target | Done when |
| --- | --- | --- |
| 1 | Replace quote/auth mock screen data with API calls and local form state | Requirement parse, build recommend, login/signup flows can be tested from the UI |
| 2 | Create part/price DTO and service skeletons behind the existing controllers | `/api/parts`, `/api/tools/{tool}/check`, `/api/price-alerts`, `/api/price-snapshots/collect` no longer depend on shared `MockData` |
| 3 | Implement Agent session state model and RAG evidence boundary | `/api/agent/sessions`, `/api/agent/sessions/{id}/run`, `/api/rag/search`, admin Agent detail show state timeline and evidence |
| 4 | Connect PC Agent JSONL export to upload and AS ticket creation | AS request creates AgentLogUpload and AsTicket records with consent, 30-minute range, and admin-only cause candidates |
| 5 | Add auth guard, admin guard, and infra smoke scripts | User/admin routes distinguish roles, Docker services stay reproducible, and k6 script skeleton exists |

## Seed Ownership

Seed/mock data follows the same module boundary as the final plan. `common/MockData.java` is only a small utility for `map()` and `now()`.

| Module | Seed file | Owner |
| --- | --- | --- |
| build | `apps/api/src/main/java/com/buildgraph/prototype/build/BuildSeed.java` | 1 |
| part/tool | `apps/api/src/main/java/com/buildgraph/prototype/part/PartSeed.java`, `ToolSeed.java` | 2 |
| price | `apps/api/src/main/java/com/buildgraph/prototype/price/PriceSeed.java` | 2 |
| agent | `apps/api/src/main/java/com/buildgraph/prototype/agent/AgentSeed.java` | 3 |
| rag | `apps/api/src/main/java/com/buildgraph/prototype/rag/RagSeed.java` | 3 |
| log | `apps/api/src/main/java/com/buildgraph/prototype/log/LogSeed.java` | 4 |
| ticket | `apps/api/src/main/java/com/buildgraph/prototype/ticket/TicketSeed.java` | 4 |
| user | `apps/api/src/main/java/com/buildgraph/prototype/user/UserSeed.java` | 5 |
| admin | `apps/api/src/main/java/com/buildgraph/prototype/admin/AdminSeed.java` | 5 |

## Shared Contract Rules

- Do not change an existing API response shape without updating `docs/openapi.yaml` in the same PR.
- If a feature needs seed data, add it inside the owning module seed file; do not add domain data to `common/MockData.java`.
- Admin detail screens are implementation targets, not final UX. Keep them explicit about state, owner, API, and evidence fields.
- Keep MVP exclusions intact: no payment, shipping, custom remote control, exact FPS guarantee, or lowest-price guarantee.
