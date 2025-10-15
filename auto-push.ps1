# auto-push.ps1
echo "File change detected. Pushing to GitHub..."
git add .
git commit -m "Auto-update - $(Get-Date)"
git push origin main
echo "Push complete."