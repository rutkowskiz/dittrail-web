@echo off
setlocal

title DitTrail Demo Publisher
set "REPO=rutkowskiz/dittrail-web"
set "TAG=demo"
set "EXPECTED=DitTrailPublish.zip"

if "%~1"=="" (
    echo.
    echo DitTrail Demo Publisher
    echo -----------------------
    echo Drag %EXPECTED% onto this file to publish it.
    echo.
    pause
    exit /b 1
)

if /I not "%~nx1"=="%EXPECTED%" (
    echo.
    echo The file must be named exactly: %EXPECTED%
    echo Current file: %~nx1
    echo.
    pause
    exit /b 1
)

where gh >nul 2>&1
if errorlevel 1 (
    echo.
    echo GitHub CLI ^(gh^) is not installed or is not available in PATH.
    echo Install it once with:
    echo     winget install --id GitHub.cli
    echo Then reopen the terminal and run:
    echo     gh auth login --web
    echo.
    pause
    exit /b 1
)

gh auth status --hostname github.com >nul 2>&1
if errorlevel 1 (
    echo.
    echo GitHub CLI is not logged in yet.
    echo Run once:
    echo     gh auth login --web
    echo.
    pause
    exit /b 1
)

echo.
echo Publishing %EXPECTED%...

gh release view %TAG% --repo %REPO% >nul 2>&1
if errorlevel 1 (
    echo Creating the permanent Demo release...
    gh release create %TAG% --repo %REPO% --title "DitTrail Demo" --notes "Current early development build for friends and testers." --prerelease
    if errorlevel 1 goto :error
)

gh release upload demo "%~f1" --repo %REPO% --clobber
if errorlevel 1 goto :error

echo.
echo Done.
echo https://dittrail.com/demo/
echo.
pause
exit /b 0

:error
echo.
echo Publishing failed. No changes were made to the website.
echo.
pause
exit /b 1
