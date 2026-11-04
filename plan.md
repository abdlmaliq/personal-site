# Abdulmalik Afegbua portfolio — implementation plan

## Scope
A single-route, static portfolio website for Abdulmalik Afegbua, built with semantic HTML, CSS, and vanilla JavaScript. The site is intentionally dependency-light: GSAP/ScrollTrigger and Lenis are loaded from public CDNs for motion, while the page remains readable and functional if those libraries are unavailable.

## Implementation approach
- `index.html` contains the complete portfolio copy in the initial document so the page is crawlable and readable without JavaScript. Motion-only hidden states are enabled only when the enhancement script runs.
- `styles.css` owns the visual system: editable CSS variables, near-black navy surfaces, cyan/violet glows, editorial type hierarchy, glass panels, circuit/grid motifs, focus states, and responsive breakpoints.
- `script.js` progressively enhances the page with intro reveal, Lenis smoothing, ScrollTrigger parallax, horizontal project rail pinning, count-up stats, typewriter roles, cursor trail, magnetic/tilt interactions, testimonial carousel controls, and active navigation state.
- Motion is restricted to transforms and opacity where possible. `prefers-reduced-motion` disables scroll-linked motion and cursor effects; narrow viewports use fewer depth layers and native horizontal overflow.
- Contact uses a direct `mailto:` link rather than a pretend form; the static site does not collect or submit messages.
- Placeholder project visuals are CSS-generated, not fabricated personal photography. The `images/` folder is reserved for future avatar, project, and badge assets.
- `public/manus-routes.json`, `robots.txt`, and `sitemap.xml` support the single public route. Canonical/OG URLs are left out until a real public domain is known rather than guessing an internal preview origin.

## Project structure
- `index.html` — semantic one-page content, metadata, Person schema, accessible controls.
- `styles.css` — design tokens, layout, responsive rules, visual motifs, motion states.
- `script.js` — progressive enhancement and interaction orchestration.
- `public/manus-routes.json` — route manifest for the managed preview/publish pipeline.
- `robots.txt` / `sitemap.xml` — crawler guidance; sitemap stays domain-neutral until a production domain is configured.
- `images/README.md` — asset replacement notes and intended filenames.
- `README.md` — editing and GitHub-to-Vercel deployment instructions.
- `TODO.md` — acceptance outcomes and remaining user-supplied values.

## Design direction

### Considered styles
- **Command-center editorial** — 0.07 probability: cinematic infrastructure UI with oversized typography and orbital depth.
- **Luminous brutalist** — 0.06 probability: stark type, hard edges, and electric color blocks.
- **Soft cybernetic atelier** — 0.05 probability: quiet gradients, tactile cards, and ambient technical diagrams.

### Chosen movement
**Command-center editorial**: a calm, premium interface that treats the page as a navigable technical environment rather than a conventional portfolio template.

### Core principles
1. Depth should communicate capability: layers, rails, nodes, and shadows all imply systems thinking.
2. Editorial typography should lead; decoration supports hierarchy instead of competing with it.
3. Interactions should feel controlled and responsive, never noisy or ornamental for its own sake.
4. Every animated moment needs a static, keyboard-accessible equivalent.

### Color philosophy
Near-black navy creates a quiet command surface. Cyan is the signature signal color: clear, precise, and infrastructural. Violet introduces creative range without breaking the technical mood. Off-white copy preserves calm readability over the glow.

### Layout paradigm
A vertical story interrupted by horizontal “system rails”: oversized section labels drift behind asymmetrical content, while the work section becomes a pinned track that feels like moving through a project archive.

### Signature elements
- A three-layer network field in the hero with nodes and connecting lines.
- Glass cards with tiny monospace metadata, signal bars, and depth shadows.
- Large outlined section markers that drift horizontally behind content.

### Interaction philosophy
Hover states act like a system responding to input: cards tilt by a few degrees, cursor scale increases on targets, and focus states use a bright ring. No interaction hides information that is only available to a mouse.

### Animation
Use a short loading veil, staggered hero word reveal, smooth section entry, slow ambient drift, scroll-scrubbed parallax, and a pinned project rail. Keep all motion on transform/opacity, reduce layers on mobile, and disable it for reduced-motion preferences.

### Typography system
Space Grotesk is the display face, Inter is the reading face, and JetBrains Mono labels metadata. Headlines are tight and oversized; body copy stays between 16–19px with generous line-height; monospace labels are uppercase, letter-spaced, and cyan-tinted.

### Brand essence
**Infrastructure fluency with a designer’s eye — for teams who need technology to stay dependable and feel considered.** Personality: precise, calm, inventive.

### Brand voice
Direct, observant, and quietly confident. Example lines: “Make the system feel simple.” and “Reliable behind the scenes. Thoughtful on the screen.”

### Wordmark & logo
A compact `AF/` monogram mark inside a rounded signal frame; the slash reads as both a route and a current pulse.

### Signature brand color
`#73F6FF` — Signal Cyan, used for active states, links, and the primary glow.
