echo ""
echo "/********************************************************/"
echo "🔍  Step 1: Running security audit..."
echo "/********************************************************/"
echo ""

npm audit --omit=dev --audit-level high || { echo "❌ Audit failed. Aborting."; exit 1; }

echo ""
echo "✅ No production vulnerabilities found."
echo ""

echo ""
echo "/********************************************************/"
echo "🧹  Step 2: Running linter..."
echo "/********************************************************/"
echo ""

npm run lint || { echo "❌ Lint failed. Aborting."; exit 1; }

echo ""
echo "✅ Lint passed without errors."
echo ""

echo ""
echo "/********************************************************/"
echo "🏗️  Step 3: Building the project..."
echo "/********************************************************/"
echo ""

npm run build || { echo "❌ Build failed. Aborting."; exit 1; }

echo ""
echo "✅ Build completed successfully."
echo ""

echo ""
echo "/********************************************************/"
echo "📦 Step 4: Choose version bump type"
echo "/********************************************************/"
echo "   [p] patch (bug fixes)"
echo "   [m] minor (backward-compatible features)"
echo "   [M] major (breaking changes)"
read -p "👉 Your choice (p/m/M): " choice

case "$choice" in
  p|P) bump="patch" ;;
  m) bump="minor" ;;
  M) bump="major" ;;
  *) echo "❌ Invalid choice. Aborting."; exit 1 ;;
esac

echo ""
echo "🔢 Bumping version with 'npm version $bump'..."
npm version $bump || { echo "❌ Version bump failed. Aborting."; exit 1; }

echo ""
echo "/********************************************************/"
echo "🛑 Step 5: Manually stage the files you want to commit"
echo "/********************************************************/"
echo "👉 Use 'git add ...' for precise control."
read -p "Press [Enter] when you're ready to continue..."

if [[ -z $(git diff --cached --name-only) ]]; then
  echo "❌ No files staged. Aborting commit."
  exit 1
fi

read -p "💬 Commit message: " message
git commit -m "$message"

version=$(node -p "require('./package.json').version")
git tag "v$version"
echo "🏷️  Tagged commit with 'v$version'"

echo ""
echo "✅ All done!"