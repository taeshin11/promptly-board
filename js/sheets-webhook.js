// sheets-webhook.js - Google Sheets visit logging
const SheetsWebhook = (() => {
  // Replace with your deployed Apps Script Web App URL
  const VISIT_WEBHOOK_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';

  function logVisit() {
    if (VISIT_WEBHOOK_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL') return; // Skip if not configured

    const data = {
      event: 'page_visit',
      page: window.location.pathname,
      userAgent: navigator.userAgent,
      language: navigator.language,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    // Fire and forget - don't block page load
    fetch(VISIT_WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }).catch(() => {}); // Silently fail
  }

  return { logVisit };
})();
