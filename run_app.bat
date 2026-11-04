@echo off
title SignBridge AI — Full-Stack Translator Launcher
cd /d "%~dp0"
echo ===================================================
echo   Starting SignBridge AI (React + Node.js)
echo ===================================================
echo.
echo Launching Server (Port 5000) and Client (Port 3000)...
echo.
npm run dev
if %ERRORLEVEL% NEQ 0 (
  echo.
  echo [ERROR] Application failed to start.
  pause
)

