param(
  [string]$RepoPath = "C:\Users\chami\OneDrive\Desktop\GhostLink",
  [int]$IntervalSeconds = 60
)

Push-Location $RepoPath
Write-Host "[auto-push] Started for $RepoPath (interval: $IntervalSeconds s)"

while ($true) {
  try {
    $changes = git status --porcelain
    if ($changes) {
      git add -A
      $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
      git commit -m "Auto-commit: $timestamp"
      git push origin master
      Write-Host "[auto-push] Pushed at $timestamp"
    } else {
      Write-Host "[auto-push] No changes"
    }
  } catch {
    Write-Host "[auto-push] Error: $($_.Exception.Message)"
  }
  Start-Sleep -Seconds $IntervalSeconds
}
