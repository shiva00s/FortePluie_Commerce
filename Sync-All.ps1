# Navigate to your project root
Set-Location "D:\Project\FortePluie_Commerce"

# Optional: Remove submodule .git folders if you want a single repo
# Comment these lines if you want to keep frontend/backend as separate repos
if (Test-Path ".\frontend\.git") { Remove-Item -Recurse -Force ".\frontend\.git" }
if (Test-Path ".\backend\.git") { Remove-Item -Recurse -Force ".\backend\.git" }

# Stage all changes
git add .

# Commit changes with timestamp
$timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
git commit -m "Auto-update frontend/backend/root - $timestamp"

# Push to GitHub main branch
git push origin main
