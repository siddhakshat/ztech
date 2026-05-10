# PowerShell script to run the LeadOps application

Write-Host "=== Running LeadOps Application ===" -ForegroundColor Cyan

Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

Write-Host ""
Write-Host "Starting development server..." -ForegroundColor Yellow
npm run dev

Write-Host ""
Write-Host "Application is running!" -ForegroundColor Green
Write-Host "Open http://localhost:5173/ in your browser" -ForegroundColor Cyan