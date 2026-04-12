# @@CONTENT_PLACEHOLDER@@
@@.PHONY: dev stop build migrate makemigrations createsuperuser shell logs backend-shell frontend-shell test lint format

# ─── Dev ───────────────────────────────────────────────────────────────
dev:
	docker compose up --build

dev-detach:
	docker compose up --build -d

stop:
	docker compose down

# ─── Django ────────────────────────────────────────────────────────────
migrate:
	docker compose exec backend python manage.py migrate

makemigrations:
	docker compose exec backend python manage.py makemigrations

createsuperuser:
	docker compose exec backend python manage.py createsuperuser

collectstatic:
	docker compose exec backend python manage.py collectstatic --noinput

shell:
	docker compose exec backend python manage.py shell_plus

backend-shell:
	docker compose exec backend bash

# ─── Next.js ───────────────────────────────────────────────────────────
frontend-shell:
	docker compose exec frontend sh

# ─── Logs ──────────────────────────────────────────────────────────────
logs:
	docker compose logs -f

logs-backend:
	docker compose logs -f backend

logs-frontend:
	docker compose logs -f frontend

# ─── Tests ─────────────────────────────────────────────────────────────
test-backend:
	docker compose exec backend python manage.py test --verbosity=2

test-frontend:
	docker compose exec frontend pnpm test

# ─── Code quality ──────────────────────────────────────────────────────
lint-backend:
	docker compose exec backend ruff check .

lint-frontend:
	docker compose exec frontend pnpm lint

format-backend:
	docker compose exec backend ruff format .

# ─── Database ──────────────────────────────────────────────────────────
db-reset:
	docker compose down -v
	docker compose up --build -d db
	sleep 3
	docker compose up --build -d backend
	make migrate
	make createsuperuser

# ─── OpenAPI schema ────────────────────────────────────────────────────
schema:
	docker compose exec backend python manage.py spectacular --color --file schema.yml@@
