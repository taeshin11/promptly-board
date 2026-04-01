// i18n.js - Internationalization module
const I18n = (() => {
  let translations = {};
  let currentLang = 'en';
  const supportedLangs = ['en', 'ko', 'ja', 'zh', 'es', 'fr', 'de', 'pt'];
  const langNames = {
    en: 'English', ko: '한국어', ja: '日本語', zh: '中文',
    es: 'Español', fr: 'Français', de: 'Deutsch', pt: 'Português'
  };

  async function init() {
    try {
      const res = await fetch('data/translations.json');
      translations = await res.json();
    } catch (e) {
      console.warn('Failed to load translations:', e);
      return;
    }

    // Detect language
    const saved = localStorage.getItem('pb-lang');
    if (saved && supportedLangs.includes(saved)) {
      currentLang = saved;
    } else {
      const browserLang = navigator.language || navigator.languages?.[0] || 'en';
      currentLang = supportedLangs.find(l => browserLang.startsWith(l)) || 'en';
    }

    applyTranslations();
    buildLangSelector();
  }

  function t(key) {
    return translations[currentLang]?.[key] || translations['en']?.[key] || key;
  }

  function setLang(lang) {
    if (supportedLangs.includes(lang)) {
      currentLang = lang;
      localStorage.setItem('pb-lang', lang);
      document.documentElement.lang = lang;
      applyTranslations();
      // Trigger re-render of dynamic content
      window.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
    }
  }

  function getLang() { return currentLang; }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.getAttribute('data-i18n-title'));
    });
  }

  function buildLangSelector() {
    const selector = document.getElementById('lang-selector');
    if (!selector) return;
    selector.innerHTML = '';
    supportedLangs.forEach(lang => {
      const opt = document.createElement('option');
      opt.value = lang;
      opt.textContent = langNames[lang];
      if (lang === currentLang) opt.selected = true;
      selector.appendChild(opt);
    });
    selector.addEventListener('change', (e) => setLang(e.target.value));
  }

  return { init, t, setLang, getLang, applyTranslations };
})();
