/**
 * MAMDOUH ABOAMMAR — PORTFOLIO ENGINE (Geist Mono / Zero-Slop Architecture)
 * Renders 142 repositories with real-time filtering, search, modal story view, and copy actions.
 */

(function () {
  'use strict';

  // State
  let allRepos = window.REPOS_DATA || [];
  let currentCategory = 'ALL';
  let currentVisibility = 'ALL'; // 'ALL', 'PUBLIC', 'PRIVATE', 'FORK'
  let currentSort = 'FEATURED'; // 'FEATURED', 'STARS', 'UPDATED', 'NAME'
  let searchQuery = '';

  // Elements
  const featuredGrid = document.getElementById('featured-grid');
  const reposGrid = document.getElementById('repos-grid');
  const searchInput = document.getElementById('search-input');
  const sortSelect = document.getElementById('sort-select');
  const categoryPillsContainer = document.getElementById('category-pills');
  const segmentBtns = document.querySelectorAll('.segment-btn');
  const resultsCountEl = document.getElementById('results-count');
  const activeFiltersDesc = document.getElementById('active-filters-desc');
  const resetFiltersBtn = document.getElementById('reset-filters-btn');
  const toast = document.getElementById('toast-notice');
  const toastMessage = document.getElementById('toast-message');

  // Modal elements
  const repoModal = document.getElementById('repo-modal');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalCategory = document.getElementById('modal-category');
  const modalDesc = document.getElementById('modal-desc');
  const modalFact = document.getElementById('modal-fact');
  const modalWhy = document.getElementById('modal-why');
  const modalSnippets = document.getElementById('modal-snippets');
  const modalCloneCmd = document.getElementById('modal-clone-cmd');
  const modalGithubLink = document.getElementById('modal-github-link');

  // Initialize App
  function init() {
    renderFeaturedShowcase();
    renderCategoryPills();
    attachEventListeners();
    applyFiltersAndRender();
  }

  // Toast Notification
  function showToast(message) {
    if (!toast) return;
    toastMessage.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2400);
  }

  // Copy helper
  window.copyToClipboard = function (text, label) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`Copied ${label || 'text'} to clipboard!`);
      }).catch(() => {
        fallbackCopy(text, label);
      });
    } else {
      fallbackCopy(text, label);
    }
  };

  function fallbackCopy(text, label) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand('copy');
      showToast(`Copied ${label || 'text'} to clipboard!`);
    } catch (e) {
      alert(`Clone command: ${text}`);
    }
    document.body.removeChild(textarea);
  }

  // Render Top Crown Jewels Showcase
  function renderFeaturedShowcase() {
    if (!featuredGrid) return;
    const featured = allRepos.filter(r => r.isFeatured).slice(0, 6);
    featuredGrid.innerHTML = featured.map(repo => {
      const cloneCmd = `git clone ${repo.url}.git`;
      return `
        <article class="featured-card">
          <div class="card-top-row">
            <div class="card-title-group">
              <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="card-title">
                ${escapeHtml(repo.name)}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <span class="card-category-tag">${escapeHtml(repo.category)}</span>
            </div>
            <div class="card-badges">
              ${repo.language ? `<span class="pill lang">${escapeHtml(repo.language)}</span>` : ''}
              <span class="pill ${repo.private ? 'private' : 'public'}">${repo.private ? 'Private Arch' : 'Public'}</span>
            </div>
          </div>

          <p class="card-desc">${escapeHtml(repo.description || 'System component and engineering engine.')}</p>

          <div class="card-fact-box">
            <span class="fact-title">⚡ VIBE FACT</span>
            ${escapeHtml(repo.funnyFact)}
          </div>

          <div class="card-footer-actions">
            <span class="pill fork">${repo.stars > 0 ? `★ ${repo.stars}` : 'Production'}</span>
            <div class="action-btn-group">
              <button class="btn-icon-text" onclick="window.copyToClipboard('${cloneCmd}', 'clone command')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Clone
              </button>
              <button class="btn-icon-text primary" onclick="window.openRepoModal('${escapeHtml(repo.name)}')">
                Read Story
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Render Dynamic Category Pills with counts
  function renderCategoryPills() {
    if (!categoryPillsContainer) return;

    // Calculate counts
    const categoryCounts = {};
    allRepos.forEach(r => {
      categoryCounts[r.category] = (categoryCounts[r.category] || 0) + 1;
    });

    const categories = Object.keys(categoryCounts).sort();

    let pillsHtml = `
      <button class="cat-pill-btn ${currentCategory === 'ALL' ? 'active' : ''}" data-category="ALL">
        All Repos <span class="count">${allRepos.length}</span>
      </button>
      <button class="cat-pill-btn ${currentCategory === 'FEATURED' ? 'active' : ''}" data-category="FEATURED">
        ⭐ Crown Jewels <span class="count">${allRepos.filter(r => r.isFeatured).length}</span>
      </button>
    `;

    categories.forEach(cat => {
      const isSelected = currentCategory === cat;
      pillsHtml += `
        <button class="cat-pill-btn ${isSelected ? 'active' : ''}" data-category="${escapeHtml(cat)}">
          ${escapeHtml(cat)} <span class="count">${categoryCounts[cat]}</span>
        </button>
      `;
    });

    categoryPillsContainer.innerHTML = pillsHtml;

    // Attach click handlers to category buttons
    categoryPillsContainer.querySelectorAll('.cat-pill-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        currentCategory = btn.getAttribute('data-category');
        categoryPillsContainer.querySelectorAll('.cat-pill-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        applyFiltersAndRender();
      });
    });
  }

  // Filter and Sort Logic
  function getFilteredRepos() {
    return allRepos.filter(repo => {
      // Category filter
      if (currentCategory === 'FEATURED' && !repo.isFeatured) return false;
      if (currentCategory !== 'ALL' && currentCategory !== 'FEATURED' && repo.category !== currentCategory) return false;

      // Visibility filter
      if (currentVisibility === 'PUBLIC' && repo.private) return false;
      if (currentVisibility === 'PRIVATE' && !repo.private) return false;
      if (currentVisibility === 'FORK' && !repo.fork) return false;

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = repo.name.toLowerCase().includes(query);
        const matchesDesc = (repo.description || '').toLowerCase().includes(query);
        const matchesCategory = (repo.category || '').toLowerCase().includes(query);
        const matchesLang = (repo.language || '').toLowerCase().includes(query);
        const matchesFact = (repo.funnyFact || '').toLowerCase().includes(query);
        const matchesWhy = (repo.whyCrafted || '').toLowerCase().includes(query);
        const matchesSnippets = (repo.snippetsHistory || '').toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesCategory && !matchesLang && !matchesFact && !matchesWhy && !matchesSnippets) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (currentSort === 'FEATURED') {
        if (a.isFeatured && !b.isFeatured) return -1;
        if (!a.isFeatured && b.isFeatured) return 1;
        return (b.stars || 0) - (a.stars || 0);
      }
      if (currentSort === 'STARS') {
        return (b.stars || 0) - (a.stars || 0);
      }
      if (currentSort === 'UPDATED') {
        return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
      }
      if (currentSort === 'NAME') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }

  // Render Grid
  function applyFiltersAndRender() {
    const filtered = getFilteredRepos();

    // Update count indicator
    if (resultsCountEl) {
      resultsCountEl.textContent = `${filtered.length} of ${allRepos.length} Repositories`;
    }

    // Update active filter text
    if (activeFiltersDesc) {
      let desc = [];
      if (currentCategory !== 'ALL') desc.push(`Category: "${currentCategory}"`);
      if (currentVisibility !== 'ALL') desc.push(`Visibility: ${currentVisibility}`);
      if (searchQuery.trim()) desc.push(`Query: "${searchQuery}"`);
      activeFiltersDesc.textContent = desc.length > 0 ? desc.join(' • ') : 'Showing All Repositories';
    }

    if (!reposGrid) return;

    if (filtered.length === 0) {
      reposGrid.innerHTML = `
        <div class="empty-state">
          <h3 class="empty-title">No matching repositories found</h3>
          <p class="empty-desc">Try loosening your search query or switching categories.</p>
          <button class="nav-btn primary" onclick="window.resetAllFilters()">Reset All Filters</button>
        </div>
      `;
      return;
    }

    reposGrid.innerHTML = filtered.map(repo => {
      const cloneCmd = `git clone ${repo.url}.git`;
      const isFeatured = repo.isFeatured;
      const cardId = `accordion-${escapeId(repo.name)}`;

      return `
        <article class="repo-card ${isFeatured ? 'featured-border' : ''}">
          <div class="repo-card-header">
            <div>
              <a href="${repo.url}" target="_blank" rel="noopener noreferrer" class="repo-name-link">
                ${isFeatured ? '<span style="color: #D97706;">★</span> ' : ''}${escapeHtml(repo.name)}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              </a>
              <div class="card-category-tag" style="margin-top: 0.2rem;">${escapeHtml(repo.category)}</div>
            </div>
            <div class="card-badges">
              ${repo.language ? `<span class="pill lang">${escapeHtml(repo.language)}</span>` : ''}
              <span class="pill ${repo.private ? 'private' : 'public'}">${repo.private ? 'Private' : 'Public'}</span>
            </div>
          </div>

          <p class="repo-desc">${escapeHtml(repo.description || 'Production system component.')}</p>

          <div class="card-fact-box">
            <span class="fact-title">🎭 VIBE FACT</span>
            ${escapeHtml(repo.funnyFact)}
          </div>

          <div class="repo-accordion">
            <button class="accordion-toggle" onclick="window.toggleAccordion('${cardId}', this)">
              <span>Why I Built This & History</span>
              <span class="toggle-icon">+</span>
            </button>
            <div class="accordion-body" id="${cardId}">
              <div class="accordion-item-group">
                <span class="accordion-item-label">🎯 Why Crafted</span>
                <p>${escapeHtml(repo.whyCrafted)}</p>
              </div>
              <div class="accordion-item-group">
                <span class="accordion-item-label">📜 Snippets & History</span>
                <p>${escapeHtml(repo.snippetsHistory)}</p>
              </div>
            </div>
          </div>

          <div class="repo-card-actions">
            <span class="pill fork">${repo.stars > 0 ? `★ ${repo.stars}` : 'Verified'}</span>
            <div class="action-btn-group">
              <button class="btn-icon-text" onclick="window.copyToClipboard('${cloneCmd}', 'clone command')">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                Clone
              </button>
              <button class="btn-icon-text" onclick="window.openRepoModal('${escapeHtml(repo.name)}')">
                Details
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  // Toggle Accordion inline
  window.toggleAccordion = function (elementId, button) {
    const el = document.getElementById(elementId);
    if (!el) return;
    const isOpen = el.classList.contains('open');
    if (isOpen) {
      el.classList.remove('open');
      button.classList.remove('open');
      button.querySelector('.toggle-icon').textContent = '+';
    } else {
      el.classList.add('open');
      button.classList.add('open');
      button.querySelector('.toggle-icon').textContent = '−';
    }
  };

  // Reset all filters
  window.resetAllFilters = function () {
    currentCategory = 'ALL';
    currentVisibility = 'ALL';
    currentSort = 'FEATURED';
    searchQuery = '';
    if (searchInput) searchInput.value = '';
    if (sortSelect) sortSelect.value = 'FEATURED';

    segmentBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-vis') === 'ALL');
    });

    if (categoryPillsContainer) {
      categoryPillsContainer.querySelectorAll('.cat-pill-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-category') === 'ALL');
      });
    }

    applyFiltersAndRender();
  };

  // Modal handlers
  window.openRepoModal = function (repoName) {
    const repo = allRepos.find(r => r.name === repoName);
    if (!repo || !repoModal) return;

    modalTitle.textContent = repo.name;
    modalCategory.textContent = `${repo.category} • ${repo.language || 'Codebase'} • ${repo.private ? 'Private Architecture' : 'Public Open-Source'}`;
    modalDesc.textContent = repo.description || 'No description provided.';
    modalFact.textContent = repo.funnyFact || 'N/A';
    modalWhy.textContent = repo.whyCrafted || 'N/A';
    modalSnippets.textContent = repo.snippetsHistory || 'N/A';
    modalCloneCmd.textContent = `git clone ${repo.url}.git`;
    modalGithubLink.href = repo.url;

    repoModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    if (!repoModal) return;
    repoModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  // Attach Event Listeners
  function attachEventListeners() {
    // Search input
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        applyFiltersAndRender();
      });
    }

    // Keyboard shortcut '/' to search
    window.addEventListener('keydown', (e) => {
      if (e.key === '/' && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
      if (e.key === 'Escape') {
        closeModal();
      }
    });

    // Sort select
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        applyFiltersAndRender();
      });
    }

    // Segmented Visibility buttons
    segmentBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        segmentBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentVisibility = btn.getAttribute('data-vis');
        applyFiltersAndRender();
      });
    });

    // Reset button
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener('click', window.resetAllFilters);
    }

    // Modal close
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (repoModal) {
      repoModal.addEventListener('click', (e) => {
        if (e.target === repoModal) closeModal();
      });
    }
  }

  // Utility helpers
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function escapeId(str) {
    return String(str).replace(/[^a-zA-Z0-9_-]/g, '_');
  }

  // Start on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
