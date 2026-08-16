#!/usr/bin/env bash
set -e

# Charger les variables d'environnement depuis .env
if [ -f .env ]; then
  set -a
  source .env
  set +a
else
  echo "Erreur: Le fichier .env est introuvable."
  exit 1
fi

export MSYS_NO_PATHCONV=1

# Exécution de Flyway en montant directement le dossier des migrations
docker run --rm \
  -v "$PWD/src/sql/migrations:/flyway/sql" \
  flyway/flyway:latest \
  -url="jdbc:mariadb://host.docker.internal:${DB_PORT}/${DB_DATABASE_NAME}" \
  -user="${DB_USER_NAME}" \
  -password="${DB_USER_PASSWORD}" \
  migrate
