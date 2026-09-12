# Himanshu Dev — Portfolio

Personal portfolio site. Plain HTML, CSS and JavaScript — no build step, no framework, no dependencies.
Deployed with GitHub Pages at **https://himanshu03-dev.github.io/portfolio_website.github.io/**

---

## Files

```
index.html                      the whole page (all sections)
style.css                       design system + all styling
script.js                       typing effect, scroll spy, filters, counters, WhatsApp form
assets/Himanshu_Dev_Resume.pdf  the file the "Download Resume" buttons serve
images/himanshu.jpg             profile photo used in the hero card
```

## Sections

Hero → Tech marquee → About → Skills (4 tabs) → Experience timeline →
Python & Django projects → 20+ live client websites (filterable) →
Certifications & education → Contact (WhatsApp form) → Footer

## How the contact form works

There is **no backend and no third-party form service**. On submit, `script.js` formats the
fields into a message and opens `https://wa.me/918755017490?text=…`, so the enquiry lands
directly in WhatsApp. "Send as Email instead" does the same thing with a `mailto:` link.

Nothing is stored on the site, and there is nothing to pay for or keep alive.

## Things you'll want to update

| What | Where |
|---|---|
| Phone / WhatsApp number | `script.js` → `WA_NUMBER` **and** every `wa.me/…` link + `tel:` link in `index.html` |
| Email | `script.js` → `EMAIL`, plus `mailto:` links in `index.html` |
| Resume PDF | replace `assets/Himanshu_Dev_Resume.pdf` (keep the same filename) |
| Profile photo | replace `images/himanshu.jpg` (square-ish crop works best) |
| Add a client website | `script.js` → add an object to the `WORK` array (`n` name, `u` url, `c` category, `d` description) |
| Add a Python project | `index.html` → copy a `<article class="feat-card …>` block inside `#projects` |
| Skill levels | `index.html` → `data-w="80"` on each `.bar i` |
| Stats numbers | `index.html` → `data-count` / `data-suffix` in the `.stats` block |

## Deploying

GitHub Pages serves whatever is on the default branch. Push (or upload via
**Add file → Upload files** on github.com) and the site updates in about a minute.

## Notes

- Fully responsive down to 360px; tested at 390px and 1440px.
- Accessible: keyboard navigable, focus styles, `prefers-reduced-motion` respected, semantic landmarks.
- SEO: meta description, Open Graph tags and JSON-LD `Person` schema so the site shows up
  properly when a recruiter googles the name or shares the link.
- Only external request is Google Fonts. Everything else is local.
