# GT Walsheim webfont handoff

The portfolio uses `GT Walsheim` for display headings and `Montserrat` for body text.
GT Walsheim is a commercial font and has not been included or redistributed.

When you have legitimate WOFF2 webfont files and the appropriate website license:

1. Add them to `public/fonts/` (e.g. `GT-Walsheim-Regular.woff2` and `GT-Walsheim-Medium.woff2`).
2. At the start of `src/styles/global.css`, add:

```css
@font-face {
  font-family: 'GT Walsheim';
  src: url('/fonts/GT-Walsheim-Regular.woff2') format('woff2');
  font-style: normal;
  font-weight: 400;
  font-display: swap;
}
@font-face {
  font-family: 'GT Walsheim';
  src: url('/fonts/GT-Walsheim-Medium.woff2') format('woff2');
  font-style: normal;
  font-weight: 500 700;
  font-display: swap;
}
```

3. Test all text weights and headings. If the font files are not variable, assign only their exact supported weights rather than claiming a weight range.
4. Confirm the web license permits hosting the files on this site.

Until then, headings use the existing fallback stack without missing-font requests.
