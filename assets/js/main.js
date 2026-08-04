(function () {
  const themeKey = 'agence-web4u-theme';
  const root = document.documentElement;
  const language = (root.lang || 'en').toLowerCase().split('-')[0];
  const themeLabels = {
    en: { light: 'Switch to white mode', dark: 'Switch to dark mode' },
    fr: { light: 'Passer en mode clair', dark: 'Passer en mode sombre' },
    ar: { light: 'التبديل إلى الوضع الفاتح', dark: 'التبديل إلى الوضع الداكن' }
  };

  const readTheme = () => {
    try {
      const storedTheme = localStorage.getItem(themeKey);
      if (storedTheme === 'light' || storedTheme === 'dark') return storedTheme;
    } catch {
      return 'light';
    }
    return 'light';
  };

  const applyTheme = (theme) => {
    root.dataset.theme = theme;
    root.style.colorScheme = theme;
    try {
      localStorage.setItem(themeKey, theme);
    } catch {
      /* ignore storage errors */
    }
  };

  const getThemeLabels = () => themeLabels[language] || themeLabels.en;

  applyTheme(readTheme());

  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  const navExtra = document.querySelector('.nav-extra');
  const navCta = navExtra?.querySelector('.nav-cta');

  if (navExtra) {
    const themeButton = document.createElement('button');
    themeButton.type = 'button';
    themeButton.className = 'theme-toggle';

    const updateThemeButton = () => {
      const labels = getThemeLabels();
      const isLight = root.dataset.theme === 'light';
      themeButton.innerHTML = isLight
        ? '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 12.8A8.5 8.5 0 0 1 11.2 3a9 9 0 1 0 9.8 9.8Z"/></svg>'
        : '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 1.9a1 1 0 0 1 1 1V5a1 1 0 1 1-2 0V2.9a1 1 0 0 1 1-1Zm0 15.1a4 4 0 1 1 0-8 4 4 0 0 1 0 8ZM4.2 4.2a1 1 0 0 1 1.4 0l1.5 1.5A1 1 0 1 1 5.7 7.1L4.2 5.6a1 1 0 0 1 0-1.4Zm14.7 14.7a1 1 0 0 1 1.4 0l1.5 1.5a1 1 0 1 1-1.4 1.4l-1.5-1.5a1 1 0 0 1 0-1.4ZM1.9 12a1 1 0 0 1 1-1H5a1 1 0 1 1 0 2H2.9a1 1 0 0 1-1-1Zm15.1 0a1 1 0 0 1 1-1H20a1 1 0 1 1 0 2h-2a1 1 0 0 1-1-1Zm-11.8 8.5a1 1 0 0 1 0-1.4l1.5-1.5a1 1 0 1 1 1.4 1.4L7.1 20a1 1 0 0 1-1.4 0Zm14.7-14.7a1 1 0 0 1 0-1.4l1.5-1.5a1 1 0 1 1 1.4 1.4l-1.5 1.5a1 1 0 0 1-1.4 0Z"/></svg>';
      themeButton.setAttribute('aria-label', isLight ? labels.dark : labels.light);
      themeButton.setAttribute('title', isLight ? labels.dark : labels.light);
      themeButton.setAttribute('aria-pressed', String(isLight));
    };

    themeButton.addEventListener('click', () => {
      const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
      applyTheme(nextTheme);
      updateThemeButton();
    });

    updateThemeButton();
    if (navCta) navExtra.insertBefore(themeButton, navCta);
    else navExtra.append(themeButton);
  }

  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  if (menuToggle && navLinks) {
    if (!navLinks.id) navLinks.id = 'primary-navigation';
    menuToggle.setAttribute('aria-controls', navLinks.id);
    const mobileMenu = window.matchMedia('(max-width: 900px)');
    const language = document.documentElement.lang;
    const labels = {
      en: { open: 'Open navigation', close: 'Close navigation' },
      fr: { open: 'Ouvrir la navigation', close: 'Fermer la navigation' },
      ar: { open: 'فتح القائمة', close: 'إغلاق القائمة' }
    };
    const menuLabels = labels[language] || labels.en;
    const focusableSelector = 'a[href], button:not([disabled])';

    const setMenuState = (open, restoreFocus = false) => {
      const shouldOpen = Boolean(open && mobileMenu.matches);
      navLinks.classList.toggle('open', shouldOpen);
      menuToggle.classList.toggle('is-open', shouldOpen);
      menuToggle.setAttribute('aria-expanded', String(shouldOpen));
      menuToggle.setAttribute('aria-label', shouldOpen ? menuLabels.close : menuLabels.open);
      header?.classList.toggle('menu-is-open', shouldOpen);
      document.body.classList.toggle('menu-open', shouldOpen);
      navLinks.inert = mobileMenu.matches && !shouldOpen;
      if (shouldOpen) navLinks.querySelector('a')?.focus();
      if (restoreFocus) menuToggle.focus();
    };

    menuToggle.addEventListener('click', () => setMenuState(!navLinks.classList.contains('open')));

    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        setMenuState(false);
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && navLinks.classList.contains('open')) setMenuState(false, true);
      if (event.key === 'Tab' && navLinks.classList.contains('open')) {
        const focusable = [...navLinks.querySelectorAll(focusableSelector)];
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          menuToggle.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          menuToggle.focus();
        } else if (event.shiftKey && document.activeElement === menuToggle) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === menuToggle) {
          event.preventDefault();
          first?.focus();
        }
      }
    });

    document.addEventListener('click', (event) => {
      if (navLinks.classList.contains('open') && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        setMenuState(false);
      }
    });

    mobileMenu.addEventListener('change', () => setMenuState(false));
    setMenuState(false);
  }

  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach((link) => {
    const linkPath = new URL(link.href, window.location.href).pathname.split('/').pop() || 'index.html';
    if (linkPath === path) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    } else {
      link.classList.remove('active');
      link.removeAttribute('aria-current');
    }
  });

  document.querySelectorAll('form[action*="formsubmit.co"]').forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton?.textContent;
    const language = document.documentElement.lang;
    const submittingLabels = {
      en: 'Sending…',
      fr: 'Envoi…',
      ar: 'جارٍ الإرسال…'
    };
    const selectedPack = new URLSearchParams(window.location.search).get('pack');
    const serviceSelect = form.querySelector('select[name="service"]');

    const serviceMap = {
      en: {
        website: 'Website Creation',
        allinone: 'All-in-one Growth Pack',
        seo: 'SEO Optimization',
        social: 'Social Media Management',
        ads: 'Meta Ads',
        branding: 'Branding & Design',
        digital: 'Digital Marketing'
      },
      fr: {
        website: 'Création de site web',
        allinone: 'Pack tout-en-un',
        seo: 'SEO',
        social: 'Gestion des réseaux sociaux',
        ads: 'Meta Ads',
        branding: 'Branding & design',
        digital: 'Marketing digital'
      },
      ar: {
        website: 'تصميم المواقع',
        allinone: 'باقة شاملة',
        seo: 'تحسين محركات البحث',
        social: 'إدارة السوشيال ميديا',
        ads: 'إعلانات ميتا',
        branding: 'الهوية البصرية',
        digital: 'التسويق الرقمي'
      }
    };

    const resolveService = (pack = '') => {
      const value = pack.toLowerCase();
      const map = serviceMap[language] || serviceMap.en;
      if (/all[- ]?in[- ]?one|tout[- ]en[- ]un|شاملة|متكاملة|growth pack/i.test(value)) return map.allinone;
      if (/website|site web|site|موقع|creation de site|création/i.test(value)) return map.website;
      if (/seo|référencement|تحسين|search/i.test(value)) return map.seo;
      if (/social|smm|réseaux|media|السوشيال|شبكات/i.test(value)) return map.social;
      if (/ads|meta|إعلانات/i.test(value)) return map.ads;
      if (/brand|branding|هوية/i.test(value)) return map.branding;
      return map.digital;
    };

    const resolveServiceByKey = (serviceKey = '') => {
      const key = serviceKey.toLowerCase();
      const map = serviceMap[language] || serviceMap.en;
      if (map[key]) return map[key];
      return '';
    };

    const selectedService = new URLSearchParams(window.location.search).get('service');

    if (selectedPack || selectedService) {
      const packInput = document.createElement('input');
      packInput.type = 'hidden';
      packInput.name = 'requested_package';
      packInput.value = selectedPack;
      form.prepend(packInput);

      if (serviceSelect && !serviceSelect.value) {
        const suggestedService = resolveServiceByKey(selectedService) || resolveService(selectedPack);
        if (suggestedService) serviceSelect.value = suggestedService;
      }

      const packLabels = {
        en: `Selected package: ${selectedPack}`,
        fr: `Pack sélectionné : ${selectedPack}`,
        ar: `الباقة المختارة: ${selectedPack}`
      };
      const packNotice = document.createElement('p');
      packNotice.className = 'selected-pack-note';
      packNotice.textContent = packLabels[language] || packLabels.en;
      form.prepend(packNotice);
    }

    form.addEventListener('submit', (event) => {
      if (window.location.protocol !== 'file:') {
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.setAttribute('aria-busy', 'true');
          submitButton.textContent = submittingLabels[language] || submittingLabels.en;
        }
        return;
      }
      event.preventDefault();
      const messages = {
        en: 'The form cannot be tested from a local HTML file. Run “npm run dev” and open the HTTP address shown in the terminal.',
        fr: 'Le formulaire ne peut pas être testé depuis un fichier HTML local. Lancez « npm run dev » puis ouvrez l’adresse HTTP affichée dans le terminal.',
        ar: 'لا يمكن اختبار النموذج من ملف HTML محلي. شغّل « npm run dev » ثم افتح عنوان HTTP الظاهر في الطرفية.'
      };
      let status = form.querySelector('.form-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'form-status is-error';
        status.setAttribute('role', 'alert');
        status.setAttribute('tabindex', '-1');
        form.append(status);
      }
      status.textContent = messages[document.documentElement.lang] || messages.en;
      status.focus();
    });

    window.addEventListener('pageshow', () => {
      if (!submitButton) return;
      submitButton.disabled = false;
      submitButton.removeAttribute('aria-busy');
      submitButton.textContent = originalLabel;
    });
  });

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  if (!reduceMotion) {
    document.documentElement.classList.add('motion-ready');

    const revealTargets = [
      ...document.querySelectorAll('[data-aos], .section-heading, .page-hero .container, .blog-hero-grid')
    ];

    revealTargets.forEach((element, index) => {
      element.setAttribute('data-reveal', element.dataset.aos?.includes('left') ? 'left' : element.dataset.aos?.includes('right') ? 'right' : 'up');
      const declaredDelay = Number.parseInt(element.dataset.aosDelay || '0', 10);
      element.style.setProperty('--reveal-delay', `${Math.min(declaredDelay || (index % 4) * 45, 240)}ms`);
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });

    revealTargets.forEach((element) => revealObserver.observe(element));
  }

  if (canHover && !reduceMotion) {
    let spotlightFrame;
    document.addEventListener('pointermove', (event) => {
      if (spotlightFrame) cancelAnimationFrame(spotlightFrame);
      spotlightFrame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
        document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
      });
    }, { passive: true });

    const tiltTargets = document.querySelectorAll('.glass-card, .journal-card, .issue-card, .contact-form-card, .contact-info-card');
    tiltTargets.forEach((card) => {
      card.classList.add('tilt-card');
      card.addEventListener('pointermove', (event) => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.setProperty('--pointer-x', `${x * 100}%`);
        card.style.setProperty('--pointer-y', `${y * 100}%`);
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 8}deg`);
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 10}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--tilt-x', '0deg');
        card.style.setProperty('--tilt-y', '0deg');
      });
    });

    document.querySelectorAll('.hero-media').forEach((media) => {
      media.addEventListener('pointermove', (event) => {
        const bounds = media.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        media.style.setProperty('--hero-tilt-x', `${(0.5 - y) * 5}deg`);
        media.style.setProperty('--hero-tilt-y', `${(x - 0.5) * 7}deg`);
      });
      media.addEventListener('pointerleave', () => {
        media.style.setProperty('--hero-tilt-x', '0deg');
        media.style.setProperty('--hero-tilt-y', '0deg');
      });
    });

    document.querySelectorAll('.btn').forEach((button) => {
      button.addEventListener('pointermove', (event) => {
        const bounds = button.getBoundingClientRect();
        button.style.setProperty('--magnetic-x', `${(event.clientX - bounds.left - bounds.width / 2) * 0.08}px`);
        button.style.setProperty('--magnetic-y', `${(event.clientY - bounds.top - bounds.height / 2) * 0.12}px`);
      });
      button.addEventListener('pointerleave', () => {
        button.style.setProperty('--magnetic-x', '0px');
        button.style.setProperty('--magnetic-y', '0px');
      });
    });
  }

})();
