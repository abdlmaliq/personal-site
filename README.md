# Abdulmalik Afegbua portfolio

A static, single-page portfolio for Abdulmalik Afegbua, IT Support Specialist and WordPress Web Developer.

## Edit content

- Update copy, links, and certification URLs in `index.html`.
- Adjust the visual system in the `:root` variables at the top of `styles.css`.
- The supplied portrait is already integrated: use `images/abdulmalik-fullbody.webp` for full-body compositions and `images/abdulmalik-headshot.webp` for profile/headshot compositions.
- Update the public contact address in the Contact section and Person schema in `index.html`.
- The Contact section uses a direct `mailto:` link. It opens the visitor's email app; the site does not collect or submit messages.
- When a production domain is available, add its absolute URL to the canonical and social metadata, `robots.txt`, and `sitemap.xml`.

## Preview locally

From the project root:

```bash
python3 -m http.server 3000
```

Then open `http://localhost:3000`.

## GitHub and Vercel deployment

This is a static site with no package manager, dependencies, or build step. To deploy it:

1. Push the project files to a GitHub repository.
2. In Vercel, choose **Add New → Project**, import the repository, and set the project root to the repository root.
3. Keep the framework preset as **Other** and deploy. [`vercel.json`](./vercel.json) configures the no-op build, publishes the project root, and adds baseline security headers.

Vercel creates preview deployments for repository changes and a production deployment for the configured production branch. No `package.json` or install command is required. The site loads GSAP, ScrollTrigger, and Lenis from CDNs for progressive enhancement. If JavaScript or a CDN is unavailable, the page remains visible and its native links and controls remain usable.

## Notes

The hero and contact visual use the supplied full-body cutout; the About profile card uses the transparent headshot crop. After the first Vercel deployment, add the assigned production URL as the canonical URL, Open Graph URL/image, and sitemap URL in `index.html`, `robots.txt`, and `sitemap.xml`. The production domain, AWS Credly URL, and project-specific imagery remain to be supplied.

Animations intentionally run regardless of the visitor's operating-system reduced-motion preference, as requested.
