/** Dependency-free structural audit. Run `npm run audit` even before installing Astro. */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const base = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const failures = [];
const check = (condition, message) => { if (!condition) failures.push(message); };
const exists = file => fs.existsSync(path.join(base,file));
const read = file => fs.readFileSync(path.join(base,file), 'utf8');
const content = folder => fs.readdirSync(path.join(base,folder)).filter(n=>n.endsWith('.md'));
const pages = ['src/pages/index.astro','src/pages/work/index.astro','src/pages/work/[slug].astro','src/pages/about.astro','src/pages/resume.astro','src/pages/notes/index.astro','src/pages/notes/learning-log/index.astro','src/pages/notes/[slug].astro','src/pages/contact.astro'];
pages.forEach(file => check(exists(file), `Missing page: ${file}`));
const projectFiles = content('src/content/projects');
const slugs = new Set(projectFiles.map(file=>file.slice(0,-3)));
const originalProjects = ['elite-top-guards','startex-marketing','pulse-real-estate','nutrisense-ai','uk-security-sector','classy-jumbo-master','ibit-convocation','twicsy-ux-audit'];
for (const slug of originalProjects) check(slugs.has(slug), `Missing original CV project: ${slug}`);
check(slugs.size === projectFiles.length, 'Duplicate project slugs');
for (const file of projectFiles) {
  const text = read(`src/content/projects/${file}`);
  for (const key of ['title','description','category','filters','tags','sortOrder','showcaseLabel','preview','role','engagement','contribution','context','deliverables','draft'])
    check(new RegExp(`^${key}:`, 'm').test(text), `${file}: missing ${key}`);
  check(text.startsWith('---\n'), `${file}: frontmatter delimiter missing`);
}
const featured = read('src/components/home/FeaturedWork.astro');
for(const slug of ['elite-top-guards','startex-marketing','pulse-real-estate']) check(featured.includes(`'${slug}'`), `Missing featured project ${slug}`);
check(read('src/pages/index.astro').includes('<ReservedProject')===false, 'Home reserved slot should belong to FeaturedWork component');
check(featured.includes('<ReservedProject'), 'Featured Work needs second social media placeholder');
check(exists('src/content.config.ts'), 'Missing collections schema');
check(exists('src/pages/sitemap.xml.ts') && exists('src/pages/robots.txt.ts'),'Missing SEO endpoints');
check(!exists('public/resume.pdf'), 'Do not publish an unreviewed CV');
const allAstro = [];
const walk = dir => {for (const item of fs.readdirSync(dir, {withFileTypes:true})) {const p=path.join(dir,item.name); if(item.isDirectory())walk(p);else if(p.endsWith('.astro'))allAstro.push(p);}};
walk(path.join(base,'src'));
for(const file of allAstro) {
 const src = fs.readFileSync(file,'utf8');
 for (const match of src.matchAll(/from\s+['"](\.[^'"]+)['"]/g)) {
   const pathname=path.resolve(path.dirname(file),match[1]);
   check(['', '.astro','.ts','.js','.mjs','.css'].some(ext=>fs.existsSync(pathname+ext)), `Bad import in ${path.relative(base,file)}: ${match[1]}`);
 }
}
if (failures.length) {console.error('Audit failed:');failures.forEach(f=>console.error('  -',f));process.exit(1);}
console.log(`Audit passed: ${pages.length} route templates, ${projectFiles.length} real project records, ${content('src/content/notes').length} note files, ${allAstro.length} Astro components/pages.`);
console.log('Reminder: structural audit is NOT an Astro compile or browser test.');
