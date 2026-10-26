@echo off
echo ===================================================
echo   Starting ILLUMEA SKIN CARE Full-Stack System
echo ===================================================
echo Starting Backend API Server (Port 5000)...
start "Illumea Backend API" cmd /k "cd /d %~dp0backend && npm run dev"

timeout /t 2 /nobreak >nul

echo Starting Frontend Dev Server (Port 5173)...
start "Illumea Frontend React" cmd /k "cd /d %~dp0 && npm run dev"

echo.
echo Both servers are launching!
echo Backend:  http://localhost:5000/api
echo Frontend: http://localhost:5173/
echo.
pause
