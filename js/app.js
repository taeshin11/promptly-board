// app.js - Main application logic
const App = (() => {
  let allTools = [];
  let filteredTools = [];
  let currentCategory = 'all';
  let currentSort = 'rating';
  let searchQuery = '';

  const categoryIcons = {
    chatbot: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>',
    'image-gen': '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>',
    coding: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
    writing: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>',
    video: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>',
    audio: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>',
    productivity: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>',
    research: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
    design: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="19" cy="17" r="2.5"/><circle cx="6" cy="15.5" r="2.5"/></svg>',
    education: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>'
  };

  async function init() {
    await I18n.init();
    allTools = await DataLoader.load();

    initDarkMode();
    initHamburger();
    renderCategories();
    initSearch();
    initSort();
    applyFilters();
    renderFeatured();

    Visitor.init();
    Ads.init();
    SheetsWebhook.logVisit();

    // Listen for language changes
    window.addEventListener('langchange', () => {
      renderCategories();
      applyFilters();
      renderFeatured();
    });
  }

  function initDarkMode() {
    const toggle = document.getElementById('dark-toggle');
    if (!toggle) return;

    const isDark = localStorage.getItem('pb-dark') === 'true';
    if (isDark) document.body.classList.add('dark');
    toggle.textContent = isDark ? '☀️' : '🌙';

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const dark = document.body.classList.contains('dark');
      localStorage.setItem('pb-dark', dark);
      toggle.textContent = dark ? '☀️' : '🌙';
    });
  }

  function initHamburger() {
    const btn = document.getElementById('nav-hamburger');
    const links = document.getElementById('nav-links');
    if (!btn || !links) return;
    btn.addEventListener('click', () => links.classList.toggle('open'));
  }

  function renderCategories() {
    const container = document.getElementById('category-filters');
    if (!container) return;

    const cats = DataLoader.getCategories();
    const categories = ['all', 'chatbot', 'image-gen', 'coding', 'writing', 'video', 'audio', 'productivity', 'research', 'design', 'education'];

    container.innerHTML = '';
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'category-btn' + (cat === currentCategory ? ' active' : '');
      const label = cat === 'all' ? I18n.t('allCategories') : I18n.t(cat);
      const count = cat === 'all' ? allTools.length : (cats[cat] || 0);
      btn.innerHTML = `${label} <span class="cat-count">(${count})</span>`;
      btn.addEventListener('click', () => {
        currentCategory = cat;
        Pagination.reset();
        applyFilters();
        renderCategories();
      });
      container.appendChild(btn);
    });
  }

  function initSearch() {
    const input = document.getElementById('search-input');
    if (!input) return;

    let debounce;
    input.addEventListener('input', (e) => {
      clearTimeout(debounce);
      debounce = setTimeout(() => {
        searchQuery = e.target.value;
        Pagination.reset();
        applyFilters();
      }, 200);
    });
  }

  function initSort() {
    const select = document.getElementById('sort-select');
    if (!select) return;
    select.addEventListener('change', (e) => {
      currentSort = e.target.value;
      applyFilters();
    });
  }

  function applyFilters() {
    let tools = [...allTools];
    tools = Search.filterByCategory(tools, currentCategory);
    tools = Search.filter(tools, searchQuery);
    tools = Search.sort(tools, currentSort);
    filteredTools = tools;

    Pagination.setTotal(filteredTools.length);

    // Update results count
    const countEl = document.getElementById('results-count');
    if (countEl) {
      countEl.textContent = `${filteredTools.length} ${I18n.t('toolsFound')}`;
    }

    renderTools();
    renderPagination();
  }

  function renderTools() {
    const grid = document.getElementById('tools-grid');
    if (!grid) return;

    const pageTools = Pagination.getSlice(filteredTools);

    if (pageTools.length === 0) {
      grid.innerHTML = `<div class="no-results">${I18n.t('noResults')}</div>`;
      return;
    }

    grid.innerHTML = '';
    pageTools.forEach((tool, index) => {
      // Insert ad after every 6th card
      if (index > 0 && index % 6 === 0) {
        const adDiv = document.createElement('div');
        adDiv.className = 'ad-slot';
        adDiv.style.gridColumn = '1 / -1';
        adDiv.innerHTML = '<div class="ad-placeholder">Advertisement</div>';
        grid.appendChild(adDiv);
      }

      const card = document.createElement('article');
      card.className = 'tool-card';
      card.setAttribute('role', 'article');
      card.innerHTML = `
        <div class="tool-card-header">
          <h3 class="tool-card-title">${escapeHtml(tool.name)}</h3>
          <span class="tool-card-rating">&#9733; ${tool.rating}</span>
        </div>
        <span class="tool-card-category cat-${tool.category}">${I18n.t(tool.category)}</span>
        <p class="tool-card-desc">${escapeHtml(tool.description)}</p>
        <div class="tool-card-footer">
          <a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener noreferrer" class="tool-card-link" onclick="event.stopPropagation()">
            ${I18n.t('visitTool')} &rarr;
          </a>
          <span class="tool-card-pricing pricing-${tool.pricing}">${I18n.t(tool.pricing)}</span>
        </div>
      `;
      card.addEventListener('click', () => openModal(tool));
      grid.appendChild(card);
    });
  }

  function renderPagination() {
    const container = document.getElementById('pagination');
    if (!container) return;
    Pagination.render(container, () => {
      renderTools();
      renderPagination();
      window.scrollTo({ top: document.getElementById('tools-grid').offsetTop - 80, behavior: 'smooth' });
    });
  }

  function renderFeatured() {
    const container = document.getElementById('featured-grid');
    if (!container) return;

    const featured = DataLoader.getFeatured().slice(0, 6);
    container.innerHTML = '';
    featured.forEach(tool => {
      const card = document.createElement('article');
      card.className = 'tool-card';
      card.innerHTML = `
        <div class="tool-card-header">
          <h3 class="tool-card-title">${escapeHtml(tool.name)}</h3>
          <span class="tool-card-rating">&#9733; ${tool.rating}</span>
        </div>
        <span class="tool-card-category cat-${tool.category}">${I18n.t(tool.category)}</span>
        <p class="tool-card-desc">${escapeHtml(tool.description)}</p>
        <div class="tool-card-footer">
          <a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener noreferrer" class="tool-card-link" onclick="event.stopPropagation()">
            ${I18n.t('visitTool')} &rarr;
          </a>
          <span class="tool-card-pricing pricing-${tool.pricing}">${I18n.t(tool.pricing)}</span>
        </div>
      `;
      card.addEventListener('click', () => openModal(tool));
      container.appendChild(card);
    });
  }

  function openModal(tool) {
    const overlay = document.getElementById('modal-overlay');
    if (!overlay) return;

    const content = overlay.querySelector('.modal-content');
    content.innerHTML = `
      <button class="modal-close" aria-label="${I18n.t('close')}">&times;</button>
      <h2 class="modal-title">${escapeHtml(tool.name)}</h2>
      <span class="modal-category cat-${tool.category}">${I18n.t(tool.category)}</span>
      <p class="modal-desc">${escapeHtml(tool.description)}</p>
      <div class="modal-meta">
        <div class="modal-meta-item"><strong>${I18n.t('pricing')}:</strong> ${I18n.t(tool.pricing)}</div>
        <div class="modal-meta-item"><strong>${I18n.t('sortRating')}:</strong> &#9733; ${tool.rating}</div>
        <div class="modal-meta-item"><strong>${I18n.t('addedOn')}:</strong> ${tool.dateAdded}</div>
      </div>
      <div class="modal-tags">
        ${tool.tags.map(tag => `<span class="modal-tag">${escapeHtml(tag)}</span>`).join('')}
      </div>
      <div class="modal-actions">
        <a href="${escapeHtml(tool.url)}" target="_blank" rel="noopener noreferrer" class="modal-visit-btn">
          ${I18n.t('visitTool')} &rarr;
        </a>
        <div class="social-share">
          <a href="https://twitter.com/intent/tweet?text=Check out ${encodeURIComponent(tool.name)}!&url=${encodeURIComponent(tool.url)}" target="_blank" class="share-btn twitter" title="Twitter">X</a>
          <a href="https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(tool.url)}" target="_blank" class="share-btn facebook" title="Facebook">f</a>
          <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(tool.url)}" target="_blank" class="share-btn linkedin" title="LinkedIn">in</a>
          <a href="https://reddit.com/submit?url=${encodeURIComponent(tool.url)}&title=${encodeURIComponent(tool.name)}" target="_blank" class="share-btn reddit" title="Reddit">r</a>
        </div>
      </div>
    `;

    overlay.classList.add('active');

    // Close handlers
    content.querySelector('.modal-close').addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closeModal(); });
    document.addEventListener('keydown', handleEsc);
  }

  function closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) overlay.classList.remove('active');
    document.removeEventListener('keydown', handleEsc);
  }

  function handleEsc(e) { if (e.key === 'Escape') closeModal(); }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  return { init };
})();

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', App.init);
