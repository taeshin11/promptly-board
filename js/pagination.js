// pagination.js - Pagination logic
const Pagination = (() => {
  const PER_PAGE = 12;
  let currentPage = 1;
  let totalItems = 0;

  function setTotal(total) {
    totalItems = total;
    if (currentPage > getTotalPages()) currentPage = 1;
  }

  function getTotalPages() { return Math.max(1, Math.ceil(totalItems / PER_PAGE)); }
  function getCurrentPage() { return currentPage; }

  function setPage(page) {
    const total = getTotalPages();
    currentPage = Math.max(1, Math.min(page, total));
  }

  function getSlice(items) {
    const start = (currentPage - 1) * PER_PAGE;
    return items.slice(start, start + PER_PAGE);
  }

  function reset() { currentPage = 1; }

  function render(container, onPageChange) {
    const total = getTotalPages();
    container.innerHTML = '';
    if (total <= 1) return;

    const prevBtn = document.createElement('button');
    prevBtn.textContent = I18n.t('previous');
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => { setPage(currentPage - 1); onPageChange(); });
    container.appendChild(prevBtn);

    // Page numbers
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(total, start + maxVisible - 1);
    if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1);

    for (let i = start; i <= end; i++) {
      const btn = document.createElement('button');
      btn.textContent = i;
      if (i === currentPage) btn.classList.add('active');
      btn.addEventListener('click', () => { setPage(i); onPageChange(); });
      container.appendChild(btn);
    }

    const nextBtn = document.createElement('button');
    nextBtn.textContent = I18n.t('next');
    nextBtn.disabled = currentPage === total;
    nextBtn.addEventListener('click', () => { setPage(currentPage + 1); onPageChange(); });
    container.appendChild(nextBtn);

    const info = document.createElement('span');
    info.className = 'pagination-info';
    info.textContent = `${I18n.t('page')} ${currentPage} ${I18n.t('of')} ${total}`;
    container.appendChild(info);
  }

  return { setTotal, getTotalPages, getCurrentPage, setPage, getSlice, reset, render, PER_PAGE };
})();
