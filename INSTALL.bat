@echo off
REM ==================== CampusWalkin Installation Script (Windows) ====================

setlocal enabledelayedexpansion

echo.
echo ========================================================================
echo          CampusWalkin - Complete Installation Script (Windows)
echo ========================================================================
echo.

REM ==================== CHECK PREREQUISITES ====================
echo [*] Checking Prerequisites...
echo.

REM Check Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] Node.js is not installed!
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
    echo [OK] Node.js installed: !NODE_VERSION!
)

REM Check npm
where npm >nul 2>nul
if %errorlevel% neq 0 (
    echo [X] npm is not installed!
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm -v') do set NPM_VERSION=%%i
    echo [OK] npm installed: !NPM_VERSION!
)

echo.

REM ==================== SETUP BACKEND ====================
echo [*] Setting Up Backend...
echo.

cd backend

if not exist .env (
    echo [*] Creating .env file for backend...
    (
        echo MONGODB_URI=mongodb://localhost:27017/campuswalkin
        echo PORT=5000
        echo NODE_ENV=development
        echo JWT_SECRET=your_super_secret_jwt_key_change_this_12345
        echo EMAIL_USER=your_email@gmail.com
        echo EMAIL_PASSWORD=your_app_password
        echo ADMIN_EMAIL=admin@campuswalkin.com
        echo FRONTEND_URL=http://localhost:3000
        echo API_BASE_URL=http://localhost:5000
    ) > .env
    echo [OK] .env file created
) else (
    echo [OK] .env file already exists
)

echo [*] Installing backend dependencies...
call npm install

if %errorlevel% equ 0 (
    echo [OK] Backend dependencies installed
) else (
    echo [X] Failed to install backend dependencies
    pause
    exit /b 1
)

if not exist uploads (
    mkdir uploads
    echo [OK] Created uploads directory
)

cd ..

echo.

REM ==================== SETUP FRONTEND ====================
echo [*] Setting Up Frontend...
echo.

cd frontend

if not exist .env.local (
    echo [*] Creating .env.local file for frontend...
    (
        echo NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ) > .env.local
    echo [OK] .env.local file created
) else (
    echo [OK] .env.local file already exists
)

echo [*] Installing frontend dependencies...
call npm install

if %errorlevel% equ 0 (
    echo [OK] Frontend dependencies installed
) else (
    echo [X] Failed to install frontend dependencies
    pause
    exit /b 1
)

cd ..

echo.

REM ==================== INSTALLATION COMPLETE ====================
echo ========================================================================
echo [OK] Installation Complete!
echo ========================================================================
echo.

echo [*] Next Steps:
echo.
echo 1) Start Backend (Terminal 1):
echo    cd backend ^&^& npm run dev
echo.
echo 2) Start Frontend (Terminal 2):
echo    cd frontend ^&^& npm run dev
echo.
echo 3) Start MongoDB (Terminal 3):
echo    mongod
echo.
echo 4) Open Browser:
echo    http://localhost:3000
echo.

echo [*] Important Configuration:
echo.
echo   - Backend .env: ./backend/.env
echo   - Frontend .env: ./frontend/.env.local
echo   - Update MongoDB URI if using Atlas
echo   - Set your email credentials for notifications
echo.

echo [*] API Endpoints:
echo.
echo   - Backend: http://localhost:5000
echo   - Frontend: http://localhost:3000
echo   - API Base: http://localhost:5000/api
echo.

echo [*] Documentation:
echo.
echo   - Setup Guide: SETUP_GUIDE.md
echo   - API Docs: backend/API_DOCS.md
echo   - Deployment: DEPLOYMENT.md
echo.

echo Happy Coding! [Ready to start development]
echo.

pause