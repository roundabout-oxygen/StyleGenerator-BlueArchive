@echo off
cd /d "%~dp0"
title BlueArchive Scene Maker v1.0.4

echo ============================================================
echo   BlueArchive Scene Maker [v1.0.4]
echo ============================================================
echo Starting local server...

python server.py
if errorlevel 1 (
    echo Python server exited or failed.
    echo Opening index.html in browser directly...
    start "" "%~dp0index.html"
)
pause
