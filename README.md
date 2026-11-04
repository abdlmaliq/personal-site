# Abdulmalik Afegbua portfolio

A static, single-page portfolio for Abdulmalik Afegbua, IT Support Specialist and WordPress Web Developer.

## Edit content

- Update copy, links, certification URLs, and form text in `index.html`.
- Adjust the visual system in the `:root` variables at the top of `styles.css`.
- The supplied portrait is already integrated: use `images/abdulmalik-fullbody.webp` for full-body compositions and `images/abdulmalik-headshot.webp` for profile/headshot compositions.
- Replace the `hello@example.com` placeholder in the Contact section and `script.js` mailto fallback with your real email.
- If you have a production domain, add its absolute URL to the canonical/OG tags and `sitemap.xml`.

## Preview locally

From the project root:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## Netlify

This is a no-build static site. Drag the project folder into Netlify Drop, or connect the repository in Netlify with:

- Build command: `true`
- Publish directory: `.`

The site loads GSAP, ScrollTrigger, and Lenis from CDNs for progressive enhancement. If a CDN is unavailable, the page remains readable and interactive with native browser behavior.

## Notes

The hero and contact visual use the supplied full-body cutout; the About profile card uses the transparent headshot crop. The email address, production domain, AWS Credly URL, and project-specific imagery remain to be supplied.
