# Prime Care Services — Website

A multi-page marketing site for Prime Care Services Inc. (in-home care + healthcare staffing, British Columbia).

## What's inside

```
index.html      Home
services.html   In-home care services + facility staffing
about.html      Story, values, team
careers.html    Open roles + apply CTA
contact.html    Contact form (Formspree) + info
css/styles.css  All styles, design tokens, animations
js/main.js      Nav toggle, scroll reveal, hero animation, form handling
assets/logo.png Your logo
```

No build step — plain HTML/CSS/JS. Works as-is on GitHub Pages.

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

Search each HTML file for anything that needs updating: phone number, email, address, service areas, and the two placeholder testimonials on the homepage (swap in real reviews once you have more — see the SEO review notes for why that matters).

## Publishing to GitHub Pages

1. Create a new repository on GitHub (e.g. `primecare-website`), public.
2. Upload all files in this folder to the repository, keeping the folder structure intact (`css/`, `js/`, `assets/` as subfolders).
   - Easiest way: on the repo page, click **Add file → Upload files**, drag in everything, commit.
3. Go to the repo's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
5. GitHub gives you a URL like `https://yourusername.github.io/primecare-website/` within a minute or two.

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
