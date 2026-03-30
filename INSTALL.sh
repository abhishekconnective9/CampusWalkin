#!/bin/bash

# ==================== CampusWalkin Installation Script ====================

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║         CampusWalkin - Complete Installation Script           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ==================== CHECK PREREQUISITES ====================
echo -e "${BLUE}📋 Checking Prerequisites...${NC}"
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed!${NC}"
    echo "Download from: https://nodejs.org/"
    exit 1
else
    NODE_VERSION=$(node -v)
    echo -e "${GREEN}✅ Node.js installed: $NODE_VERSION${NC}"
fi

# Check npm
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed!${NC}"
    exit 1
else
    NPM_VERSION=$(npm -v)
    echo -e "${GREEN}✅ npm installed: $NPM_VERSION${NC}"
fi

# Check Git
if ! command -v git &> /dev/null; then
    echo -e "${YELLOW}⚠️  Git is not installed (optional)${NC}"
else
    GIT_VERSION=$(git --version)
    echo -e "${GREEN}✅ $GIT_VERSION${NC}"
fi

echo ""

# ==================== SETUP BACKEND ====================
echo -e "${BLUE}🔧 Setting Up Backend...${NC}"
echo ""

cd backend

# Check if .env exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}📝 Creating .env file for backend...${NC}"
    cp .env.example .env 2>/dev/null || cat > .env << 'EOF'
MONGODB_URI=mongodb://localhost:27017/campuswalkin
PORT=5000
NODE_ENV=development
JWT_SECRET=your_super_secret_jwt_key_change_this_12345
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
ADMIN_EMAIL=admin@campuswalkin.com
FRONTEND_URL=http://localhost:3000
API_BASE_URL=http://localhost:5000
EOF
    echo -e "${GREEN}✅ .env file created${NC}"
else
    echo -e "${GREEN}✅ .env file already exists${NC}"
fi

# Install dependencies
echo -e "${BLUE}📦 Installing backend dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

# Create uploads directory
mkdir -p uploads
echo -e "${GREEN}✅ Created uploads directory${NC}"

cd ..

echo ""

# ==================== SETUP FRONTEND ====================
echo -e "${BLUE}🎨 Setting Up Frontend...${NC}"
echo ""

cd frontend

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo -e "${YELLOW}📝 Creating .env.local file for frontend...${NC}"
    cp .env.local.example .env.local 2>/dev/null || cat > .env.local << 'EOF'
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF
    echo -e "${GREEN}✅ .env.local file created${NC}"
else
    echo -e "${GREEN}✅ .env.local file already exists${NC}"
fi

# Install dependencies
echo -e "${BLUE}📦 Installing frontend dependencies...${NC}"
npm install

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

cd ..

echo ""

# ==================== INSTALLATION COMPLETE ====================
echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo -e "${GREEN}║         ✅ Installation Complete!${NC}                           ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

echo -e "${BLUE}📍 Next Steps:${NC}"
echo ""
echo "1️⃣  ${YELLOW}Start Backend (in terminal 1):${NC}"
echo "   cd backend && npm run dev"
echo ""
echo "2️⃣  ${YELLOW}Start Frontend (in terminal 2):${NC}"
echo "   cd frontend && npm run dev"
echo ""
echo "3️⃣  ${YELLOW}Start MongoDB (in terminal 3):${NC}"
echo "   mongod"
echo ""
echo "4️⃣  ${YELLOW}Open Browser:${NC}"
echo "   http://localhost:3000"
echo ""

echo -e "${BLUE}📝 Important Configuration:${NC}"
echo ""
echo "  • Backend .env: ./backend/.env"
echo "  • Frontend .env: ./frontend/.env.local"
echo "  • Update MongoDB URI if using Atlas"
echo "  • Set your email credentials for notifications"
echo ""

echo -e "${BLUE}🔗 API Endpoints:${NC}"
echo ""
echo "  • Backend: http://localhost:5000"
echo "  • Frontend: http://localhost:3000"
echo "  • API Base: http://localhost:5000/api"
echo ""

echo -e "${BLUE}📚 Documentation:${NC}"
echo ""
echo "  • Setup Guide: SETUP_GUIDE.md"
echo "  • API Docs: backend/API_DOCS.md"
echo "  • Deployment: DEPLOYMENT.md"
echo ""

echo -e "${GREEN}Happy Coding! 🚀${NC}"
echo ""