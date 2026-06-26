# Trade Checklist

A personal pre-trade verification system for manual trading. Built for use before entering any position — forces discipline by requiring every check to be confirmed before the trade is considered valid.

## Modules

| Module | Strategy |
|--------|----------|
| M1 | Supply & Demand |
| M2 | Asia Range & London Sweep |
| M3A | DR Break and Retest |
| M3B | DR Rejection Confirmation |

## Features

- **Per-module checklists** — each strategy has its own dedicated checklist
- **Progress tracker** — visual progress bar shows how many checks are complete
- **Trade-ready banner** — appears only when all checks in the active module pass
- **Persistent state** — checks are saved to localStorage and survive page reloads
- **Reset & Export** — reset all checks or print/export the current state
- **Dark theme** — low-distraction UI designed for trading environments

## Deploy on GitHub Pages

1. Fork or clone this repo
2. Go to **Settings → Pages**
3. Set source to `main` branch, root folder
4. Your checklist will be live at `https://<your-username>.github.io/<repo-name>/`

## Local Use

No build step required. Just open `index.html` in any browser.

```bash
git clone https://github.com/<your-username>/trade-checklist.git
cd trade-checklist
open index.html
```

## File Structure

```
trade-checklist/
├── index.html   # All checklist content and markup
├── style.css    # Dark theme styles
├── app.js       # State management and interactions
└── README.md    # This file
```

---

> **Disclaimer:** This tool is for personal organizational use only. It is not financial advice. Always manage your own risk.
