# IDE Optimizations — Echo OS

This file documents the workspace performance tweaks applied and provides copy/paste commands your team can use.

## What changed
- Added a workspace `.vscode/settings.json` that excludes heavy folders from the explorer and watcher (e.g. `node_modules`, `.next`).
- Lowered TypeScript server memory to `1536` MB and `files.maxMemoryForLargeFilesMB` to `2048`.
- Disabled some editor features (semantic highlighting, format-on-save) to reduce CPU/IO while developing.

## Quick apply (what I did)
The file `.vscode/settings.json` lives at the repo root. VS Code will pick it up automatically when you open this repository as a workspace.

## Recommended workflow (PowerShell)
Open a new PowerShell window and run:

```powershell
cd 'C:\Users\blueg\Desktop\echo-os'
# install (only if necessary)
npm ci
# start dev server in this external terminal
npm run dev
```

To launch in a new PowerShell window (keeps current terminal free):

```powershell
Start-Process pwsh -ArgumentList '-NoExit','-Command','npm run dev' -WorkingDirectory 'C:\Users\blueg\Desktop\echo-os'
```

## Optional manual steps to reduce editor load
- Only open one VS Code window for this repo.
- Disable heavy extensions for this workspace (GitLens, Live Share, AI assistants, or Tailwind IntelliSense if you don't need it).
- If needed, lower `typescript.tsserver.maxTsServerMemory` to `1024` in `.vscode/settings.json`.
- Run the dev server externally (not in the integrated terminal) to reduce combined RAM usage.

## Troubleshooting
- If port 3000 is in use:

```powershell
(Get-NetTCPConnection -LocalPort 3000).OwningProcess | Stop-Process -Force
```

- If `.next/dev/lock` appears, kill lingering node processes:

```powershell
Get-Process node | Stop-Process -Force
```

## Contact
If you want me to tune values further (lower TS memory to 1024, or add/remove watchers), tell me and I'll update the workspace settings and push a new commit.
