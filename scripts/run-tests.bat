@echo off
echo ╔════════════════════════════════════════════════════════╗
echo ║     🚀 GhostLink Test Suite - Quick Runner 🚀         ║
echo ╚════════════════════════════════════════════════════════╝
echo.
echo IMPORTANT: Make sure backend is running on port 5000!
echo.
pause
echo.
echo Running all tests...
echo.

cd /d "%~dp0"
node test-all.js

echo.
pause
