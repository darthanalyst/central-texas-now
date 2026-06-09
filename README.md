# Central Texas Now

Local news for Waco, Temple, Killeen, Fort Cavazos & Belton — an editorial newsroom site (design direction: **The Signal**).

Built as a single-page app with hash routing. Open `index.html` in a browser, or serve the folder statically.

## Structure
- `index.html` — app shell: router, tweak state → CSS variables, script imports
- `ctn-data.js` — content store (articles, sections, rebuilt legacy stories)
- `ctn-chrome.jsx` — header, masthead/nav, weather widget, newsletter, footer
- `ctn-pages.jsx` — Home, Section, Article views
- `ctn-styles.css` — full stylesheet (light/dark, density, accent, headline-font variables)
- `ctn-tweaks.jsx` — Tweaks panel controls
- `tweaks-panel.jsx`, `image-slot.js` — reusable components (Tweaks shell; drag-and-drop image slots)
- `img/` — editorial illustrations, one per story (drop a real photo on any to replace)

## Features
- Working nav, section pages, and full articles
- High-equity legacy stories rebuilt as real content (Killeen–San Juan sister cities, Matt Baker, Griner, Fort Hood remembrance, mama-cat feature)
- Interactive weather widget, newsletter signup
- Tweaks panel: masthead style, serif/sans headlines, density, brand accent, dark mode
- Drag-and-drop, persistent image slots on every story

## Deploy
Static host (GitHub Pages, Netlify, etc.). For GitHub Pages, serve from the repo root; `index.html` is the entry point.
