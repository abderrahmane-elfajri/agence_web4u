import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';

const root = process.cwd();
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (['dist', 'node_modules', 'WORK'].includes(entry.name)) continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) files.push(path);
  }
}
await walk(root);
const errors = [];
const canonicalUrls = new Set();
const pagesByCanonical = new Map();
for (const file of files) {
  const html = await readFile(file, 'utf8');
  const fileName = relative(root, file).replaceAll('\\', '/');
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) {
    const url = match[1].split(/[?#]/)[0];
    if (!url || /^(?:https?:|mailto:|tel:|data:|#)/.test(url)) continue;
    const localPath = url.startsWith('/') ? resolve(root, `.${url}`) : resolve(dirname(file), url);
    try { await access(localPath); }
    catch { errors.push(`${fileName} -> ${url}`); }
  }
  if (!/<main[^>]+id="main-content"/.test(html)) errors.push(`${fileName} -> missing main landmark`);

  const language = html.match(/<html[^>]*\blang="([^"]+)"/)?.[1];
  if (!language) errors.push(`${fileName} -> missing html language`);
  if (language === 'ar' && !/<html[^>]*\bdir="rtl"/.test(html)) errors.push(`${fileName} -> Arabic page missing dir="rtl"`);

  const h1Count = (html.match(/<h1\b/g) || []).length;
  if (h1Count !== 1) errors.push(`${fileName} -> expected 1 h1, found ${h1Count}`);

  if (!fileName.endsWith('thank-you.html') && !/<meta\s+name="robots"\s+content="[^"]*noindex/.test(html)) {
    const description = html.match(/<meta\s+name="description"\s+content="([^"]*)"/)?.[1]?.trim();
    if (!description) errors.push(`${fileName} -> missing meta description`);
    const canonical = html.match(/<link\s+rel="canonical"\s+href="([^"]+)"/)?.[1];
    if (!canonical) errors.push(`${fileName} -> missing canonical URL`);
    else {
      canonicalUrls.add(canonical);
      pagesByCanonical.set(canonical, fileName);
    }
    for (const locale of ['x-default', 'en', 'fr', 'ar']) {
      if (!new RegExp(`<link\\s+rel="alternate"\\s+hreflang="${locale}"\\s+href="[^"]+"`).test(html)) {
        errors.push(`${fileName} -> missing ${locale} alternate`);
      }
    }
  }

  for (const script of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try { JSON.parse(script[1]); }
    catch (error) { errors.push(`${fileName} -> invalid JSON-LD: ${error.message}`); }
  }

  for (const image of html.matchAll(/<img\b([^>]*)>/g)) {
    const attrs = image[1];
    if (!/\balt="[^"]*"/.test(attrs)) errors.push(`${fileName} -> image missing alt`);
    if (!/\bwidth="\d+"/.test(attrs) || !/\bheight="\d+"/.test(attrs)) {
      errors.push(`${fileName} -> image missing width/height`);
    }
  }
}

const sitemap = await readFile(join(root, 'sitemap.xml'), 'utf8');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = match[1];
  if (!canonicalUrls.has(url)) errors.push(`sitemap.xml -> URL has no canonical source page: ${url}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`Checked ${files.length} HTML files: links, landmarks, metadata, languages, images, JSON-LD, and sitemap are valid.`);
