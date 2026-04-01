// ads.js - Ad injection for Adsterra and Google AdSense
const Ads = (() => {
  function init() {
    // Adsterra placeholders are already in HTML
    // This module handles dynamic ad insertion between cards
    insertBetweenCardsAd();
  }

  function insertBetweenCardsAd() {
    // Will be called after cards render to insert ad between every 6th card
    // Handled in app.js render cycle
  }

  function createAdSlot(id, text) {
    const div = document.createElement('div');
    div.className = 'ad-slot';
    div.id = id;
    div.innerHTML = `<div class="ad-placeholder">${text}</div>`;
    return div;
  }

  return { init, createAdSlot };
})();
