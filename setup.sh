#!/bin/bash

# ==================================================
# ReplyFlow - One-Click Setup Script
# ==================================================
# This script will set up everything you need to run ReplyFlow
#
# Usage: chmod +x setup.sh && ./setup.sh
# ==================================================

set -e

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║   🚀 ReplyFlow Setup Script                              ║"
echo "║   AI-Powered Review Response Platform                    ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js is not installed!${NC}"
        echo "Please install Node.js 18+ from https://nodejs.org"
        exit 1
    fi

    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        echo -e "${RED}❌ Node.js version must be 18 or higher!${NC}"
        echo "Current version: $(node -v)"
        exit 1
    fi

    echo -e "${GREEN}✓ Node.js $(node -v) detected${NC}"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm is not installed!${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ npm $(npm -v) detected${NC}"
}

# Install dependencies
install_deps() {
    echo ""
    echo -e "${BLUE}📦 Installing dependencies...${NC}"
    npm install
    echo -e "${GREEN}✓ Dependencies installed${NC}"
}

# Setup environment file
setup_env() {
    echo ""
    if [ -f ".env.local" ]; then
        echo -e "${YELLOW}⚠ .env.local already exists${NC}"
        read -p "Do you want to overwrite it? (y/N): " overwrite
        if [ "$overwrite" != "y" ] && [ "$overwrite" != "Y" ]; then
            echo "Keeping existing .env.local"
            return
        fi
    fi

    echo -e "${BLUE}🔧 Setting up environment variables...${NC}"
    cp .env.example .env.local
    echo -e "${GREEN}✓ Created .env.local from template${NC}"
    echo ""
    echo -e "${YELLOW}⚠ IMPORTANT: You need to configure the following in .env.local:${NC}"
    echo ""
    echo "  1. SUPABASE - Create a project at https://supabase.com/dashboard"
    echo "     - NEXT_PUBLIC_SUPABASE_URL"
    echo "     - NEXT_PUBLIC_SUPABASE_ANON_KEY"
    echo "     - SUPABASE_SERVICE_ROLE_KEY"
    echo "     - DATABASE_URL"
    echo ""
    echo "  2. STRIPE - Get keys at https://dashboard.stripe.com/apikeys"
    echo "     - STRIPE_SECRET_KEY"
    echo "     - NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY"
    echo "     - STRIPE_WEBHOOK_SECRET"
    echo "     - Create products/prices in Stripe Dashboard"
    echo ""
    echo "  3. OPENAI - Get API key at https://platform.openai.com/api-keys"
    echo "     - OPENAI_API_KEY"
    echo ""
}

# Generate Prisma client
setup_prisma() {
    echo ""
    echo -e "${BLUE}🗄️ Setting up Prisma...${NC}"
    npx prisma generate
    echo -e "${GREEN}✓ Prisma client generated${NC}"
}

# Print next steps
print_next_steps() {
    echo ""
    echo "╔══════════════════════════════════════════════════════════╗"
    echo "║                    ✅ Setup Complete!                    ║"
    echo "╚══════════════════════════════════════════════════════════╝"
    echo ""
    echo -e "${GREEN}Next Steps:${NC}"
    echo ""
    echo "  1. Configure your environment variables in .env.local"
    echo ""
    echo "  2. Set up your database:"
    echo "     ${BLUE}npx prisma db push${NC}"
    echo ""
    echo "  3. Start the development server:"
    echo "     ${BLUE}npm run dev${NC}"
    echo ""
    echo "  4. Open http://localhost:3000 in your browser"
    echo ""
    echo "  5. For production deployment, see README.md"
    echo ""
    echo "─────────────────────────────────────────────────────────────"
    echo ""
    echo -e "${YELLOW}💡 Quick Start Commands:${NC}"
    echo ""
    echo "  npm run dev        - Start development server"
    echo "  npm run build      - Build for production"
    echo "  npm run start      - Start production server"
    echo "  npx prisma studio  - Open database GUI"
    echo ""
}

# Main execution
main() {
    check_node
    check_npm
    install_deps
    setup_env
    setup_prisma
    print_next_steps
}

main
