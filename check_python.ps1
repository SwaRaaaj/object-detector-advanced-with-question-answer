Write-Host "🔍 Checking Python Installation Status" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

Write-Host ""

# Check Python
Write-Host "Checking Python..." -ForegroundColor Yellow
try {
    $pythonVersion = python --version 2>&1
    Write-Host "✅ Python is installed: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Python is NOT installed or not in PATH" -ForegroundColor Red
    Write-Host ""
    Write-Host "To install Python:" -ForegroundColor Yellow
    Write-Host "1. Go to https://python.org" -ForegroundColor White
    Write-Host "2. Download the latest version" -ForegroundColor White
    Write-Host "3. Run the installer" -ForegroundColor White
    Write-Host "4. Make sure to check 'Add Python to PATH' during installation" -ForegroundColor White
}

Write-Host ""

# Check pip
Write-Host "Checking pip..." -ForegroundColor Yellow
try {
    $pipVersion = pip --version 2>&1
    Write-Host "✅ pip is installed: $pipVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ pip is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "To install pip:" -ForegroundColor Yellow
    Write-Host "1. Download get-pip.py from https://bootstrap.pypa.io/get-pip.py" -ForegroundColor White
    Write-Host "2. Run: python get-pip.py" -ForegroundColor White
}

Write-Host ""

# Check ultralytics
Write-Host "Checking ultralytics..." -ForegroundColor Yellow
try {
    python -c "import ultralytics; print('ultralytics version:', ultralytics.__version__)" 2>&1
    Write-Host "✅ ultralytics is installed" -ForegroundColor Green
} catch {
    Write-Host "❌ ultralytics is NOT installed" -ForegroundColor Red
    Write-Host ""
    Write-Host "To install ultralytics:" -ForegroundColor Yellow
    Write-Host "pip install ultralytics" -ForegroundColor White
}

Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "Check complete!" -ForegroundColor Green
Write-Host ""
Read-Host "Press Enter to continue" 