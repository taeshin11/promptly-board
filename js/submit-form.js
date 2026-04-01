// submit-form.js - Form handling and Google Sheets POST
const SubmitForm = (() => {
  // Replace with your deployed Apps Script Web App URL
  const SUBMIT_WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

  function init() {
    const form = document.getElementById('submit-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const msgEl = document.getElementById('form-message');
      const btn = form.querySelector('button[type="submit"]');

      const data = {
        toolName: form.querySelector('#tool-name').value.trim(),
        url: form.querySelector('#tool-url').value.trim(),
        description: form.querySelector('#tool-description').value.trim(),
        category: form.querySelector('#tool-category').value,
        submitterEmail: form.querySelector('#submitter-email').value.trim()
      };

      // Validate
      if (!data.toolName || !data.url || !data.description || !data.category) {
        showMessage(msgEl, I18n.t('submitError'), 'error');
        return;
      }

      btn.disabled = true;
      btn.textContent = '...';

      try {
        if (SUBMIT_WEBHOOK_URL !== 'YOUR_GOOGLE_APPS_SCRIPT_URL') {
          await fetch(SUBMIT_WEBHOOK_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
          });
        }
        showMessage(msgEl, I18n.t('submitSuccess'), 'success');
        form.reset();
      } catch (err) {
        showMessage(msgEl, I18n.t('submitError'), 'error');
      } finally {
        btn.disabled = false;
        btn.textContent = I18n.t('submitButton');
      }
    });
  }

  function showMessage(el, text, type) {
    if (!el) return;
    el.textContent = text;
    el.className = 'form-message ' + type;
    setTimeout(() => { el.className = 'form-message'; el.textContent = ''; }, 5000);
  }

  return { init };
})();
