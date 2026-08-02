(() => {
  const labels = {
    en: { sending: 'Sending…', error: 'Your message could not be sent. Please try again or contact us on WhatsApp.', pack: 'Selected package' },
    fr: { sending: 'Envoi…', error: 'Votre message n’a pas pu être envoyé. Réessayez ou contactez-nous sur WhatsApp.', pack: 'Pack sélectionné' },
    ar: { sending: 'جارٍ الإرسال…', error: 'تعذر إرسال رسالتك. حاول مرة أخرى أو تواصل معنا عبر واتساب.', pack: 'الباقة المختارة' }
  };

  document.querySelectorAll('form[data-async-form]').forEach((form) => {
    const language = document.documentElement.lang || 'en';
    const copy = labels[language] || labels.en;
    const button = form.querySelector('button[type="submit"]');
    const originalLabel = button?.textContent || '';
    const selectedPack = new URLSearchParams(window.location.search).get('pack');

    if (selectedPack) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'requested_package';
      input.value = selectedPack;
      form.prepend(input);

      const notice = document.createElement('p');
      notice.className = 'selected-pack-note';
      notice.textContent = `${copy.pack}: ${selectedPack}`;
      form.prepend(notice);
    }

    const showError = () => {
      let status = form.querySelector('.form-status');
      if (!status) {
        status = document.createElement('p');
        status.className = 'form-status is-error';
        status.setAttribute('role', 'alert');
        status.setAttribute('tabindex', '-1');
        form.append(status);
      }
      status.textContent = copy.error;
      status.focus();
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (button) {
        button.disabled = true;
        button.setAttribute('aria-busy', 'true');
        button.textContent = copy.sending;
      }

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { Accept: 'application/json' }
        });
        const result = await response.json().catch(() => ({}));

        if (!response.ok || result.success === false || result.success === 'false') {
          throw new Error('Form submission failed');
        }

        window.location.href = form.dataset.success || 'thank-you.html';
      } catch (error) {
        showError();
        if (button) {
          button.disabled = false;
          button.removeAttribute('aria-busy');
          button.textContent = originalLabel;
        }
      }
    });
  });
})();
