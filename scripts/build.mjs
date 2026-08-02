import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { minify } from 'terser';
import CleanCSS from 'clean-css';

const root = process.cwd();
const dist = join(root, 'dist');
await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

for (const name of ['assets', 'ar', 'fr', 'insights']) await cp(join(root, name), join(dist, name), { recursive: true });
await rm(join(dist, 'assets/icons'), { recursive: true, force: true });
await rm(join(dist, 'assets/images/brand/main-logo.png'), { force: true });
for (const name of ['index.html', 'about.html', 'services.html', 'portfolio.html', 'blog.html', 'contact.html', 'privacy.html', 'terms.html', '404.html', 'thank-you.html', 'robots.txt', 'sitemap.xml', 'site.webmanifest', '.htaccess', '_headers']) {
  await cp(join(root, name), join(dist, name));
}

const css = await readFile(join(root, 'assets/css/style.css'), 'utf8');
const cssResult = new CleanCSS({ level: 2 }).minify(css);
if (cssResult.errors.length) throw new Error(cssResult.errors.join('\n'));
await writeFile(join(root, 'assets/css/style.min.css'), cssResult.styles);
await writeFile(join(dist, 'assets/css/style.min.css'), cssResult.styles);

const js = await readFile(join(root, 'assets/js/main.js'), 'utf8');
const jsResult = await minify(js, { compress: true, mangle: true });
await writeFile(join(root, 'assets/js/main.min.js'), jsResult.code);
await writeFile(join(dist, 'assets/js/main.min.js'), jsResult.code);

async function switchToMinified(dir) {
  const { readdir } = await import('node:fs/promises');
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await switchToMinified(path);
    else if (entry.name.endsWith('.html')) {
      const html = (await readFile(path, 'utf8'))
        .replace(/assets\/css\/style\.css/g, 'assets/css/style.min.css')
        .replace(/assets\/js\/main\.js/g, 'assets/js/main.min.js');
      await writeFile(path, html);
    }
  }
}
await switchToMinified(dist);
