# Local development setup script
# Switches app to use local Supabase

Write-Host "Switching to LOCAL Supabase (Development)..." -ForegroundColor Green

if (Test-Path "app.local.json") {
    Copy-Item "app.local.json" "app.json" -Force
    Write-Host "Switched to local Supabase configuration" -ForegroundColor Green
    
    $appJson = Get-Content "app.json" | ConvertFrom-Json
    $supabaseUrl = $appJson.expo.extra.supabaseUrl
    Write-Host "URL: $supabaseUrl" -ForegroundColor Cyan
} else {
    Write-Host "app.local.json not found! Using current app.json..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Make sure local Supabase is running:" -ForegroundColor Yellow
Write-Host "   npm run supabase:start" -ForegroundColor White
Write-Host ""
Write-Host "Ready for development! Run: npm run start" -ForegroundColor Green
