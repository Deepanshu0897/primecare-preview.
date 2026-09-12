# Prime Care Services — Website

A multi-page marketing site for Prime Care Services Inc. (in-home care + healthcare staffing, British Columbia).

## What's inside

```
index.html      Home
services.html   In-home care services + facility staffing
about.html      Story, values, team
careers.html    Open roles + apply CTA
contact.html    Contact form (Formspree) + info
styles.css      All styles, design tokens, animations
main.js         Nav toggle, scroll reveal, hero animation, form handling
logo.png        Your logo
```

Everything lives at one level — no subfolders. This is deliberate: GitHub's web upload tool doesn't reliably preserve folder structure when you drag in files, so keeping everything flat avoids that problem entirely.

No build step — plain HTML/CSS/JS. Works as-is on GitHub Pages.

## Publishing to GitHub Pages

1. Create a new repository on GitHub, public.
2. Click "uploading an existing file" (on a fresh repo) or "Add file → Upload files".
3. Drag in all 9 files from this folder at once: the 5 `.html` files, `styles.css`, `main.js`, `logo.png`, and `README.md`. Since there are no subfolders, plain drag-and-drop works correctly here — commit.
4. Go to the repo's **Settings → Pages**.
5. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
6. GitHub gives you a URL like `https://yourusername.github.io/repo-name/` within a minute or two.

## Before you publish: 2 things to set up

### 1. Connect the contact form to your email (Formspree)

The form in `contact.html` currently points to a placeholder:

```html
<form class="care-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

To make it actually deliver messages to your inbox:

1. Go to [formspree.io](https://formspree.io) and sign up free (50 submissions/month on the free tier).
2. Create a new form, connect it to `admin@primecares.ca` (or whichever inbox you want).
3. Copy the form ID Formspree gives you (looks like `mzbqwxyz`).
4. In `contact.html`, replace `YOUR_FORM_ID` with that ID.
5. Submit a test message once the site is live to confirm delivery.

### 2. Double-check the details

Search each HTML file for anything that needs updating: phone number, email, address, service areas, and the two placeholder testimonials on the homepage (swap in real reviews once you have more).

Note: the contact form's Formspree endpoint is already live (`formspree.io/f/meaqdwrn`) — no action needed there unless you want to change which inbox it delivers to.

## Using your own domain (primecares.ca)

Once you're happy with the preview:

1. In the same **Settings → Pages** section, enter `primecares.ca` (or `www.primecares.ca`) under "Custom domain."
2. GitHub will show you DNS records to add. Log into wherever primecares.ca is registered (GoDaddy, based on the current site) and add:
   - An `A` record pointing `@` to GitHub's IP addresses (GitHub's Pages docs list the current ones), or
   - A `CNAME` record pointing `www` to `yourusername.github.io`
3. DNS changes can take a few hours to a day to fully propagate.
4. Once it resolves, check "Enforce HTTPS" in the same settings panel.

This is the step where you'll be replacing your current GoDaddy-builder site, so it's worth previewing thoroughly first — hence starting on the github.io URL rather than pointing the domain immediately.

## Image licensing note

All photography is sourced from Pexels under their free license (free for commercial use, no attribution legally required, per pexels.com/license). No real Prime Care staff or clients are depicted — swap in your own team/client photos over time as you collect consented images, since real photos of your actual caregivers will build more trust than any stock photo.

## Accessibility & performance notes

- Respects `prefers-reduced-motion` — animations disable for users who request it.
- All interactive elements are keyboard-focusable with visible focus states.
- Images use descriptive alt text.
- Fonts load from Google Fonts CDN (Fraunces + Work Sans); no other external dependencies besides Formspree.
