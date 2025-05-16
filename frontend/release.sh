GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m'

print_step() {
  local step_msg="$1"

  echo ""
  echo -e "${YELLOW}/********************************************************/${NC}"
  echo ""
  echo -e "${YELLOW}${step_msg}${NC}"
  echo ""
  echo -e "${YELLOW}/********************************************************/${NC}"
  echo ""
}

print_step "🔍  Step 1 : Running security audit..."

npm audit --omit=dev --audit-level high || { echo "❌ Audit failed. Aborting"; exit 1; }

echo ""
echo "✅ No production vulnerabilities found"

print_step "🧹  Step 2 : Running linter..."

npm run lint || { echo "❌ Lint failed. Aborting"; exit 1; }

echo "✅ Lint passed without errors"

print_step "🏗️  Step 3 : Building the project..."

npm run build || { echo "❌ Build failed. Aborting"; exit 1; }

echo ""
echo "✅ Build completed successfully"

print_step "📦 Step 4 : Choose version bump type"

echo -e "   [${GREEN}p] patch ( bug fixes )${NC}"
echo -e "   [${YELLOW}m] minor ( backward-compatible features )${NC}"
echo -e "   [${RED}M] major ( breaking changes )${NC}"

echo ""
printf "👉 Your choice ( ${GREEN}p${NC} / ${YELLOW}m${NC} / ${RED}M${NC} ): "
read choice

case "$choice" in
  p|P) bump="patch" ;;
  m) bump="minor" ;;
  M) bump="major" ;;
  *) echo -e "${RED}❌ Invalid choice. Aborting${NC}"; exit 1 ;;
esac

echo ""
echo "🔢 Bumping version with 'npm version $bump'..."
npm version $bump || { echo "❌ Version bump failed. Aborting"; exit 1; }

print_step "🛑 Step 5 : Manually stage the files you want to commit"

echo "👉 Use 'git add ...' for precise control"
echo ""
read -p "Press [Enter] when you're ready to continue..."

if [[ -z $(git diff --cached --name-only) ]]; then
  echo "❌ No files staged. Aborting commit"
  exit 1
fi

echo ""
read -p "💬 Commit message: " message
git commit -m "$message"

version=$(node -p "require('./package.json').version")
git tag "v$version"
echo "🏷️  Tagged commit with 'v$version'"

echo ""
echo "✅ All done !"