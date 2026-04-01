// data-loader.js - Load and parse tools.json
const DataLoader = (() => {
  let tools = [];

  async function load() {
    try {
      const res = await fetch('data/tools.json');
      tools = await res.json();
    } catch (e) {
      console.error('Failed to load tools:', e);
      tools = [];
    }
    return tools;
  }

  function getTools() { return tools; }
  function getFeatured() { return tools.filter(t => t.featured); }

  function getCategories() {
    const cats = {};
    tools.forEach(t => {
      cats[t.category] = (cats[t.category] || 0) + 1;
    });
    return cats;
  }

  return { load, getTools, getFeatured, getCategories };
})();
