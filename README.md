# BuildGraph AI Prototype

BuildGraph AI prototype monorepo for the Jungle final project.

## Stack

- Web: React, TypeScript, Vite, Tailwind, React Router, TanStack Query
- API: Spring Boot, Gradle, Java 21
- Infra: PostgreSQL + pgvector, Redis, RabbitMQ, Mailpit, Docker Compose
- PC Agent: Python 3.11 CLI skeleton

## Quick Start

```powershell
docker compose up --build
```

- Web: http://localhost:5173
- API: http://localhost:8080/api/health
- RabbitMQ: http://localhost:15672
- Mailpit: http://localhost:8025

## Validation

```powershell
cd apps/web
npm run build
npm run test

cd ../..
docker compose config
docker compose up --build
```

Optional k6 starting point:

```powershell
k6 run infra/k6/smoke.js
```

## Prototype Scope

This repository is a desktop-only prototype scaffold. It connects the 14 core user/admin screens, seed-backed API responses, database-backed runtime wiring, and role-based workspaces for five team members.

Out of scope for this scaffold: real payment/shipping, custom remote control, exact FPS guarantee, lowest-price guarantee, and production AI/RAG integrations.
