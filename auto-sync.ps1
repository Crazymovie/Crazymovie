$path = "C:\Users\This\Desktop\Crazymovie"

Write-Host ""
Write-Host "Crazymovie Automatic GitHub Sync is RUNNING." -ForegroundColor Green
Write-Host "Checking for changes every 15 seconds..." -ForegroundColor Yellow
Write-Host "Keep this Terminal open while working." -ForegroundColor Gray
Write-Host ""

Set-Location $path

while ($true) {

    $status = git status --porcelain

    if ($status) {

        Write-Host ""
        Write-Host "Changes detected. Syncing to GitHub..." -ForegroundColor Cyan

        git add .

        $commitMessage = "Auto update Crazymovie $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"

        git commit -m $commitMessage

        git push origin main

        Write-Host ""
        Write-Host "GitHub sync complete!" -ForegroundColor Green
        Write-Host ""
    }

    Start-Sleep -Seconds 15
}
