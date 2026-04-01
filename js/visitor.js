// visitor.js - Visitor counter using localStorage (no external dependency)
const Visitor = (() => {
  function init() {
    const today = new Date().toISOString().split('T')[0];
    const stored = JSON.parse(localStorage.getItem('pb-visitors') || '{}');

    if (!stored.total) stored.total = 0;
    if (stored.date !== today) {
      stored.date = today;
      stored.today = 0;
    }

    // Count this visit
    stored.total++;
    stored.today++;
    localStorage.setItem('pb-visitors', JSON.stringify(stored));

    // Update display
    const todayEl = document.getElementById('visitors-today');
    const totalEl = document.getElementById('visitors-total');
    if (todayEl) todayEl.textContent = stored.today;
    if (totalEl) totalEl.textContent = stored.total;
  }

  return { init };
})();
