# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Server

```bash
python3 -m http.server 3000
```

Open at http://localhost:3000. For auto-reload on save, use `live-server --port=3000` (requires `npm install -g live-server`).

## Project Structure

Static marketing website — no build step, no framework, no dependencies.

```
athena_website/
├── index.html          # All page content and structure
├── css/styles.css      # All styles (single stylesheet)
├── js/main.js          # Scroll animations + mobile nav toggle
├── assets/
│   ├── gifs/           # Feature GIFs
│   └── images/         # Logos and static images
└── color-options.html  # Color scheme preview tool (dev only, not linked from index)
```

## Architecture

**Single page, no framework.** Everything is vanilla HTML/CSS/JS.

**Design tokens** live in `:root` at the top of `css/styles.css`. All colors are CSS variables — changing the scheme means only editing those ~10 variables.

**Font:** `DM Sans` (400/500/600/700), loaded from Google Fonts in `<head>`.

**Page sections (in order):** Hero → Students (Degree Planning) → Students (Transfer Credit Chat) → Advisors (Dashboard & Requests) → Advisors (Student Profile) → Statement Bar → Security → LMS → Footer CTA → Footer.

**Feature section layout** — sections use `.feat-inner` (CSS Grid, 2 columns). Adding `.reverse` to `.feat-inner` flips the order (text right, visual left) via `direction: rtl` with a `direction: ltr` reset on children. The LMS section uses `.feat-stacked` instead (text above, visual below, centered).

**Visual wrappers** — feature visuals are either:
- `.browser-outer > .browser-window` — a mock browser chrome wrapping a `<img>` GIF directly (used for sections that already have real GIFs)
- `.gif-placeholder` — a styled empty box with label text, used where a GIF is still needed

To replace a `.gif-placeholder` with a real GIF inside the browser chrome:
```html
<!-- Replace the .gif-placeholder div with: -->
<div class="browser-outer anim" id="gif-SECTION">
  <div class="browser-window">
    <!-- ...copy the browser-tabbar and browser-urlrow from an adjacent section... -->
    <img src="assets/gifs/your-file.gif" alt="Description" style="width:100%;display:block;">
  </div>
</div>
```

To replace a `.gif-placeholder` with a standalone GIF (no browser chrome), use the `.feat-gif` class:
```html
<img src="assets/gifs/your-file.gif" alt="..." class="feat-gif">
```

**Sections still needing GIFs:** `#gif-student-chat` (Students — Transfer Credit Chat), `#gif-security` (Security), and the LMS placeholder inside `#gif-lms > .browser-window`.

**Scroll animations** — Elements with class `anim` start at `opacity: 0`. `IntersectionObserver` in `js/main.js` adds class `on` when they enter the viewport. Hero `.anim` elements are triggered immediately on load (no scroll needed). Staggered delays use classes `d1`–`d5` on hero children.

## Color Scheme

Open `color-options.html` in the browser to preview 8 preset schemes. To apply one, update the CSS variables in the `:root` block in `css/styles.css`.
