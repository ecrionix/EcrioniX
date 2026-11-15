/**
 * EcrioniX Central Resource Explorer
 * High-performance client-side multi-filtering, search, and URL deep-linking
 */

(function () {
  'use strict';

  let catalogData = [];
  let filteredData = [];
  const PAGE_SIZE = 30;
  let visibleCount = PAGE_SIZE;

  // Filter state
  const state = {
    q: '',
    category: '',
    type: '',
    difficulty: '',
    sort: 'relevance'
  };

  // DOM Elements
  const searchInput = document.getElementById('expSearchInput');
  const searchClear = document.getElementById('expSearchClear');
  const statusCounter = document.getElementById('expStatusCounter');
  const activeTagsContainer = document.getElementById('expActiveTags');
  const resultsGrid = document.getElementById('expResultsGrid');
  const emptyState = document.getElementById('expEmptyState');
  const loadMoreBtn = document.getElementById('expLoadMoreBtn');
  const loadMoreContainer = document.getElementById('expLoadMoreContainer');
  const sortSelect = document.getElementById('expSortSelect');

  // Sidebar Filter Containers
  const categoryFiltersEl = document.getElementById('expCategoryFilters');
  const typeFiltersEl = document.getElementById('expTypeFilters');
  const difficultyFiltersEl = document.getElementById('expDifficultyFilters');

  // Mobile Filter Drawer Elements
  const mobileFilterBtn = document.getElementById('expMobileFilterBtn');
  const mobileFilterModal = document.getElementById('expMobileFilterModal');
  const mobileFilterClose = document.getElementById('expMobileFilterClose');
  const mobileFilterApply = document.getElementById('expMobileFilterApply');
  const mobileCategoryFiltersEl = document.getElementById('expMobileCategoryFilters');
  const mobileTypeFiltersEl = document.getElementById('expMobileTypeFilters');
  const mobileDifficultyFiltersEl = document.getElementById('expMobileDifficultyFilters');

  // Helper: Read query parameters from URL
  function readUrlParams() {
    const params = new URLSearchParams(window.location.search);
    state.q = params.get('q') || '';
    state.category = params.get('category') || '';
    state.type = params.get('type') || '';
    state.difficulty = params.get('difficulty') || '';
    state.sort = params.get('sort') || 'relevance';

    if (searchInput) searchInput.value = state.q;
    if (searchClear) searchClear.style.display = state.q ? 'flex' : 'none';
    if (sortSelect) sortSelect.value = state.sort;
  }

  // Helper: Sync current state to URL
  function syncUrlParams() {
    const params = new URLSearchParams();
    if (state.q) params.set('q', state.q);
    if (state.category) params.set('category', state.category);
    if (state.type) params.set('type', state.type);
    if (state.difficulty) params.set('difficulty', state.difficulty);
    if (state.sort && state.sort !== 'relevance') params.set('sort', state.sort);

    const queryStr = params.toString();
    const newUrl = window.location.pathname + (queryStr ? '?' + queryStr : '');
    window.history.replaceState(null, '', newUrl);
  }

  // Predefined Categories & Types with canonical order
  const PRIMARY_CATEGORIES = [
    'RTL Design',
    'Physical Design (PD)',
    'Verification & Validation',
    'Digital Electronics',
    'Semiconductor Fundamentals',
    'Labs & Experiments',
    'Simulators & Tools',
    'Courses & Paths',
    'Projects & Implementations',
    'Interview Preparation'
  ];

  const RESOURCE_TYPES = [
    'Tutorial',
    'Course Lesson',
    'Interactive Lab',
    'Simulator / Tool',
    'Practice Kata',
    'Project / Capstone',
    'Interview Prep',
    'Learning Path'
  ];

  const DIFFICULTIES = ['Beginner', 'Intermediate', 'Advanced', 'All Levels'];

  // Render Filter Lists
  function renderFilterOptions(container, items, stateKey, getCountFn) {
    if (!container) return;
    let html = `<li class="exp-filter-item ${!state[stateKey] ? 'is-selected' : ''}" data-value="">
      <span>All</span>
      <span class="exp-count-badge">${catalogData.length}</span>
    </li>`;

    items.forEach(function (item) {
      const count = getCountFn(item);
      const isSel = state[stateKey] === item;
      html += `<li class="exp-filter-item ${isSel ? 'is-selected' : ''}" data-value="${escapeHtml(item)}">
        <span>${escapeHtml(item)}</span>
        <span class="exp-count-badge">${count}</span>
      </li>`;
    });

    container.innerHTML = html;

    // Attach click events
    container.querySelectorAll('.exp-filter-item').forEach(function (el) {
      el.addEventListener('click', function () {
        const val = this.getAttribute('data-value');
        state[stateKey] = val;
        visibleCount = PAGE_SIZE;
        syncUrlParams();
        applyFiltersAndRender();
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Filter & Search Logic
  function applyFiltersAndRender() {
    const q = state.q.toLowerCase().trim();
    const qTokens = q ? q.split(/\s+/).filter(Boolean) : [];

    filteredData = catalogData.filter(function (item) {
      // Category check
      if (state.category && item.category !== state.category) {
        return false;
      }
      // Type check
      if (state.type && item.type !== state.type) {
        return false;
      }
      // Difficulty check
      if (state.difficulty && item.difficulty !== state.difficulty) {
        return false;
      }
      // Search query check
      if (qTokens.length > 0) {
        const titleLower = item.title.toLowerCase();
        const descLower = item.desc.toLowerCase();
        const catLower = item.category.toLowerCase();
        const subLower = item.subcategory.toLowerCase();
        const tagsLower = item.tags.join(' ').toLowerCase();

        // All search tokens must match somewhere in resource metadata
        for (let i = 0; i < qTokens.length; i++) {
          const t = qTokens[i];
          if (
            !titleLower.includes(t) &&
            !tagsLower.includes(t) &&
            !descLower.includes(t) &&
            !subLower.includes(t) &&
            !catLower.includes(t)
          ) {
            return false;
          }
        }
      }
      return true;
    });

    // Sorting
    sortData();

    // Render active tags
    renderActiveFilterPills();

    // Re-render sidebar active states
    updateFilterSelections();

    // Render results
    renderResults();
  }

  function sortData() {
    if (state.sort === 'title') {
      filteredData.sort(function (a, b) {
        return a.title.localeCompare(b.title);
      });
    } else if (state.sort === 'category') {
      filteredData.sort(function (a, b) {
        return a.category.localeCompare(b.category) || a.title.localeCompare(b.title);
      });
    } else if (state.sort === 'difficulty') {
      const order = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'All Levels': 4 };
      filteredData.sort(function (a, b) {
        return (order[a.difficulty] || 99) - (order[b.difficulty] || 99);
      });
    }
  }

  function updateFilterSelections() {
    [
      { container: categoryFiltersEl, key: 'category' },
      { container: typeFiltersEl, key: 'type' },
      { container: difficultyFiltersEl, key: 'difficulty' },
      { container: mobileCategoryFiltersEl, key: 'category' },
      { container: mobileTypeFiltersEl, key: 'type' },
      { container: mobileDifficultyFiltersEl, key: 'difficulty' }
    ].forEach(function (cfg) {
      if (!cfg.container) return;
      cfg.container.querySelectorAll('.exp-filter-item').forEach(function (el) {
        const val = el.getAttribute('data-value');
        if (val === state[cfg.key]) {
          el.classList.add('is-selected');
        } else {
          el.classList.remove('is-selected');
        }
      });
    });
  }

  function renderActiveFilterPills() {
    if (!activeTagsContainer) return;
    const pills = [];

    if (state.q) {
      pills.push({ label: 'Search: "' + state.q + '"', clear: function () {
        state.q = '';
        if (searchInput) searchInput.value = '';
        if (searchClear) searchClear.style.display = 'none';
      }});
    }
    if (state.category) {
      pills.push({ label: 'Category: ' + state.category, clear: function () {
        state.category = '';
      }});
    }
    if (state.type) {
      pills.push({ label: 'Type: ' + state.type, clear: function () {
        state.type = '';
      }});
    }
    if (state.difficulty) {
      pills.push({ label: 'Difficulty: ' + state.difficulty, clear: function () {
        state.difficulty = '';
      }});
    }

    if (pills.length === 0) {
      activeTagsContainer.innerHTML = '';
      activeTagsContainer.style.display = 'none';
      return;
    }

    activeTagsContainer.style.display = 'flex';
    let html = '';
    pills.forEach(function (p, idx) {
      html += `<span class="exp-active-pill">
        ${escapeHtml(p.label)}
        <button type="button" class="exp-active-pill-remove" data-pill-idx="${idx}" aria-label="Remove filter">&times;</button>
      </span>`;
    });

    html += `<button type="button" class="exp-btn-reset" id="expClearAllPills" style="margin-left:0.5rem;">Clear All</button>`;
    activeTagsContainer.innerHTML = html;

    // Attach individual clear events
    activeTagsContainer.querySelectorAll('.exp-active-pill-remove').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const idx = parseInt(this.getAttribute('data-pill-idx'), 10);
        if (pills[idx]) {
          pills[idx].clear();
          visibleCount = PAGE_SIZE;
          syncUrlParams();
          applyFiltersAndRender();
        }
      });
    });

    const clearAllBtn = document.getElementById('expClearAllPills');
    if (clearAllBtn) {
      clearAllBtn.addEventListener('click', function () {
        resetAllFilters();
      });
    }
  }

  function resetAllFilters() {
    state.q = '';
    state.category = '';
    state.type = '';
    state.difficulty = '';
    state.sort = 'relevance';
    if (searchInput) searchInput.value = '';
    if (searchClear) searchClear.style.display = 'none';
    if (sortSelect) sortSelect.value = 'relevance';
    visibleCount = PAGE_SIZE;
    syncUrlParams();
    applyFiltersAndRender();
  }

  function renderResults() {
    if (!resultsGrid || !statusCounter) return;

    const total = filteredData.length;
    statusCounter.innerHTML = `Showing <span>${Math.min(visibleCount, total)}</span> of <span>${total}</span> resources`;

    if (total === 0) {
      resultsGrid.style.display = 'none';
      if (loadMoreContainer) loadMoreContainer.style.display = 'none';
      if (emptyState) emptyState.style.display = 'block';
      return;
    }

    if (emptyState) emptyState.style.display = 'none';
    resultsGrid.style.display = 'grid';

    const itemsToRender = filteredData.slice(0, visibleCount);
    let cardsHtml = '';

    itemsToRender.forEach(function (item) {
      const diffClass = 'exp-diff-' + item.difficulty.toLowerCase().replace(/\s+/g, '-');
      const actionText = item.type === 'Simulator / Tool' || item.type === 'Interactive Lab'
        ? 'Launch Tool &rarr;'
        : (item.type === 'Practice Kata' ? 'Solve Problem &rarr;' : 'Explore Guide &rarr;');

      const tagsHtml = (item.tags || []).slice(0, 4).map(function (t) {
        return `<span class="exp-card-tag" data-tag="${escapeHtml(t)}">#${escapeHtml(t)}</span>`;
      }).join('');

      cardsHtml += `
      <article class="exp-card">
        <div class="exp-card-top">
          <div class="exp-card-meta">
            <div class="exp-badge-group">
              <span class="exp-cat-badge">${escapeHtml(item.category)}</span>
              <span class="exp-type-badge">${escapeHtml(item.type)}</span>
            </div>
            <span class="exp-diff-badge ${diffClass}">${escapeHtml(item.difficulty)}</span>
          </div>
          <h3 class="exp-card-title">
            <a href="${escapeHtml(item.url)}">${escapeHtml(item.title)}</a>
          </h3>
          <p class="exp-card-desc">${escapeHtml(item.desc)}</p>
        </div>
        <div class="exp-card-bottom">
          <div class="exp-card-tags">${tagsHtml}</div>
          <a href="${escapeHtml(item.url)}" class="exp-card-action">
            <span>${actionText}</span>
            <span style="font-size:1.1rem; line-height:1;">&nearr;</span>
          </a>
        </div>
      </article>`;
    });

    resultsGrid.innerHTML = cardsHtml;

    // Attach card tag click handlers
    resultsGrid.querySelectorAll('.exp-card-tag').forEach(function (tagEl) {
      tagEl.addEventListener('click', function (e) {
        e.stopPropagation();
        const tag = this.getAttribute('data-tag');
        state.q = tag;
        if (searchInput) searchInput.value = tag;
        if (searchClear) searchClear.style.display = 'flex';
        visibleCount = PAGE_SIZE;
        syncUrlParams();
        applyFiltersAndRender();
        window.scrollTo({ top: resultsGrid.offsetTop - 120, behavior: 'smooth' });
      });
    });

    // Load More Visibility
    if (loadMoreContainer) {
      if (visibleCount < total) {
        loadMoreContainer.style.display = 'flex';
        if (loadMoreBtn) {
          loadMoreBtn.textContent = `Load More (${total - visibleCount} remaining)`;
        }
      } else {
        loadMoreContainer.style.display = 'none';
      }
    }
  }

  // Event Listeners Setup
  function setupEventListeners() {
    // Search input with debounce
    let debounceTimer;
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        clearTimeout(debounceTimer);
        const val = this.value;
        if (searchClear) searchClear.style.display = val ? 'flex' : 'none';
        debounceTimer = setTimeout(function () {
          state.q = val;
          visibleCount = PAGE_SIZE;
          syncUrlParams();
          applyFiltersAndRender();
        }, 180);
      });
    }

    if (searchClear) {
      searchClear.addEventListener('click', function () {
        searchInput.value = '';
        state.q = '';
        searchClear.style.display = 'none';
        visibleCount = PAGE_SIZE;
        syncUrlParams();
        applyFiltersAndRender();
        searchInput.focus();
      });
    }

    // Keyboard shortcut: Press '/' to focus search
    document.addEventListener('keydown', function (e) {
      if (e.key === '/' && document.activeElement !== searchInput && !['input', 'textarea'].includes(document.activeElement.tagName.toLowerCase())) {
        e.preventDefault();
        searchInput.focus();
        window.scrollTo({ top: searchInput.offsetTop - 40, behavior: 'smooth' });
      }
    });

    // Sort Select
    if (sortSelect) {
      sortSelect.addEventListener('change', function () {
        state.sort = this.value;
        syncUrlParams();
        applyFiltersAndRender();
      });
    }

    // Load More Button
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', function () {
        visibleCount += PAGE_SIZE;
        renderResults();
      });
    }

    // Quick Topic Chips
    document.querySelectorAll('.exp-chip').forEach(function (chip) {
      chip.addEventListener('click', function () {
        const query = this.getAttribute('data-query');
        const cat = this.getAttribute('data-cat');
        const type = this.getAttribute('data-type');

        if (query) {
          state.q = query;
          if (searchInput) searchInput.value = query;
          if (searchClear) searchClear.style.display = 'flex';
        }
        if (cat) state.category = cat;
        if (type) state.type = type;

        visibleCount = PAGE_SIZE;
        syncUrlParams();
        applyFiltersAndRender();
      });
    });

    // Reset Buttons
    document.querySelectorAll('.exp-btn-reset').forEach(function (btn) {
      btn.addEventListener('click', function () {
        resetAllFilters();
      });
    });

    // Mobile Filter Drawer Handlers
    if (mobileFilterBtn && mobileFilterModal) {
      mobileFilterBtn.addEventListener('click', function () {
        mobileFilterModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
      });
    }

    function closeMobileFilterModal() {
      if (mobileFilterModal) {
        mobileFilterModal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
    }

    if (mobileFilterClose) {
      mobileFilterClose.addEventListener('click', closeMobileFilterModal);
    }
    if (mobileFilterApply) {
      mobileFilterApply.addEventListener('click', closeMobileFilterModal);
    }
    if (mobileFilterModal) {
      mobileFilterModal.addEventListener('click', function (e) {
        if (e.target === mobileFilterModal) {
          closeMobileFilterModal();
        }
      });
    }

    // Popstate handling (back/forward navigation)
    window.addEventListener('popstate', function () {
      readUrlParams();
      applyFiltersAndRender();
    });
  }

  // Initialize
  async function init() {
    try {
      const resp = await fetch('/assets/ecrionix-catalog.json');
      if (!resp.ok) throw new Error('Catalog HTTP error ' + resp.status);
      catalogData = await resp.json();

      // Read URL parameters
      readUrlParams();

      // Setup initial count calculations
      const catCount = function (cat) {
        return catalogData.filter(function (d) { return d.category === cat; }).length;
      };
      const typeCount = function (typ) {
        return catalogData.filter(function (d) { return d.type === typ; }).length;
      };
      const diffCount = function (diff) {
        return catalogData.filter(function (d) { return d.difficulty === diff; }).length;
      };

      // Render Desktop sidebar filters
      renderFilterOptions(categoryFiltersEl, PRIMARY_CATEGORIES, 'category', catCount);
      renderFilterOptions(typeFiltersEl, RESOURCE_TYPES, 'type', typeCount);
      renderFilterOptions(difficultyFiltersEl, DIFFICULTIES, 'difficulty', diffCount);

      // Render Mobile modal filters
      renderFilterOptions(mobileCategoryFiltersEl, PRIMARY_CATEGORIES, 'category', catCount);
      renderFilterOptions(mobileTypeFiltersEl, RESOURCE_TYPES, 'type', typeCount);
      renderFilterOptions(mobileDifficultyFiltersEl, DIFFICULTIES, 'difficulty', diffCount);

      setupEventListeners();
      applyFiltersAndRender();
    } catch (err) {
      console.error('Failed to load EcrioniX resource catalog:', err);
      if (resultsGrid) {
        resultsGrid.innerHTML = `
          <div class="exp-empty-state" style="grid-column:1/-1;">
            <div class="exp-empty-icon">&#9888;</div>
            <h3 class="exp-empty-title">Catalog Loading Error</h3>
            <p class="exp-empty-desc">Unable to load the resource catalog. Please check your internet connection or reload the page.</p>
            <button class="exp-btn-load-more" onclick="window.location.reload()">Reload Page</button>
          </div>`;
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
