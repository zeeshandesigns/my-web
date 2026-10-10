/** Guard against accidentally publishing a portfolio with placeholder SEO settings. */
const errors = [];
const site = process.env.PUBLIC_SITE_URL;
let url;
try { url = new URL(site || ''); } catch { errors.push('Set PUBLIC_SITE_URL to the final https:// website domain.'); }
if (url && (url.protocol !== 'https:' || url.hostname === 'example.com' || url.hostname.endsWith('.example'))) errors.push('PUBLIC_SITE_URL must be an actual HTTPS domain.');
if (process.env.PUBLIC_ALLOW_INDEXING !== 'true') errors.push('To launch, set PUBLIC_ALLOW_INDEXING=true after reviewing public content.');
if (errors.length) {
  console.error('Pre-launch checks require attention:');
  for (const message of errors) console.error(` - ${message}`);
  process.exit(1);
}
console.log('Configuration checks passed. Manual checks for real assets, personal details and links are still required.');
