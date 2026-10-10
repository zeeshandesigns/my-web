/** Test output paths, canonical/SEO markup, and static link integrity after Astro builds. */
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve('dist');
const failures = [];
if (!fs.existsSync(root)) {console.error('Build dist/ first.');process.exit(1);}
const pagePaths = ['/', '/work/', '/work/elite-top-guards/', '/about/', '/resume/', '/notes/', '/notes/learning-log/', '/contact/', '/privacy/'];
const pathToFile = pathname => path.join(root,pathname.endsWith('/')?`${pathname}index.html`:pathname);
for(const page of pagePaths) {
  const file = pathToFile(page);
  if(!fs.existsSync(file)) failures.push(`Missing route: ${page}`);
  else {
    const html=fs.readFileSync(file,'utf8');
    if(!/<main\s[^>]*id="main-content"/.test(html)) failures.push(`Main landmark missing on ${page}`);
    if(!html.includes('rel="canonical"')) failures.push(`Canonical missing on ${page}`);
    if(!html.includes('property="og:image"')) failures.push(`Social share image missing on ${page}`);
    if(!html.includes('name="robots"')) failures.push(`Robots policy missing on ${page}`);
  }
}
const required = ['404.html','rss.xml','robots.txt','sitemap.xml','og-cover.png','favicon.svg'];
for (const f of required) if(!fs.existsSync(path.join(root,f))) failures.push(`Missing generated artifact: ${f}`);
const walk = dir => fs.readdirSync(dir,{withFileTypes:true}).flatMap(d=>d.isDirectory()?walk(path.join(dir,d.name)):[path.join(dir,d.name)]);
for(const file of walk(root).filter(f=>f.endsWith('.html'))) {
  const html=fs.readFileSync(file,'utf8');
  for(const match of html.matchAll(/\bhref="(\/[^"]*)"/g)) {
    const value=match[1].split(/[?#]/,1)[0];
    if(!value) continue;
    const exists=fs.existsSync(path.join(root,value)) || fs.existsSync(pathToFile(value));
    if(!exists) failures.push(`${path.relative(root,file)}: unresolved internal link ${value}`);
  }
}
if(failures.length){console.error(failures.join('\n'));process.exit(1);}
console.log(`Smoke tests passed: ${pagePaths.length} core routes, ${required.length} static outputs and internal links.`);
