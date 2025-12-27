#!/usr/bin/env bash
set -e

# 1. Charger les variables d'environnement depuis .env
set -a
source .env
set +a

HOST_MIGRATIONS_DIR="$(pwd -W)/src/sql/migrations"

# 2. Lancer Flyway via Docker
docker run --rm \
  --network host \
  -v "$HOST_MIGRATIONS_DIR:/flyway/sql" \
  flyway/flyway:latest \
  migrate \
  -url="jdbc:mariadb://host.docker.internal:${DB_PORT}/${DB_DATABASE_NAME}" \
  -user="${DB_USER_NAME}" \
  -password="${DB_USER_PASSWORD}"
