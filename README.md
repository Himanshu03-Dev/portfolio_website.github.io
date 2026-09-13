# Himanshu Dev — Portfolio

My personal portfolio. Plain HTML, CSS and JavaScript — no framework, no build step, no dependencies.

**Live:** https://himanshu03-dev.github.io/portfolio_website.github.io/

---

## Files

```
index.html                      the page — every section lives here
style.css                       design tokens + all styling (dark and light themes)
script.js                       all behaviour (see below)
assets/Himanshu_Dev_Resume.pdf  served by the "Download Resume" buttons
images/profile.jpg              profile photo in the hero card
```

## Sections

Hero → tech marquee → About → Skills (4 tabs) → How I work → Experience timeline →
Python &amp; Django projects → 20+ live client websites (filterable, with detail modals) →
Certifications &amp; education → Contact → Footer

## What script.js does

- Intro screen with a progress bar, then hands over to the page
- Dark / light theme toggle, remembered in `localStorage`
- Command palette on <kbd>Ctrl</kbd>/<kbd>⌘</kbd> + <kbd>K</kbd> — jump to a section or run an action
- Typing effect in the hero, live IST clock, animated counters and skill bars
- Scroll progress bar, scroll-spy navigation, scroll-linked timeline
- Client-work grid built from the `WORK` array, with category filters and detail modals
- Live GitHub stats pulled from the public GitHub API (hides itself if the request fails)
- Contact form → WhatsApp, copy-email button, toast notifications
- Custom cursor and magnetic buttons on desktop pointers only

## How the contact form works

No backend and no third-party form service. On submit, `script.js` formats the fields into a
message and opens `https://wa.me/918755017490?text=…`, so the enquiry lands directly in WhatsApp.
"Send as email instead" does the same thing with a `mailto:` link.

Nothing is stored on the site, and there is nothing to pay for or keep alive.

## Updating things

| What | Where |
|---|---|
| Phone / WhatsApp number | `script.js` → `WA_NUMBER`, plus the `wa.me/…` and `tel:` links in `index.html` |
| Email | `script.js` → `EMAIL`, plus the `mailto:` links in `index.html` |
| Resume PDF | replace `assets/Himanshu_Dev_Resume.pdf` (keep the filename) |
| Profile photo | replace `images/profile.jpg` (square crop works best) |
| Add a client website | `script.js` → push an object into `WORK` (`n` name, `u` url, `c` category, `d` summary, `p` points, `s` stack) |
| Add a Python project | `index.html` → copy an `<article class="feat-card …>` block inside `#projects` |
| Skill levels | `index.html` → `data-w="80"` on each `.bar i` |
| Stats numbers | `index.html` → `data-count` / `data-suffix` in the `.stats` block |
| Command palette entries | `script.js` → the `COMMANDS` array |

## Deploying

GitHub Pages serves the default branch. Push, or use **Add file → Upload files** on github.com,
and the site updates in about a minute.

## Notes

- Responsive down to 360px; checked at 390px and 1440px.
- Works without JavaScript — the intro screen and reveal animations are gated behind a `js` class,
  so every section is readable even if the script never runs.
- Keyboard accessible, visible focus styles, `prefers-reduced-motion` respected, print stylesheet included.
- Meta description, Open Graph tags and JSON-LD `Person` schema so the site looks right when it's
  shared or searched.
- The only external request is Google Fonts.
