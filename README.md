# Zeeshan Haider — Personal Portfolio (Astro)

Astro source migration of the approved multi-page HTML prototype. **This is a new independent website**, not an iteration of the Zynk business website.

## Install and start

Requires Node.js 20.3+ or 22+ and internet access to the npm registry for the initial install.

```bash
npm install
npm run dev
```

Open http://localhost:4321. Production build:

```bash
npm run build
npm run preview
```

Run `npm run audit` without installing packages to check that route templates, imports, project records and content structure are present.

The source is designed for **Astro 5** content collections. Use `npm run check` to run Astro/TypeScript diagnostics (requires `@astrojs/check`).

**Build verification in the handoff environment:** npm registry resolution failed (`EAI_AGAIN`), therefore dependency installation and `astro build` could not be executed here. Static structural checks and link audits are included separately. Do not claim the project has passed a real Astro build until running the commands above in an online environment.

## Routes

| Path | Purpose |
|---|---|
| `/` | Approved homepage |
| `/work/` | Project gallery with category filters |
| `/work/[slug]/` | Individual project case studies, generated from Markdown |
| `/about/` | Professional story plus space for personal information |
| `/resume/` | Expanded digital CV |
| `/notes/` | Design articles, insights, front-end learning updates |
| `/notes/learning-log/` | Filtered beginner learning journal |
| `/notes/[slug]/` | Article pages generated from Markdown |
| `/contact/` | Contact via email, LinkedIn and resume |

## Update content

- Edit `src/data/profile.ts` for name, email, location, and LinkedIn.
- Edit text/markup in `src/components/home/` for the homepage sections.
- Add/edit a project in `src/content/projects/<slug>.md` (eight CV-based projects included). Project title, description, category, tags, role, context, deliverables and visual preview are frontmatter fields. `cover` can be an image path under `/public/images/`, such as `/images/etg-cover.webp`.
- Projects appear automatically on `/work/`, and each has a `/work/<slug>/` page. Featured homepage projects are selected by slug in `src/components/home/FeaturedWork.astro`. The fourth featured social media slot is intentionally reserved until a real project is selected.
- Add a real note in `src/content/notes/<slug>.md`. Start from `examples/note-template.md`, provide a real publication date, and set `draft: false`. Notes automatically appear on `/notes/`, and `category: learning` entries also appear on `/notes/learning-log/`.
- Pages use `BaseLayout.astro` for header, footer, metadata and site structure; reusable project components live under `src/components/`.
- Design tokens and site styling: `src/styles/global.css`.
- The menu and work filters are implemented in `src/scripts/site.ts`.

## Factual accuracy and launch checklist

Source content is the user's supplied two-page CV, *Zeeshan Designer CV.pdf*. It contains professional experience, project scope and education. The website **does not invent** client results, screenshots or blog posts.

Before publishing:

1. Confirm degree completion status. The CV calls Zeeshan a graduate but dates BBIT to December 2026.
2. Replace the portrait and all project preview placeholders with approved real images.
3. Confirm the second featured social campaign and update `FeaturedWork.astro` accordingly.
4. Confirm that client identities, work samples and result metrics may be published.
5. Add actual articles/learning entries; the publishing system has an honest empty state.
6. Add a reviewed, up-to-date PDF resume only after deciding what contact information should be public.
7. License **GT Walsheim** for web usage; it is not included. Montserrat loads through Google Fonts.
8. Configure `PUBLIC_SITE_URL` (or change `site` in `astro.config.mjs`) to your domain before deploying. The default is `https://example.com` for local development only. `/sitemap.xml` and `/robots.txt` are generated automatically and will use the configured `site` URL.
9. Run `npm install`, `npm run check`, and `npm run build`, then test keyboard/mobile navigation and real links.
10. Do not mark the website indexable until after final approval. Set `PUBLIC_ALLOW_INDEXING=true` only when public content is verified.

## Hosting

Astro builds static pages to `dist/`. On Vercel select **Astro** as the framework preset, build command `npm run build`, output `dist` (usually detected automatically).

**Safe-by-default indexing:** the code emits `noindex` and `Disallow: /` until both `PUBLIC_SITE_URL` points to the actual HTTPS domain and `PUBLIC_ALLOW_INDEXING=true`. Leave indexing disabled for WIP/preview sites. Before launch run `npm run launch:check` in an environment where both variables are set. The check validates configuration, not the accuracy or authorization of public content.

**GitHub:** this project belongs in a brand-new repository, not `ZynkWeb`. After creating an empty repository, add the project files at the root and push to `main`. `.github/workflows/validate.yml` will automatically run the structural audit, Astro checks and production build on pushes and pull requests. The initial workflow uses `npm install` because no lockfile could be generated in this offline handoff; run `npm install` in an online environment and commit its generated `package-lock.json`, then switch the workflow install command to `npm ci` for reproducible builds.

**Before deployment:** ensure a green GitHub Actions validation run, verify the actual built site visually, and add verified real assets and the approved PDF resume. Do not publish the WIP site as a finished job-search portfolio.

## Privacy

No analytics, database, contact form, tracking, or booking system. Public contact is via email and LinkedIn already present in the supplied CV. Phone number is deliberately omitted. No memory persistence is required for project work.
