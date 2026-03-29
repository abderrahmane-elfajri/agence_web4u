const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const year = document.getElementById("year");
const contactForm = document.querySelector(".contact-form");
const languageSelect = document.getElementById("languageSelect");
const themeToggle = document.getElementById("themeToggle");

const translations = {
  en: {
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.about": "About",
    "nav.contact": "Contact",
    "cta.getStarted": "Get Started",
    "cta.contactUs": "Contact Us",
    "cta.viewWork": "View Our Work",
    "cta.details": "Details",
    "cta.whatsapp": "Chat On WhatsApp",
    "cta.callNow": "Call Now",
    "hero.eyebrow": "Premium Digital Agency",
    "hero.title": "We Build Websites That Turn Clicks Into Clients.",
    "hero.lead": "Agence Web4u designs high-impact digital experiences for brands that want more leads, stronger authority, and measurable growth.",
    "hero.stat1": "Projects Delivered",
    "hero.stat2": "Client Satisfaction",
    "hero.stat3": "Avg. Conversion Lift",
    "trust.title": "Trusted by growth-focused brands",
    "trust.text": "Strategy-driven UX. Conversion-focused design. Lightning-fast development.",
    "services.eyebrow": "Services",
    "services.title": "Growth Services For Serious Brands",
    "services.lead": "Our team combines social media execution, website building, growth strategy, and paid ads management to generate predictable results.",
    "services.design.title": "SMM Management",
    "services.design.desc": "Strategic social media management that grows your audience and turns attention into leads.",
    "services.dev.title": "Build Website",
    "services.dev.desc": "Professional websites designed and built for credibility, speed, and conversion.",
    "services.conv.title": "Marketing Strategy",
    "services.conv.desc": "Data-backed strategy to position your offer and scale customer acquisition.",
    "services.seo.title": "Ads Management",
    "services.seo.desc": "End-to-end paid ads management focused on ROI, quality leads, and lower acquisition cost.",
    "portfolio.eyebrow": "Portfolio",
    "portfolio.title": "Recent Client Projects",
    "portfolio.lead": "Real-style, premium projects built with business goals at the center.",
    "portfolio.card1": "Conversion-focused landing page redesign with +41% lead uplift.",
    "portfolio.card2": "Premium corporate website that improved conversion quality and trust.",
    "portfolio.card3": "Elegant e-commerce experience optimized for speed and sales performance.",
    "about.eyebrow": "About Agence Web4u",
    "about.title": "Your Growth Partner For Premium Web Experiences",
    "about.lead": "We are a digital agency focused on helping businesses stand out online with websites that look exceptional and perform even better.",
    "about.point1": "Strategic design built for business goals",
    "about.point2": "Fast, SEO-ready, mobile-first development",
    "about.point3": "Clear communication and on-time delivery",
    "contact.eyebrow": "Contact",
    "contact.title": "Ready To Launch Your Next Website?",
    "contact.lead": "Tell us about your project and we will send a tailored proposal focused on your goals.",
    "contact.whatsappInfo": "WhatsApp available for quick replies",
    "form.name": "Full Name",
    "form.namePh": "Your name",
    "form.email": "Email Address",
    "form.emailPh": "your@email.com",
    "form.service": "Service Needed",
    "form.servicePlaceholder": "Select a service",
    "form.message": "Project Details",
    "form.messagePh": "Tell us about your goals",
    "footer.rightsPrefix": "©",
    "footer.rights": "All rights reserved.",
    "footer.backTop": "Back to top",
    "service.back": "Back to Home",
    "service.section": "Service Details",
    "service.detailsTitle": "What You Get",
    "service.detailsText": "This service is delivered with strategic planning, expert execution, and measurable business outcomes.",
    "service.benefit1": "Clear process from discovery to launch",
    "service.benefit2": "Premium UI with mobile-first performance",
    "service.benefit3": "Lead-oriented structure and CTA optimization",
    "service.benefit4": "Ongoing support and measurable results",
    "service.cta": "Start This Service",
    "theme.toggle": "Dark Mode",
    "form.sending": "Sending...",
    "form.success": "Message sent successfully",
    "form.error": "Failed to send. Try again."
  },
  fr: {
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.about": "A propos",
    "nav.contact": "Contact",
    "cta.getStarted": "Commencer",
    "cta.contactUs": "Contactez-nous",
    "cta.viewWork": "Voir Nos Projets",
    "cta.details": "Details",
    "cta.whatsapp": "Discuter sur WhatsApp",
    "cta.callNow": "Appeler",
    "hero.eyebrow": "Agence Digitale Premium",
    "hero.title": "Nous Creons Des Sites Qui Transforment Les Visites En Clients.",
    "hero.lead": "Agence Web4u conoit des experiences digitales haut de gamme pour generer plus de prospects et de croissance.",
    "hero.stat1": "Projets Livres",
    "hero.stat2": "Satisfaction Client",
    "hero.stat3": "Hausse Moyenne Conversion",
    "trust.title": "Des marques ambitieuses nous font confiance",
    "trust.text": "UX strategique. Design oriente conversion. Developpement ultra rapide.",
    "services.eyebrow": "Services",
    "services.title": "Services De Croissance Pour Marques Ambitieuses",
    "services.lead": "Nous combinons gestion SMM, creation de sites web, strategie marketing et gestion des publicites pour des resultats previsibles.",
    "services.design.title": "Gestion SMM",
    "services.design.desc": "Gestion strategique des reseaux sociaux pour developper audience et leads qualifies.",
    "services.dev.title": "Creation Site Web",
    "services.dev.desc": "Sites professionnels concus pour la credibilite, la vitesse et la conversion.",
    "services.conv.title": "Strategie Marketing",
    "services.conv.desc": "Strategie basee sur les donnees pour mieux positionner votre offre et accelerer l'acquisition.",
    "services.seo.title": "Gestion Publicites",
    "services.seo.desc": "Gestion complete des campagnes ads orientee ROI, qualite des leads et cout d'acquisition.",
    "portfolio.eyebrow": "Portfolio",
    "portfolio.title": "Projets Recents",
    "portfolio.lead": "Des projets premium construits autour des objectifs business.",
    "portfolio.card1": "Refonte orientee conversion avec +41% de leads.",
    "portfolio.card2": "Site corporate premium qui renforce la confiance et la qualite des prospects.",
    "portfolio.card3": "Experience e-commerce elegante optimisee pour la vitesse et les ventes.",
    "about.eyebrow": "A propos Agence Web4u",
    "about.title": "Votre Partenaire De Croissance Digitale",
    "about.lead": "Nous aidons les entreprises a se distinguer avec des sites qui allient design haut de gamme et performance.",
    "about.point1": "Design strategique centre business",
    "about.point2": "Developpement rapide, SEO-ready, mobile-first",
    "about.point3": "Communication claire et livraison ponctuelle",
    "contact.eyebrow": "Contact",
    "contact.title": "Pret A Lancer Votre Prochain Site ?",
    "contact.lead": "Parlez-nous de votre projet pour recevoir une proposition adaptee a vos objectifs.",
    "contact.whatsappInfo": "WhatsApp disponible pour des reponses rapides",
    "form.name": "Nom Complet",
    "form.namePh": "Votre nom",
    "form.email": "Adresse Email",
    "form.emailPh": "votre@email.com",
    "form.service": "Service Souhaite",
    "form.servicePlaceholder": "Selectionnez un service",
    "form.message": "Details Du Projet",
    "form.messagePh": "Parlez-nous de vos objectifs",
    "footer.rightsPrefix": "©",
    "footer.rights": "Tous droits reserves.",
    "footer.backTop": "Retour en haut",
    "service.back": "Retour Accueil",
    "service.section": "Details Du Service",
    "service.detailsTitle": "Ce Que Vous Obtenez",
    "service.detailsText": "Ce service est livre avec planification strategique, execution experte et resultats mesurables.",
    "service.benefit1": "Processus clair de la decouverte au lancement",
    "service.benefit2": "UI premium avec performance mobile-first",
    "service.benefit3": "Structure orientee leads et CTA optimises",
    "service.benefit4": "Support continu et resultats mesurables",
    "service.cta": "Demarrer Ce Service",
    "theme.toggle": "Mode Sombre",
    "form.sending": "Envoi...",
    "form.success": "Message envoye avec succes",
    "form.error": "Echec de l'envoi. Reessayez."
  },
  ar: {
    "nav.services": "الخدمات",
    "nav.portfolio": "الاعمال",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "cta.getStarted": "ابدأ الان",
    "cta.contactUs": "تواصل معنا",
    "cta.viewWork": "شاهد اعمالنا",
    "cta.details": "التفاصيل",
    "cta.whatsapp": "محادثة واتساب",
    "cta.callNow": "اتصل الان",
    "hero.eyebrow": "وكالة رقمية احترافية",
    "hero.title": "نصمم مواقع تحول الزوار الى عملاء.",
    "hero.lead": "Agence Web4u تقدم تجارب رقمية عالية المستوى لزيادة العملاء ونمو الاعمال.",
    "hero.stat1": "مشاريع منجزة",
    "hero.stat2": "رضا العملاء",
    "hero.stat3": "متوسط رفع التحويل",
    "trust.title": "علامات تجارية طموحة تثق بنا",
    "trust.text": "تصميم تجربة مستخدم استراتيجي. واجهات تركز على التحويل. تطوير سريع.",
    "services.eyebrow": "الخدمات",
    "services.title": "خدمات نمو احترافية للعلامات الجادة",
    "services.lead": "نجمع بين ادارة السوشيال ميديا وبناء المواقع واستراتيجية التسويق وادارة الاعلانات لتحقيق نتائج قابلة للقياس.",
    "services.design.title": "ادارة SMM",
    "services.design.desc": "ادارة احترافية للسوشيال ميديا لزيادة التفاعل وتحويله الى عملاء محتملين.",
    "services.dev.title": "بناء موقع ويب",
    "services.dev.desc": "مواقع احترافية مبنية للمصداقية والسرعة ورفع التحويل.",
    "services.conv.title": "استراتيجية تسويقية",
    "services.conv.desc": "استراتيجية مبنية على البيانات لتموضع افضل ونمو اسرع في اكتساب العملاء.",
    "services.seo.title": "ادارة الاعلانات",
    "services.seo.desc": "ادارة كاملة للحملات الاعلانية مع تركيز على العائد وجودة العملاء المحتملين.",
    "portfolio.eyebrow": "الاعمال",
    "portfolio.title": "احدث المشاريع",
    "portfolio.lead": "مشاريع احترافية مصممة حول اهداف العمل.",
    "portfolio.card1": "اعادة تصميم موجهة للتحويل رفعت العملاء المحتملين بنسبة +41٪.",
    "portfolio.card2": "موقع شركة فاخر عزز الثقة وجودة العملاء المحتملين.",
    "portfolio.card3": "تجربة متجر الكتروني انيقة ومحسنة للسرعة والمبيعات.",
    "about.eyebrow": "حول Agence Web4u",
    "about.title": "شريكك للنمو الرقمي",
    "about.lead": "نساعد الشركات على التميز عبر مواقع تجمع بين الجمال والاداء.",
    "about.point1": "تصميم استراتيجي مبني على اهداف العمل",
    "about.point2": "تطوير سريع ومتوافق مع SEO و mobile-first",
    "about.point3": "تواصل واضح وتسليم في الوقت",
    "contact.eyebrow": "اتصل",
    "contact.title": "جاهز لاطلاق موقعك القادم؟",
    "contact.lead": "شاركنا تفاصيل مشروعك لنرسل لك عرضا مناسبا لاهدافك.",
    "contact.whatsappInfo": "واتساب متاح للرد السريع",
    "form.name": "الاسم الكامل",
    "form.namePh": "اسمك",
    "form.email": "البريد الالكتروني",
    "form.emailPh": "your@email.com",
    "form.service": "الخدمة المطلوبة",
    "form.servicePlaceholder": "اختر خدمة",
    "form.message": "تفاصيل المشروع",
    "form.messagePh": "اخبرنا عن اهدافك",
    "footer.rightsPrefix": "©",
    "footer.rights": "جميع الحقوق محفوظة.",
    "footer.backTop": "العودة للاعلى",
    "service.back": "العودة للرئيسية",
    "service.section": "تفاصيل الخدمة",
    "service.detailsTitle": "ماذا ستحصل",
    "service.detailsText": "نقدم هذه الخدمة بخطة استراتيجية وتنفيذ احترافي ونتائج واضحة قابلة للقياس.",
    "service.benefit1": "خطة واضحة من التحليل حتى الاطلاق",
    "service.benefit2": "واجهة فاخرة واداء قوي على الجوال",
    "service.benefit3": "هيكل موجه لزيادة العملاء المحتملين",
    "service.benefit4": "دعم مستمر ونتائج قابلة للقياس",
    "service.cta": "ابدأ هذه الخدمة",
    "theme.toggle": "الوضع الداكن",
    "form.sending": "جاري الارسال...",
    "form.success": "تم ارسال الرسالة بنجاح",
    "form.error": "فشل الارسال. حاول مرة اخرى."
  }
};

function applyTheme(theme) {
  const selectedTheme = theme === "dark" ? "dark" : "light";
  document.body.setAttribute("data-theme", selectedTheme);
  localStorage.setItem("aw4u_theme", selectedTheme);

  if (themeToggle) {
    const isDark = selectedTheme === "dark";
    themeToggle.innerHTML = isDark
      ? '<i class="fa-solid fa-sun"></i>'
      : '<i class="fa-solid fa-moon"></i>';
    themeToggle.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
    themeToggle.classList.toggle("active", isDark);
  }
}

function applyLanguage(lang) {
  const selected = translations[lang] ? lang : "en";
  const dict = translations[selected];

  document.documentElement.lang = selected;
  document.documentElement.dir = selected === "ar" ? "rtl" : "ltr";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (dict[key]) {
      element.textContent = dict[key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (dict[key]) {
      element.setAttribute("placeholder", dict[key]);
    }
  });

  localStorage.setItem("aw4u_lang", selected);
}

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (languageSelect) {
  const savedLanguage = localStorage.getItem("aw4u_lang") || "en";
  languageSelect.value = savedLanguage;
  applyLanguage(savedLanguage);

  languageSelect.addEventListener("change", (event) => {
    applyLanguage(event.target.value);
  });
}

const savedTheme = localStorage.getItem("aw4u_theme");
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(prefersDark ? "dark" : "light");
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    applyTheme(isDark ? "light" : "dark");
  });
}

const revealElements = document.querySelectorAll(".reveal");
const navAnchors = document.querySelectorAll(".nav-anchor");

if (navAnchors.length) {
  const anchorMap = Array.from(navAnchors)
    .map((anchor) => {
      const targetId = anchor.getAttribute("href")?.replace("#", "");
      if (!targetId) return null;
      return {
        anchor,
        section: document.getElementById(targetId)
      };
    })
    .filter((item) => item && item.section);

  if (anchorMap.length) {
    const updateActiveAnchor = () => {
      let activeSection = anchorMap[0];
      const offset = window.scrollY + 150;

      anchorMap.forEach((item) => {
        if (item.section.offsetTop <= offset) {
          activeSection = item;
        }
      });

      anchorMap.forEach((item) => item.anchor.classList.remove("current"));
      activeSection.anchor.classList.add("current");
    };

    updateActiveAnchor();
    window.addEventListener("scroll", updateActiveAnchor, { passive: true });
  }
}

if ("IntersectionObserver" in window) {
  revealElements.forEach((element, index) => {
    const delay = (index % 4) * 80;
    element.style.setProperty("--delay", `${delay}ms`);
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16, rootMargin: "0px 0px -30px 0px" }
  );

  revealElements.forEach((element) => observer.observe(element));
} else {
  revealElements.forEach((element) => element.classList.add("visible"));
}

function initContactForm() {
  if (!contactForm) return;

  contactForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const button = contactForm.querySelector("button[type='submit']");
    if (!button) return;

    const serviceId = contactForm.dataset.emailjsService;
    const templateId = contactForm.dataset.emailjsTemplate;
    const publicKey = contactForm.dataset.emailjsPublic;

    const hasConfig =
      serviceId &&
      templateId &&
      publicKey &&
      !serviceId.includes("YOUR_") &&
      !templateId.includes("YOUR_") &&
      !publicKey.includes("YOUR_");

    const currentLang = localStorage.getItem("aw4u_lang") || "en";
    const dict = translations[currentLang] || translations.en;
    const originalText = button.textContent;

    if (window.location.protocol === "file:") {
      button.textContent = "Use localhost or GitHub Pages";
      button.disabled = true;
      console.error("EmailJS blocked on file:// origin. Run the site via http(s), e.g. GitHub Pages or a local server.");
      setTimeout(() => {
        button.textContent = originalText;
        button.disabled = false;
      }, 2600);
      return;
    }

    button.textContent = dict["form.sending"] || "Sending...";
    button.disabled = true;

    try {
      if (!hasConfig) {
        throw new Error("EmailJS configuration missing in form data attributes");
      }

      const name = document.getElementById("name")?.value?.trim() || "";
      const email = document.getElementById("email")?.value?.trim() || "";
      const service = document.getElementById("service")?.value?.trim() || "General";
      const message = document.getElementById("message")?.value?.trim() || "";

      const templateIdsToTry = Array.from(
        new Set([
          templateId,
          templateId.replace(/o/g, "0"),
          templateId.replace(/0/g, "o")
        ])
      );

      let sent = false;
      let lastErrorDetails = "";

      for (const currentTemplateId of templateIdsToTry) {
        const payload = {
          service_id: serviceId,
          template_id: currentTemplateId,
          user_id: publicKey,
          template_params: {
            name,
            email,
            service,
            from_name: name,
            from_email: email,
            service_name: service,
            message,
            reply_to: email,
            agency_name: "Agence Web4u",
            phone: "0694360941",
            to_email: "abderrahmanelfajri@gmail.com"
          }
        };

        const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });

        if (response.ok) {
          sent = true;
          break;
        }

        const details = await response.text();
        lastErrorDetails = `EmailJS API error ${response.status}: ${details || "No details"}`;
      }

      if (!sent) {
        throw new Error(
          `${lastErrorDetails} | Tried template IDs: ${templateIdsToTry.join(", ")}. Update data-emailjs-template in index.html with a valid ID from EmailJS dashboard.`
        );
      }

      button.textContent = dict["form.success"] || "Message sent successfully";
      contactForm.reset();
    } catch (error) {
      console.error("EmailJS send error:", error);
      if (String(error?.message || "").includes("template ID")) {
        console.error("Configured template in HTML:", templateId);
      }
      button.textContent = dict["form.error"] || "Failed to send. Try again.";
    }

    setTimeout(() => {
      button.textContent = originalText;
      button.disabled = false;
    }, 2200);
  });
}

initContactForm();
