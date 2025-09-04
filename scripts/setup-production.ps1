# Production setup script
# Switches app to use remote Supabase

Write-Host "Switching to REMOTE Supabase (Production)..." -ForegroundColor Green

if (Test-Path "app.production.json") {
    Copy-Item "app.production.json" "app.json" -Force
    Write-Host "Switched to remote Supabase configuration" -ForegroundColor Green
    
    $appJson = Get-Content "app.json" | ConvertFrom-Json
    $supabaseUrl = $appJson.expo.extra.supabaseUrl
    Write-Host "URL: $supabaseUrl" -ForegroundColor Cyan
} else {
    Write-Host "app.production.json not found!" -ForegroundColor Red
    Write-Host "Please create app.production.json with your remote Supabase credentials" -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Ready for production! Run: npm run start" -ForegroundColor Green
