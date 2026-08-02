import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';

const root = process.cwd();
const htmlFiles = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.name === 'dist' || entry.name === 'node_modules' || entry.name === 'WORK') continue;
    const path = join(dir, entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.name.endsWith('.html')) htmlFiles.push(path);
  }
}

await walk(root);

for (const path of htmlFiles) {
  const rel = relative(root, path).split(sep).join('/');
  const parts = rel.split('/');
  const locale = parts.length > 1 ? parts[0] : 'en';
  const page = parts.at(-1);
  const prefix = locale === 'en' ? '' : '../';
  let html = await readFile(path, 'utf8');

  const imageReplacements = new Map([
    ['assets/images/hero-web4u-premium.png', 'assets/images/hero/hero-web4u-premium.webp'],
    ['assets/images/service-web.svg', 'assets/images/services/service-web.webp'],
    ['assets/images/service-seo.svg', 'assets/images/services/service-seo.webp'],
    ['assets/images/service-social.svg', 'assets/images/services/service-social.webp'],
    ['assets/images/service-ads.svg', 'assets/images/services/service-ads.webp'],
    ['assets/images/service-branding.svg', 'assets/images/services/service-branding.webp'],
    ['assets/images/hero-dashboard.svg', 'assets/images/services/service-marketing.webp'],
    ['assets/images/hero-dashboard.jpg', 'assets/images/services/service-marketing.webp'],
    ['assets/images/portfolio-1.svg', 'assets/images/portfolio/portfolio-website.webp'],
    ['assets/images/portfolio-2.svg', 'assets/images/portfolio/portfolio-landing-page.webp'],
    ['assets/images/portfolio-3.svg', 'assets/images/portfolio/portfolio-seo.webp'],
    ['assets/images/blog-web.svg', 'assets/images/blog/blog-web-design.webp'],
    ['assets/images/blog-seo.png', 'assets/images/blog/blog-local-seo.webp'],
    ['assets/images/blog-social.svg', 'assets/images/blog/blog-social-media.webp'],
    ['assets/images/blog-social.png', 'assets/images/blog/blog-social-media.webp'],
    ['assets/images/team.svg', 'assets/images/about/team-web4u.webp'],
    ['assets/icons/apple-touch-icon.png', 'assets/images/brand/apple-touch-icon.png'],
    ['assets/icons/favicon-192x192.png', 'assets/images/brand/app-icon-192.png'],
    ['assets/icons/favicon-512x512.png', 'assets/images/brand/app-icon-512.png'],
    ['assets/icons/favicon-32x32.png', 'assets/images/brand/favicon.png'],
    ['assets/icons/favicon.svg', 'assets/images/brand/favicon.png']
  ]);
  for (const [oldPath, newPath] of imageReplacements) html = html.replaceAll(oldPath, newPath);
  if (page === 'portfolio.html') {
    html = html.replaceAll('assets/images/services/service-branding.webp', 'assets/images/portfolio/portfolio-branding.webp');
  }
  if (page === 'blog.html') {
    html = html.replaceAll('assets/images/services/service-ads.webp', 'assets/images/blog/blog-paid-advertising.webp');
  }
  html = html
    .replaceAll('width="1536" height="1024"', 'width="1600" height="1200"')
    .replaceAll('width="1568" height="1003"', 'width="1600" height="1200"')
    .replaceAll('width="960" height="620"', 'width="1200" height="750"')
    .replaceAll('width="1200" height="760"', 'width="1200" height="750"');
  html = html.replace(/\s*<link rel="icon"[^>]*>/g, '');
  html = html.replace('</head>', `  <link rel="icon" type="image/png" sizes="32x32" href="${prefix}assets/images/brand/favicon.png">\n</head>`);
  html = html.replace(/<meta property="og:image" content="[^"]+">/g, '<meta property="og:image" content="https://agenceweb4u.ma/assets/images/social/social-share-web4u.jpg">');
  if (html.includes('name="twitter:card"') && !html.includes('name="twitter:image"')) {
    html = html.replace(/(<meta name="twitter:card"[^>]+>)/, '$1\n  <meta name="twitter:image" content="https://agenceweb4u.ma/assets/images/social/social-share-web4u.jpg">');
  }

  if (html.includes('class="site-header"')) {
    const navigation = {
      en: {
        home: 'Home', about: 'About', services: 'Services', portfolio: 'Portfolio',
        blog: 'Blog', contact: 'Contact', menu: 'Open navigation',
        nav: 'Main navigation', languages: 'Language switcher', cta: 'Get a Free Quote',
        logo: 'Agence Web4U Home'
      },
      fr: {
        home: 'Accueil', about: 'À propos', services: 'Services', portfolio: 'Portfolio',
        blog: 'Blog', contact: 'Contact', menu: 'Ouvrir la navigation',
        nav: 'Navigation principale', languages: 'Sélecteur de langue', cta: 'Devis gratuit',
        logo: 'Accueil Agence Web4U'
      },
      ar: {
        home: 'الرئيسية', about: 'من نحن', services: 'الخدمات', portfolio: 'الأعمال',
        blog: 'المدونة', contact: 'اتصل بنا', menu: 'فتح القائمة',
        nav: 'القائمة الرئيسية', languages: 'تبديل اللغة', cta: 'احصل على عرض سعر',
        logo: 'الرئيسية - وكالة ويب فور يو'
      }
    }[locale];
    const languageHrefs = locale === 'fr'
      ? { en: `../${page}`, fr: page, ar: `../ar/${page}` }
      : locale === 'ar'
        ? { en: `../${page}`, fr: `../fr/${page}`, ar: page }
        : { en: page, fr: `fr/${page}`, ar: `ar/${page}` };
    const languageLinks = ['en', 'fr', 'ar'].map((language) => {
      const active = locale === language ? ' class="is-active" aria-current="true"' : '';
      return `<a${active} href="${languageHrefs[language]}" lang="${language}">${language.toUpperCase()}</a>`;
    }).join('');
    const header = `<header class="site-header" id="top">
    <div class="container nav-wrap">
      <a href="index.html" class="logo" aria-label="${navigation.logo}"><span class="logo-mark" aria-hidden="true"></span><span>AGENCE WEB4U</span></a>
      <button class="menu-toggle" type="button" aria-label="${navigation.menu}" aria-expanded="false"><span></span><span></span><span></span></button>
      <nav aria-label="${navigation.nav}">
        <ul class="nav-links">
          <li><a data-page="index.html" href="index.html">${navigation.home}</a></li>
          <li><a data-page="about.html" href="about.html">${navigation.about}</a></li>
          <li><a data-page="services.html" href="services.html">${navigation.services}</a></li>
          <li><a data-page="portfolio.html" href="portfolio.html">${navigation.portfolio}</a></li>
          <li><a data-page="blog.html" href="blog.html">${navigation.blog}</a></li>
          <li><a data-page="contact.html" href="contact.html">${navigation.contact}</a></li>
        </ul>
      </nav>
      <div class="nav-extra"><div class="lang-switcher" aria-label="${navigation.languages}">${languageLinks}</div><a href="contact.html" class="btn btn-primary nav-cta">${navigation.cta}</a></div>
    </div>
  </header>`;
    html = html.replace(/<header class="site-header"[\s\S]*?<\/header>/, header);
  }

  html = html.replace(/\s*<!-- Google Tag Manager -->[\s\S]*?<!-- End Google Tag Manager -->/g, '');
  html = html.replace(/\s*<!-- Google Tag Manager \(noscript\) -->[\s\S]*?<!-- End Google Tag Manager \(noscript\) -->/g, '');

  if (locale === 'fr' || locale === 'ar') {
    for (const localPage of ['about.html', 'services.html', 'portfolio.html', 'blog.html', 'contact.html']) {
      html = html.replaceAll(`href="../${localPage}"`, `href="${localPage}"`);
    }
  }

  const languageHrefs = locale === 'fr'
    ? { en: `../${page}`, fr: page, ar: `../ar/${page}` }
    : locale === 'ar'
      ? { en: `../${page}`, fr: `../fr/${page}`, ar: page }
      : { en: page, fr: `fr/${page}`, ar: `ar/${page}` };
  for (const language of ['en', 'fr', 'ar']) {
    const label = language.toUpperCase();
    const active = locale === language ? ' class="is-active" aria-current="true"' : '';
    const pattern = new RegExp(`<a[^>]*\\slang="${language}"[^>]*>${label}</a>`, 'g');
    html = html.replace(pattern, `<a${active} href="${languageHrefs[language]}" lang="${language}">${label}</a>`);
  }

  const slug = page === 'index.html' ? '' : page;
  const canonicalEn = `https://agenceweb4u.ma/${slug}`;
  const canonicalFr = `https://agenceweb4u.ma/fr/${page}`;
  const canonicalAr = `https://agenceweb4u.ma/ar/${page}`;
  const ownCanonical = locale === 'fr' ? canonicalFr : locale === 'ar' ? canonicalAr : canonicalEn;
  html = html.replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${ownCanonical}">`);
  html = html.replace(/\s*<link rel="alternate" hreflang="[^"]+" href="[^"]+">/g, '');
  const alternates = [
    `  <link rel="alternate" hreflang="x-default" href="${canonicalEn}">`,
    `  <link rel="alternate" hreflang="en" href="${canonicalEn}">`,
    `  <link rel="alternate" hreflang="fr" href="${canonicalFr}">`,
    `  <link rel="alternate" hreflang="ar" href="${canonicalAr}">`
  ].join('\n');
  html = html.replace(/(<link rel="canonical" href="[^"]+">)/, `$1\n${alternates}`);

  if (!html.includes('property="og:title"')) {
    const title = html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? 'Agence Web4U';
    const description = html.match(/<meta name="description" content="([^"]*)">/)?.[1] ?? '';
    html = html.replace('</title>', `</title>\n  <meta property="og:title" content="${title}">\n  <meta property="og:description" content="${description}">\n  <meta property="og:type" content="website">\n  <meta property="og:url" content="${ownCanonical}">\n  <meta property="og:image" content="https://agenceweb4u.ma/assets/images/hero-web4u-premium.png">\n  <meta name="twitter:card" content="summary_large_image">`);
  }

  if (!html.includes('rel="manifest"')) {
    html = html.replace(/(<link rel="icon"[^>]+>)/, `$1\n  <link rel="apple-touch-icon" href="${prefix}assets/icons/apple-touch-icon.png">\n  <link rel="manifest" href="${prefix}site.webmanifest">`);
  }

  if (!html.includes('class="skip-link"')) {
    const skipText = locale === 'fr' ? 'Aller au contenu' : locale === 'ar' ? 'انتقل إلى المحتوى' : 'Skip to content';
    html = html.replace(/<body([^>]*)>/, `<body$1>\n  <a class="skip-link" href="#main-content">${skipText}</a>`);
  }
  html = html.replace(/<main(?![^>]*\bid=)([^>]*)>/, '<main id="main-content"$1>');
  html = html.replace(/<img(?![^>]*\bdecoding=)([^>]+)>/g, '<img decoding="async"$1>');

  html = html.replace('name="_captcha" value="false"', 'name="_captcha" value="true"');
  if (html.includes('<form class="form-grid"') && !html.includes('name="_next"')) {
    const thankYouUrl = locale === 'fr'
      ? 'https://abderrahmane-elfajri.github.io/agence_web4u/fr/thank-you.html'
      : locale === 'ar'
        ? 'https://abderrahmane-elfajri.github.io/agence_web4u/ar/thank-you.html'
        : 'https://abderrahmane-elfajri.github.io/agence_web4u/thank-you.html';
    html = html.replace(/(<input type="hidden" name="_template" value="table">)/, `$1<input type="hidden" name="_next" value="${thankYouUrl}">`);
  }
  if (html.includes('<form class="form-grid"') && !html.includes('name="_url"')) {
    html = html.replace(/(<input type="hidden" name="_next" value="[^"]+">)/, `$1<input type="hidden" name="_url" value="${ownCanonical}">`);
  }
  html = html.replace(/<input id="name" name="name" type="text" required>/g, '<input id="name" name="name" type="text" autocomplete="name" maxlength="80" required>');
  html = html.replace(/<input id="email" name="email" type="email" required>/g, '<input id="email" name="email" type="email" autocomplete="email" maxlength="120" required>');
  html = html.replace(/<input id="phone" name="phone" type="tel" required>/g, '<input id="phone" name="phone" type="tel" autocomplete="tel" maxlength="30" required>');
  html = html.replace(/<textarea id="message" name="message" required><\/textarea>/g, '<textarea id="message" name="message" maxlength="2000" required></textarea>');
  if (html.includes('<form class="form-grid"') && !html.includes('name="_honey"')) {
    html = html.replace(/(<form class="form-grid"[^>]*>)/, '$1<input class="honeypot" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">');
    const note = locale === 'fr'
      ? 'En envoyant ce formulaire, vous acceptez que nous utilisions vos informations uniquement pour répondre à votre demande.'
      : locale === 'ar'
        ? 'بإرسال النموذج، توافق على استخدام معلوماتك فقط للرد على طلبك.'
        : 'By submitting, you consent to us using your information only to respond to your request.';
    html = html.replace(/(<button type="submit" class="btn btn-primary">)/, `<p class="form-note">${note}</p>$1`);
  }

  if (page === 'blog.html') {
    html = html.replaceAll('>Read More<', '>Discuss this topic<');
    html = html.replaceAll('>Lire plus<', '>Parler à un expert<');
    html = html.replaceAll('>اقرأ المزيد<', '>ناقش هذا الموضوع<');
  }

  if (page === 'portfolio.html' && !html.includes('performance-context')) {
    const context = locale === 'fr'
      ? 'Exemple de résultats : les performances réelles varient selon le projet, le marché et le budget.'
      : locale === 'ar'
        ? 'مثال توضيحي للنتائج: يختلف الأداء الفعلي حسب المشروع والسوق والميزانية.'
        : 'Illustrative results: actual performance varies by project, market, and budget.';
    html = html.replace('<div class="kpi-row">', `<p class="small performance-context">${context}</p><div class="kpi-row">`);
  }

  if (page === 'contact.html' && !html.includes('class="contact-page"')) {
    html = html.replace(/<body(?![^>]*class=)([^>]*)>/, '<body class="contact-page"$1>');
    html = html.replace('<section class="page-hero">', '<section class="page-hero contact-hero">');
    html = html.replace('<section class="section">', '<section class="section contact-main">');
    html = html.replace('<div class="container grid cards-2">', '<div class="container contact-layout">');
    html = html.replace('<article class="glass-card"', '<article class="contact-form-card"');
    html = html.replace('<article class="glass-card"', '<article class="contact-info-card"');
  }

  if (locale === 'fr') {
    const corrections = new Map([
      ['A propos', 'À propos'],
      ['Creation', 'Création'],
      ['creation', 'création'],
      ['Telephone', 'Téléphone'],
      ['reseaux', 'réseaux'],
      ['optimises', 'optimisés'],
      ['centres', 'centrés'],
      ['strategie', 'stratégie'],
      ['ameliorer', 'améliorer'],
      ['developpement', 'développement'],
      ['Identite', 'Identité'],
      ['identite', 'identité'],
      ['systeme', 'système'],
      ['coherente visuelle', 'cohérence visuelle'],
      ['cout', 'coût'],
      ['creatifs', 'créatifs'],
      ['qualifies', 'qualifiés']
    ]);
    for (const [from, to] of corrections) html = html.replaceAll(from, to);
  }

  await writeFile(path, html);
}
