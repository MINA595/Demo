# Environment status script
# Shows which Supabase environment is currently active

$appJson = Get-Content "app.json" | ConvertFrom-Json
$supabaseUrl = $appJson.expo.extra.supabaseUrl

Write-Host "Current Supabase Configuration:" -ForegroundColor White
Write-Host "================================" -ForegroundColor White

if ($supabaseUrl -like "*127.0.0.1*" -or $supabaseUrl -like "*localhost*") {
    Write-Host "Environment: LOCAL (Development)" -ForegroundColor Yellow
    Write-Host "URL: $supabaseUrl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To switch to REMOTE:" -ForegroundColor Green
    Write-Host "npm run production:setup" -ForegroundColor White
} else {
    Write-Host "Environment: REMOTE (Production)" -ForegroundColor Green
    Write-Host "URL: $supabaseUrl" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "To switch to LOCAL:" -ForegroundColor Yellow
    Write-Host "npm run local:setup" -ForegroundColor White
}
