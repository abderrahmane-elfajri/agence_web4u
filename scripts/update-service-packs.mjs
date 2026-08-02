import { readFile, writeFile } from 'node:fs/promises';

const locales = {
  en: {
    file: 'services.html',
    webEyebrow: 'Website packages', webTitle: 'Choose the right level of web presence.', webIntro: 'Clear packages for small businesses that need a professional, mobile-ready website.',
    popular: 'Most popular', from: 'From', monthly: '/ month', select: 'Choose this pack',
    web: [
      ['Mini', '999 DH', 'Start quickly with a professional online presence.', ['One-page website — 5 sections', 'Mobile-responsive design', 'WhatsApp and contact form', 'Google Maps and social links', 'Basic SEO setup', '1 revision round', 'Delivery in 5–7 days']],
      ['Essential', '1,799 DH', 'The ideal choice for a growing small business.', ['Showcase website — up to 4 pages', 'Custom professional design', 'Gallery and service presentation', 'WhatsApp and contact form', 'Google Maps and basic SEO', '2 revision rounds', 'Delivery in 7–12 days'], true],
      ['Pro', '2,999 DH', 'A complete presence designed to attract and convert more clients.', ['Professional website — 7 pages', 'French and Arabic versions', 'Quote request form', 'Google Analytics setup', 'Local SEO and performance', '3 revision rounds', '30 days of support']]
    ],
    shopEyebrow: 'E-commerce package', shopTitle: 'Launch a clear online shop ready to sell.', shopPrice: '4,000 DH', shopText: 'For small shops and sellers who want to receive orders online.', shopFeatures: ['Professional responsive design', 'Up to 20 products', 'Categories and product pages', 'Shopping cart', 'Direct WhatsApp ordering', 'Price and stock management', 'Basic SEO', 'Store-management training'], shopNote: 'Online payment, advanced delivery and specific functionality are quoted separately.',
    socialEyebrow: 'Social media management', socialTitle: 'Consistent content for every level of ambition.', socialIntro: 'Monthly packages for brands that want a reliable, professional social presence.',
    social: [
      ['Presence', '799 DH', 'Maintain a professional presence.', ['1 platform', '6 posts', '6 stories', 'Professional designs', 'Captions and hashtags', 'Monthly calendar', 'Simplified report']],
      ['Growth', '1,199 DH', 'Develop visibility and engagement.', ['2 platforms', '8 posts', '8 stories', '2 Reels', 'Content scheduling', 'Editorial calendar', 'Detailed report'], true],
      ['Business', '2,999 DH', 'Complete and structured management.', ['2–3 platforms', '12 posts and 16 stories', '4 Reels', 'Content strategy', 'Community moderation', '1 Meta Ads campaign', 'Monthly meeting and report']]
    ], socialNote: 'Meta Ads media budget is not included.',
    customEyebrow: 'Built around your business', customTitle: 'Custom Client Pack', customText: 'No fixed price. We define the services, deliverables, timeline and investment after reviewing your activity, priorities, available content and goals.', customSteps: ['Discovery and business brief', 'Recommended service combination', 'Custom deliverables and schedule', 'Personal proposal with clear pricing'], customCta: 'Request your custom proposal',
    termsEyebrow: 'Commercial conditions', termsTitle: 'Clear rules protect the budget and timeline.', termsA: 'Start and validation', termsB: 'Quoted separately', termsLeft: ['50% before work begins', '50% before website publication', 'Timeline starts after content is received', 'Revision rounds depend on the selected pack', 'Extra requests require a separate quote'], termsRight: ['Domain name and hosting', 'Meta Ads media budget', 'Photo or video production', 'Online payment integration', 'Specific custom functionality'], termsNote: 'Every package can be adapted to the client’s activity and objectives.'
  },
  fr: {
    file: 'fr/services.html',
    webEyebrow: 'Packs sites web', webTitle: 'Choisissez votre niveau de présence web.', webIntro: 'Des packs clairs pour les petites entreprises qui veulent un site professionnel et adapté au mobile.',
    popular: 'Le plus populaire', from: 'À partir de', monthly: '/ mois', select: 'Choisir ce pack',
    web: [
      ['Mini', '999 DH', 'Pour démarrer rapidement avec une présence professionnelle.', ['Site One Page — 5 sections', 'Design adapté au mobile', 'WhatsApp et formulaire', 'Google Maps et liens sociaux', 'SEO de base', '1 série de modifications', 'Livraison : 5 à 7 jours']],
      ['Essentiel', '1 799 DH', 'Le choix idéal pour une petite entreprise en croissance.', ['Site vitrine — jusqu’à 4 pages', 'Design professionnel personnalisé', 'Galerie et présentation des services', 'WhatsApp et formulaire', 'Google Maps et SEO de base', '2 séries de modifications', 'Livraison : 7 à 12 jours'], true],
      ['Pro', '2 999 DH', 'Une présence complète pour attirer et convertir davantage.', ['Site professionnel — 7 pages', 'Versions française et arabe', 'Formulaire de devis', 'Google Analytics', 'SEO local et performance', '3 séries de modifications', '30 jours d’assistance']]
    ],
    shopEyebrow: 'Pack e-commerce', shopTitle: 'Lancez une boutique claire et prête à vendre.', shopPrice: '4 000 DH', shopText: 'Pour les petites boutiques et vendeurs qui souhaitent recevoir des commandes en ligne.', shopFeatures: ['Design professionnel et responsive', 'Jusqu’à 20 produits', 'Catégories et fiches produits', 'Panier d’achat', 'Commande directe par WhatsApp', 'Gestion des prix et du stock', 'SEO de base', 'Formation à la gestion'], shopNote: 'Paiement en ligne, livraison avancée et fonctionnalités spécifiques : sur devis.',
    socialEyebrow: 'Gestion des réseaux sociaux', socialTitle: 'Des contenus réguliers adaptés à votre ambition.', socialIntro: 'Des packs mensuels pour construire une présence sociale fiable et professionnelle.',
    social: [
      ['Présence', '799 DH', 'Maintenir une présence professionnelle.', ['1 plateforme', '6 publications', '6 stories', 'Designs professionnels', 'Textes et hashtags', 'Calendrier mensuel', 'Rapport simplifié']],
      ['Croissance', '1 199 DH', 'Développer visibilité et engagement.', ['2 plateformes', '8 publications', '8 stories', '2 Reels', 'Programmation des contenus', 'Calendrier éditorial', 'Rapport détaillé'], true],
      ['Business', '2 999 DH', 'Une gestion complète et structurée.', ['2 à 3 plateformes', '12 publications et 16 stories', '4 Reels', 'Stratégie de contenu', 'Modération', '1 campagne Meta Ads', 'Réunion et rapport mensuel']]
    ], socialNote: 'Le budget publicitaire Meta Ads n’est pas inclus.',
    customEyebrow: 'Construit autour de votre activité', customTitle: 'Pack Client Sur Mesure', customText: 'Aucun prix fixe. Nous définissons les services, livrables, délais et investissement après analyse de votre activité, de vos priorités, de vos contenus et de vos objectifs.', customSteps: ['Découverte et brief activité', 'Combinaison de services recommandée', 'Livrables et calendrier personnalisés', 'Proposition claire avec tarification'], customCta: 'Demander une proposition sur mesure',
    termsEyebrow: 'Conditions commerciales', termsTitle: 'Des règles claires protègent le budget et les délais.', termsA: 'Démarrage et validation', termsB: 'Facturé séparément', termsLeft: ['50 % avant le démarrage', '50 % avant la publication du site', 'Le délai commence après réception des contenus', 'Les modifications dépendent du pack choisi', 'Les demandes supplémentaires font l’objet d’un devis'], termsRight: ['Nom de domaine et hébergement', 'Budget publicitaire Meta Ads', 'Shooting photo ou vidéo', 'Paiement en ligne', 'Fonctionnalités spécifiques'], termsNote: 'Chaque pack peut être adapté à l’activité et aux objectifs du client.'
  },
  ar: {
    file: 'ar/services.html',
    webEyebrow: 'باقات المواقع', webTitle: 'اختر مستوى الحضور الرقمي المناسب.', webIntro: 'باقات واضحة للشركات الصغيرة التي تحتاج إلى موقع احترافي ومتجاوب مع الهاتف.',
    popular: 'الأكثر طلباً', from: 'ابتداءً من', monthly: '/ شهرياً', select: 'اختر هذه الباقة',
    web: [
      ['ميني', '999 درهم', 'لبداية سريعة بحضور احترافي على الإنترنت.', ['موقع صفحة واحدة — 5 أقسام', 'تصميم متجاوب مع الهاتف', 'واتساب ونموذج تواصل', 'خرائط Google وروابط التواصل', 'تهيئة SEO أساسية', 'جولة تعديلات واحدة', 'التسليم خلال 5–7 أيام']],
      ['الأساسية', '1,799 درهم', 'الخيار المثالي لشركة صغيرة في مرحلة النمو.', ['موقع تعريفي — حتى 4 صفحات', 'تصميم احترافي مخصص', 'معرض وعرض للخدمات', 'واتساب ونموذج تواصل', 'خرائط Google وSEO أساسي', 'جولتا تعديلات', 'التسليم خلال 7–12 يوماً'], true],
      ['برو', '2,999 درهم', 'حضور متكامل لجذب وتحويل عدد أكبر من العملاء.', ['موقع احترافي — 7 صفحات', 'نسختان فرنسية وعربية', 'نموذج طلب عرض سعر', 'إعداد Google Analytics', 'SEO محلي وتحسين الأداء', '3 جولات تعديلات', '30 يوماً من الدعم']]
    ],
    shopEyebrow: 'باقة التجارة الإلكترونية', shopTitle: 'أطلق متجراً واضحاً وجاهزاً للبيع.', shopPrice: '4,000 درهم', shopText: 'للمتاجر الصغيرة والبائعين الذين يريدون استقبال الطلبات عبر الإنترنت.', shopFeatures: ['تصميم احترافي ومتجاوب', 'حتى 20 منتجاً', 'تصنيفات وصفحات منتجات', 'سلة مشتريات', 'طلب مباشر عبر واتساب', 'إدارة الأسعار والمخزون', 'SEO أساسي', 'تدريب على إدارة المتجر'], shopNote: 'الدفع الإلكتروني والتوصيل المتقدم والوظائف الخاصة: حسب عرض مخصص.',
    socialEyebrow: 'إدارة شبكات التواصل', socialTitle: 'محتوى منتظم يناسب مستوى طموحك.', socialIntro: 'باقات شهرية للعلامات التي تريد حضوراً اجتماعياً موثوقاً واحترافياً.',
    social: [
      ['الحضور', '799 درهم', 'للحفاظ على حضور احترافي.', ['منصة واحدة', '6 منشورات', '6 قصص', 'تصاميم احترافية', 'نصوص وهاشتاغات', 'تقويم شهري', 'تقرير مبسط']],
      ['النمو', '1,199 درهم', 'لتطوير الظهور والتفاعل.', ['منصتان', '8 منشورات', '8 قصص', '2 Reels', 'جدولة المحتوى', 'تقويم تحريري', 'تقرير مفصل'], true],
      ['الأعمال', '2,999 درهم', 'لإدارة كاملة ومنظمة.', ['2 إلى 3 منصات', '12 منشوراً و16 قصة', '4 Reels', 'استراتيجية محتوى', 'إدارة التفاعل', 'حملة Meta Ads واحدة', 'اجتماع وتقرير شهري']]
    ], socialNote: 'ميزانية إعلانات Meta Ads غير مشمولة.',
    customEyebrow: 'مصممة حول نشاطك', customTitle: 'باقة عميل مخصصة', customText: 'بدون سعر ثابت. نحدد الخدمات والمخرجات والمدة والاستثمار بعد دراسة نشاط العميل وأولوياته والمحتوى المتوفر والأهداف.', customSteps: ['جلسة اكتشاف وملخص النشاط', 'توصية بمزيج الخدمات المناسب', 'مخرجات وجدول زمني مخصصان', 'عرض شخصي بسعر واضح'], customCta: 'اطلب عرضك المخصص',
    termsEyebrow: 'الشروط التجارية', termsTitle: 'قواعد واضحة تحمي الميزانية والمدة.', termsA: 'البدء والموافقة', termsB: 'يتم احتسابه بشكل منفصل', termsLeft: ['50٪ قبل بدء العمل', '50٪ قبل نشر الموقع', 'تبدأ المدة بعد استلام المحتوى', 'عدد التعديلات حسب الباقة', 'الطلبات الإضافية تحتاج عرضاً منفصلاً'], termsRight: ['اسم النطاق والاستضافة', 'ميزانية إعلانات Meta Ads', 'تصوير الصور أو الفيديو', 'الدفع الإلكتروني', 'الوظائف الخاصة'], termsNote: 'يمكن تكييف كل باقة مع نشاط العميل وأهدافه.'
  }
};

const list = (items) => `<ul class="pack-list">${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;
const packLink = (name) => `contact.html?pack=${encodeURIComponent(name)}`;
const cards = (packs, t, monthly = false) => `<div class="pricing-grid">${packs.map(([name, price, intro, features, featured]) => `<article class="price-card${featured ? ' is-featured' : ''}" data-aos="fade-up">${featured ? `<span class="popular-label">${t.popular}</span>` : ''}<div class="pack-head"><span class="pack-name">${name}</span><strong class="pack-price">${price}</strong>${monthly ? `<span class="price-period">${t.monthly}</span>` : ''}</div><p class="pack-intro">${intro}</p>${list(features)}<a href="${packLink(name)}" class="btn ${featured ? 'btn-primary' : 'btn-outline'}">${t.select}</a></article>`).join('')}</div>`;
const heading = (eyebrow, title, intro = '') => `<div class="pricing-heading"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${intro ? `<p>${intro}</p>` : ''}</div>`;

for (const [locale, t] of Object.entries(locales)) {
  const html = await readFile(t.file, 'utf8');
  const content = `
    <section class="section pricing-section" id="website-packs"><div class="container">${heading(t.webEyebrow, t.webTitle, t.webIntro)}${cards(t.web, t)}</div></section>
    <section class="section commerce-section"><div class="container"><article class="commerce-pack" data-aos="fade-up"><div class="commerce-copy">${heading(t.shopEyebrow, t.shopTitle, t.shopText)}<div class="commerce-price"><span>${t.from}</span><strong>${t.shopPrice}</strong></div><a href="${packLink(t.shopEyebrow)}" class="btn btn-primary">${t.select}</a></div><div class="commerce-details">${list(t.shopFeatures)}<p class="pack-note">${t.shopNote}</p></div></article></div></section>
    <section class="section pricing-section" id="social-packs"><div class="container">${heading(t.socialEyebrow, t.socialTitle, t.socialIntro)}${cards(t.social, t, true)}<p class="section-note">${t.socialNote}</p></div></section>
    <section class="section custom-pack-section"><div class="container"><article class="custom-pack" data-aos="fade-up"><div><span class="eyebrow">${t.customEyebrow}</span><h2>${t.customTitle}</h2><p>${t.customText}</p><a href="${packLink(t.customTitle)}" class="btn btn-primary">${t.customCta}</a></div>${list(t.customSteps)}</article></div></section>
    <section class="section terms-section"><div class="container">${heading(t.termsEyebrow, t.termsTitle)}<div class="terms-grid"><article><h3>${t.termsA}</h3>${list(t.termsLeft)}</article><article><h3>${t.termsB}</h3>${list(t.termsRight)}</article></div><p class="section-note">${t.termsNote}</p></div></section>`;
  const updated = html.replace(/(<section class="page-hero">[\s\S]*?<\/section>)[\s\S]*?(<\/main>)/, `$1${content}\n  $2`);
  if (updated === html) throw new Error(`Could not update ${t.file}`);
  await writeFile(t.file, updated);
}
