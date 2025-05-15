#!/bin/bash

set -e  # Stop on first error

echo "🔍  Étape 1 : Audit de sécurité..."
npm audit --production

echo "✅ Aucun problème de sécurité détecté."

echo "🧹  Étape 2 : Lint du projet..."
npm run lint

echo "✅ Lint sans erreur."

echo "🏗️  Étape 3 : Build du projet..."
npm run build

echo "✅ Build réussi."

echo ""
echo "📦 Étape 4 : Sélection du type de version"
read -p "👉 Choisis le type de version (patch / minor / major) : " bump

if [[ "$bump" != "patch" && "$bump" != "minor" && "$bump" != "major" ]]; then
  echo "❌ Type de version invalide. Abandon."
  exit 1
fi

echo "🔢 Bump version avec 'npm version $bump'..."
npm version $bump

# Récupère la dernière version pour le tag
version=$(node -p "require('./package.json').version")

echo ""
read -p "📝 Message de commit : " message

echo "💾 Commit & tag..."
git add .
git commit -m "$message"
git tag "v$version"

echo "✅ Version $version taguée avec succès."