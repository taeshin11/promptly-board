// search.js - Search functionality
const Search = (() => {
  function filter(tools, query) {
    if (!query || !query.trim()) return tools;
    const q = query.toLowerCase().trim();
    return tools.filter(t =>
      t.name.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tags.some(tag => tag.toLowerCase().includes(q)) ||
      t.category.toLowerCase().includes(q)
    );
  }

  function filterByCategory(tools, category) {
    if (!category || category === 'all') return tools;
    return tools.filter(t => t.category === category);
  }

  function sort(tools, sortBy) {
    const sorted = [...tools];
    switch (sortBy) {
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'name':
        return sorted.sort((a, b) => a.name.localeCompare(b.name));
      case 'newest':
        return sorted.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
      default:
        return sorted;
    }
  }

  return { filter, filterByCategory, sort };
})();
