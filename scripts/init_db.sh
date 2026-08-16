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

# Remplacer les variables et exécuter via le client MariaDB
envsubst < ./src/sql/databaseInit.example.sql | mariadb -h localhost -u root -p"${DB_ROOT_PASSWORD}"

echo "Base de données initialisée !"
