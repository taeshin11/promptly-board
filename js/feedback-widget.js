// feedback-widget.js - Floating feedback button and modal
(function () {
  const PROJECT_NAME = 'PromptlyBoard';
  const EMAIL = 'taeshinkim11@gmail.com';

  // Translation keys added to translations.json dynamically via this module
  const feedbackTranslations = {
    en: { feedbackWidgetTitle: 'Send Feedback', feedbackPlaceholder: 'Your message...', feedbackSubmit: 'Send', feedbackClose: 'Close' },
    ko: { feedbackWidgetTitle: '피드백 보내기', feedbackPlaceholder: '메시지를 입력하세요...', feedbackSubmit: '보내기', feedbackClose: '닫기' },
    ja: { feedbackWidgetTitle: 'フィードバックを送る', feedbackPlaceholder: 'メッセージを入力...', feedbackSubmit: '送信', feedbackClose: '閉じる' },
    zh: { feedbackWidgetTitle: '发送反馈', feedbackPlaceholder: '输入您的留言...', feedbackSubmit: '发送', feedbackClose: '关闭' },
    es: { feedbackWidgetTitle: 'Enviar Comentario', feedbackPlaceholder: 'Tu mensaje...', feedbackSubmit: 'Enviar', feedbackClose: 'Cerrar' },
    fr: { feedbackWidgetTitle: 'Envoyer un Avis', feedbackPlaceholder: 'Votre message...', feedbackSubmit: 'Envoyer', feedbackClose: 'Fermer' },
    de: { feedbackWidgetTitle: 'Feedback Senden', feedbackPlaceholder: 'Ihre Nachricht...', feedbackSubmit: 'Senden', feedbackClose: 'Schließen' },
    pt: { feedbackWidgetTitle: 'Enviar Feedback', feedbackPlaceholder: 'Sua mensagem...', feedbackSubmit: 'Enviar', feedbackClose: 'Fechar' }
  };

  function getLang() {
    if (typeof I18n !== 'undefined' && typeof I18n.getLang === 'function') {
      return I18n.getLang();
    }
    return 'en';
  }

  function tr(key) {
    const lang = getLang();
    return (feedbackTranslations[lang] && feedbackTranslations[lang][key]) ||
           feedbackTranslations['en'][key] || key;
  }

  function createWidget() {
    // Inject styles
    const style = document.createElement('style');
    style.textContent = `
      #fb-btn {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #6366f1;
        color: #fff;
        font-size: 22px;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 16px rgba(99,102,241,0.45);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s, box-shadow 0.2s;
      }
      #fb-btn:hover { transform: scale(1.1); box-shadow: 0 6px 20px rgba(99,102,241,0.55); }
      #fb-overlay {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 9998;
        background: rgba(0,0,0,0.35);
        align-items: flex-end;
        justify-content: flex-end;
        padding: 84px 24px 24px 0;
      }
      #fb-overlay.fb-open { display: flex; }
      #fb-modal {
        background: #fff;
        border-radius: 14px;
        padding: 20px;
        width: 300px;
        box-shadow: 0 8px 32px rgba(0,0,0,0.18);
        position: relative;
      }
      #fb-modal h3 { margin: 0 0 12px; font-size: 15px; font-weight: 700; color: #1e1e2e; }
      #fb-textarea {
        width: 100%;
        min-height: 90px;
        border: 1px solid #e0e0e0;
        border-radius: 8px;
        padding: 10px;
        font-size: 13px;
        resize: vertical;
        box-sizing: border-box;
        font-family: inherit;
        color: #333;
        outline: none;
      }
      #fb-textarea:focus { border-color: #6366f1; }
      #fb-actions { display: flex; gap: 8px; margin-top: 10px; justify-content: flex-end; }
      #fb-submit {
        background: #6366f1;
        color: #fff;
        border: none;
        border-radius: 8px;
        padding: 7px 18px;
        font-size: 13px;
        cursor: pointer;
        font-weight: 600;
      }
      #fb-submit:hover { background: #4f46e5; }
      #fb-close-btn {
        background: #f3f4f6;
        color: #555;
        border: none;
        border-radius: 8px;
        padding: 7px 14px;
        font-size: 13px;
        cursor: pointer;
        position: absolute;
        top: 12px;
        right: 12px;
        font-weight: 600;
        line-height: 1;
      }
      #fb-close-btn:hover { background: #e5e7eb; }
    `;
    document.head.appendChild(style);

    // Floating button
    const btn = document.createElement('button');
    btn.id = 'fb-btn';
    btn.setAttribute('aria-label', 'Send Feedback');
    btn.innerHTML = '💬';
    document.body.appendChild(btn);

    // Overlay + modal
    const overlay = document.createElement('div');
    overlay.id = 'fb-overlay';
    overlay.innerHTML = `
      <div id="fb-modal">
        <button id="fb-close-btn" aria-label="Close">✕</button>
        <h3 id="fb-title">${tr('feedbackWidgetTitle')}</h3>
        <textarea id="fb-textarea" placeholder="${tr('feedbackPlaceholder')}"></textarea>
        <div id="fb-actions">
          <button id="fb-submit">${tr('feedbackSubmit')}</button>
        </div>
      </div>
    `;
    document.body.appendChild(overlay);

    btn.addEventListener('click', openModal);
    document.getElementById('fb-close-btn').addEventListener('click', closeModal);
    overlay.addEventListener('click', function(e) { if (e.target === overlay) closeModal(); });
    document.getElementById('fb-submit').addEventListener('click', submitFeedback);

    // Re-translate on language change
    window.addEventListener('langchange', updateWidgetLang);
  }

  function openModal() {
    updateWidgetLang();
    document.getElementById('fb-overlay').classList.add('fb-open');
    document.getElementById('fb-textarea').focus();
  }

  function closeModal() {
    document.getElementById('fb-overlay').classList.remove('fb-open');
    document.getElementById('fb-textarea').value = '';
  }

  function submitFeedback() {
    const msg = document.getElementById('fb-textarea').value.trim();
    const subject = encodeURIComponent('[' + PROJECT_NAME + '] Feedback');
    const body = encodeURIComponent(msg || '(no message)');
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    closeModal();
  }

  function updateWidgetLang() {
    const title = document.getElementById('fb-title');
    const textarea = document.getElementById('fb-textarea');
    const submitBtn = document.getElementById('fb-submit');
    if (title) title.textContent = tr('feedbackWidgetTitle');
    if (textarea) textarea.placeholder = tr('feedbackPlaceholder');
    if (submitBtn) submitBtn.textContent = tr('feedbackSubmit');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }
})();
