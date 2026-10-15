# Zeeshan Haider — Personal Portfolio

A custom, multi-page, static personal portfolio with an editorial visual system and professional experience, an awarded degree, education and an icon-based toolkit on the homepage. Built with **Astro 5 + TypeScript**, a clean white/blue visual system, and structured Markdown content. This website represents **Zeeshan Haider**; it is not a Zynk-branded website.

**Status:** Site implementation is ready for its owner's deployment. Real project screenshots, full case-study results, a personal portrait, and licensed GT Walsheim webfont files are still to be supplied. The domain must also be configured before public launch. The website intentionally uses visible mock visuals and is **not indexed by search engines by default**.

## Run the project

Requires Node.js 22 and npm:

```bash
npm install
npm run dev
```

Local development: http://localhost:4321.

```bash
npm run audit     # Structural/content validation (no dependencies required)
npm run check     # Astro + TypeScript diagnostics
npm run build     # Compile all static pages
npm run smoke     # Check generated routes/assets/internal links after build
npm run preview   # Local production preview
```

The `.github/workflows/validate.yml` pipeline automatically performs these checks on pushes and pull requests. The built `dist/` website is uploaded as a downloadable GitHub Actions artifact (retained for 14 days), not auto-deployed.

## Site pages

| Route | Page |
|---|---|
| `/` | Homepage with featured projects, experience, education, skills and tools |
| `/work/` | All work, client-work discipline filters, search |
| `/work/<slug>/` | Individual editable case-study pages |
| `/about/` | Personal background, approach and university activities |
| `/contact/` | Email, LinkedIn, GitHub and homepage experience link |
| `/privacy/` | Clear static-site privacy information |
| `/404.html` | Custom error page |
| `/sitemap.xml` and `/robots.txt` | Generated crawlers' files |

## Where to change things

- **Personal identity and contact**: `src/data/profile.ts`; site/social settings: `src/data/site.ts`.
- **Homepage**: `src/components/home/`; reusable page layout: `src/layouts/BaseLayout.astro`.
- **Experience, education and skills**: `src/components/home/ExperiencePreview.astro`. Dates and claims are based on the supplied CV; review before public launch.
- **About/personality**: `src/pages/about.astro`. A few known university activities are included; replace any "photo to be added" caption with the approved actual portrait.
- **Projects**: `src/content/projects/*.md`; see `examples/project-template.md` and frontmatter schema `src/content.config.ts`. New approved projects automatically get their own page and appear in Work. Add verified screenshots using `cover` and optional `gallery` items, with meaningful image descriptions; add `projectUrl`, `repositoryUrl`, `process`, or `outcome` if applicable.
- **Homepage featured four projects**: `src/components/home/FeaturedWork.astro`. Currently 2 UI, 1 social, and 1 clearly reserved social slot. Replace `ReservedProject` only once the fourth real client campaign is selected and approved.
- **Design tokens and style**: `src/styles/global.css`; `src/styles/font-installation.md` explains how to install GT Walsheim legally once you supply your files.
- **Interactions**: `src/scripts/site.ts` implements an accessible mobile menu, Work filters/search and Copy Email. Navigation and content remain useful without JavaScript.

## Adding visuals

Place your approved images under `public/images/`, preferably compressed WebP/AVIF where appropriate. Reference images by absolute site paths such as `/images/elite-top-guards-cover.webp`. Project and gallery images should have descriptive alt text. Keep screenshot copy readable and do not upload private information, source design files that cannot be shared, or unverified performance statistics. See each `src/content/projects/*.md` file for the existing factual case-study text.

No work samples or client-results graphics have been invented. The current abstract previews are visibly marked as illustrative placeholders; replace them before job applications or launching the site publicly.

## Fonts

Montserrat is currently loaded from Google Fonts for body text. GT Walsheim is a licensed typeface. Files are present under `public/fonts/`, but the font stylesheet is not activated. Confirm redistribution permission before enabling. Current headings use fallback type; when you have your licensed WOFF2 files, follow `src/styles/font-installation.md`.

## Owner deployment (Vercel or another static host)

Set framework preset to **Astro**, build command to `npm run build`, and publish directory to `dist` (often detected automatically).

For the target **public** domain, add:

```bash
PUBLIC_SITE_URL=https://your-real-domain.example
PUBLIC_ALLOW_INDEXING=false
```

`PUBLIC_SITE_URL` must be the final HTTPS domain, not `example.com`, before public launch. Keep `PUBLIC_ALLOW_INDEXING=false` on previews or while work samples are incomplete. This creates robots noindex and disallow policies by default.

**After checking real client content, links, copyright permissions, personal details, deployment, and QA**, change `PUBLIC_ALLOW_INDEXING=true` and rebuild. `npm run launch:check` checks indexing/domain configuration; it does not replace human content approvals.

## Final owner review

1. BBIT graduation status is confirmed by the owner as **degree awarded**. The homepage now explicitly states this.
2. Upload approved project previews and optional galleries; replace the reserved homepage social placement. The current hero art is a deliberate abstract composition, not a portrait placeholder.
3. Confirm project permissions, employer and client naming, outcome data, real live demo links, and accessibility of images.
5. Install GT Walsheim with the appropriate license and check fonts across pages.
6. Verify your email, LinkedIn, and GitHub account links and confirm what contact information should be public.
7. Test mobile keyboard navigation, responsive grids, and project filters in the deployed environment.
8. Confirm domain, favicon, social image, robots policy, canonical URLs, and the sitemap endpoint.
9. Update `src/pages/privacy.astro` if you enable forms, analytics, or third-party embeds later.

This repository contains no Supabase connection, admin credentials, booking system, payment processing, or user-data collection backend.
