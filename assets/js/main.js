(function () {
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

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

  document.querySelectorAll('form[action*="formsubmit.co"]:not([data-async-form])').forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"]');
    const originalLabel = submitButton?.textContent;
    const language = document.documentElement.lang;
    const submittingLabels = {
      en: 'Sending…',
      fr: 'Envoi…',
      ar: 'جارٍ الإرسال…'
    };
    const selectedPack = new URLSearchParams(window.location.search).get('pack');

    if (selectedPack) {
      const packInput = document.createElement('input');
      packInput.type = 'hidden';
      packInput.name = 'requested_package';
      packInput.value = selectedPack;
      form.prepend(packInput);

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

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      const localMessages = {
        en: 'The form cannot be tested from a local HTML file. Run “npm run dev” and open the HTTP address shown in the terminal.',
        fr: 'Le formulaire ne peut pas être testé depuis un fichier HTML local. Lancez « npm run dev » puis ouvrez l’adresse HTTP affichée dans le terminal.',
        ar: 'لا يمكن اختبار النموذج من ملف HTML محلي. شغّل « npm run dev » ثم افتح عنوان HTTP الظاهر في الطرفية.'
      };
      const errorMessages = {
        en: 'Your message could not be sent. Please try again or contact us on WhatsApp.',
        fr: 'Votre message n’a pas pu être envoyé. Réessayez ou contactez-nous sur WhatsApp.',
        ar: 'تعذر إرسال رسالتك. حاول مرة أخرى أو تواصل معنا عبر واتساب.'
      };
      const showError = (message) => {
        let status = form.querySelector('.form-status');
        if (!status) {
          status = document.createElement('p');
          status.className = 'form-status is-error';
          status.setAttribute('role', 'alert');
          status.setAttribute('tabindex', '-1');
          form.append(status);
        }
        status.textContent = message;
        status.focus();
      };

      if (window.location.protocol === 'file:') {
        showError(localMessages[language] || localMessages.en);
        return;
      }

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.setAttribute('aria-busy', 'true');
        submitButton.textContent = submittingLabels[language] || submittingLabels.en;
      }

      try {
        const endpoint = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
        const response = await fetch(endpoint, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === false) {
          throw new Error('FormSubmit rejected the request');
        }

        window.location.assign('thank-you.html');
      } catch (error) {
        showError(errorMessages[language] || errorMessages.en);
        if (submitButton) {
          submitButton.disabled = false;
          submitButton.removeAttribute('aria-busy');
          submitButton.textContent = originalLabel;
        }
      }
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
