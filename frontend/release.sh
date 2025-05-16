#!/bin/bash

set -e  # Stop the script if any command fails

echo "🔍  Step 1: Running security audit..."
npm audit --omit=dev --audit-level high

echo "✅ No production vulnerabilities found."

echo "🧹  Step 2: Running linter..."
npm run lint

echo "✅ Lint passed without errors."

echo "🏗️  Step 3: Building the project..."
npm run build

echo "✅ Build completed successfully."

echo ""
echo "📦 Step 4: Choose version bump type"
echo "   [p] patch (bug fixes)"
echo "   [m] minor (backward-compatible features)"
echo "   [M] major (breaking changes)"

read -p "👉 Your choice (p/m/M): " choice

case "$choice" in
  p|P)
    bump="patch"
    ;;
  m)
    bump="minor"
    ;;
  M)
    bump="major"
    ;;
  *)
    echo "❌ Invalid choice. Aborting."
    exit 1
    ;;
esac

echo "🔢 Bumping version with 'npm version $bump'..."
npm version $bump

version=$(node -p "require('./package.json').version")

echo ""
echo "🛑 Step 5: Manually stage the files you want to commit (e.g. git add ...)"
read -p "Press [Enter] when you're ready to continue..."

# Check if anything is staged for commit
if git diff --cached --quiet; then
  echo "❌ No files staged. Aborting commit."
  exit 1
fi

read -p "📝 Commit message: " message

echo "💾 Committing and tagging..."
git commit -m "$message"
git tag "v$version"

echo "✅ Version $version has been committed and tagged successfully."