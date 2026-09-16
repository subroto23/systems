(() => {
  "use strict";

  const grid = document.getElementById("projectGrid");
  const filtersEl = document.getElementById("filters");
  const searchInput = document.getElementById("searchInput");
  const noResults = document.getElementById("noResults");
  const statsEl = document.getElementById("stats");
  const themeToggle = document.getElementById("themeToggle");
  const yearEl = document.getElementById("year");
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");

  const STATUS_LABEL = {
    live: "লাইভ",
    beta: "বিটা",
    development: "ডেভেলপমেন্টে"
  };

  let activeCategory = "all";
  let activeQuery = "";

  // ---------- Theme ----------
  function initTheme() {
    const saved = safeGet("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.setAttribute("data-theme", theme);
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    safeSet("theme", next);
  }

  function safeGet(key) {
    try { return localStorage.getItem(key); } catch { return null; }
  }
  function safeSet(key, val) {
    try { localStorage.setItem(key, val); } catch { /* ignore */ }
  }

  // ---------- Filters ----------
  function getCategories() {
    const set = new Set(PROJECTS.map(p => p.category));
    return ["all", ...Array.from(set).sort()];
  }

  function renderFilters() {
    const categories = getCategories();
    filtersEl.innerHTML = categories
      .map(cat => {
        const label = cat === "all" ? "সব" : cat;
        const isActive = cat === activeCategory;
        return `<button class="chip${isActive ? " chip-active" : ""}" data-category="${escapeAttr(cat)}" role="tab" aria-selected="${isActive}">${escapeHtml(label)}</button>`;
      })
      .join("");

    filtersEl.querySelectorAll(".chip").forEach(btn => {
      btn.addEventListener("click", () => {
        activeCategory = btn.dataset.category;
        renderFilters();
        renderGrid();
      });
    });
  }

  // ---------- Search + filter logic ----------
  function matchesQuery(project, query) {
    if (!query) return true;
    const haystack = [
      project.title,
      project.tagline,
      project.description,
      project.category,
      ...(project.tags || [])
    ]
      .join(" ")
      .toLowerCase();
    return query
      .toLowerCase()
      .split(/\s+/)
      .filter(Boolean)
      .every(term => haystack.includes(term));
  }

  function getVisibleProjects() {
    return PROJECTS.filter(p => {
      const categoryOk = activeCategory === "all" || p.category === activeCategory;
      const queryOk = matchesQuery(p, activeQuery);
      return categoryOk && queryOk;
    });
  }

  // ---------- Render cards ----------
  function renderGrid() {
    const visible = getVisibleProjects();

    grid.innerHTML = visible.map(cardTemplate).join("");
    noResults.hidden = visible.length !== 0;

    statsEl.textContent = `${PROJECTS.length} টি সিস্টেম তালিকাভুক্ত • ${visible.length} টি দেখানো হচ্ছে`;
    observeReveals();
  }

  function cardTemplate(p, index) {
    const statusLabel = STATUS_LABEL[p.status] || p.status;
    const delay = Math.min(index, 8) * 60;
    return `
      <a class="project-card reveal" style="transition-delay:${delay}ms" href="${escapeAttr(p.url)}" target="_blank" rel="noopener noreferrer" data-id="${escapeAttr(p.id)}">
        <div class="card-top">
          <span class="card-icon" aria-hidden="true">${p.icon || "🧩"}</span>
          <span class="status-badge status-${escapeAttr(p.status)}">${escapeHtml(statusLabel)}</span>
        </div>
        <h3 class="card-title">${escapeHtml(p.title)}</h3>
        <p class="card-tagline">${escapeHtml(p.tagline)}</p>
        <p class="card-desc">${escapeHtml(p.description)}</p>
        <div class="card-footer">
          <span class="card-category">${escapeHtml(p.category)}</span>
          <span class="card-cta">সিস্টেম দেখুন
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </span>
        </div>
      </a>`;
  }

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
  function escapeAttr(str) {
    return escapeHtml(str);
  }

  // ---------- SEO / AI search: inject per-project JSON-LD ItemList ----------
  function injectStructuredData() {
    const itemList = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "itemListElement": PROJECTS.map((p, i) => ({
        "@type": "ListItem",
        "position": i + 1,
        "item": {
          "@type": "SoftwareApplication",
          "name": p.title,
          "description": p.description,
          "url": p.url,
          "applicationCategory": p.category
        }
      }))
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(itemList);
    document.head.appendChild(script);
  }

  // ---------- Search input wiring ----------
  function initSearch() {
    searchInput.addEventListener("input", () => {
      activeQuery = searchInput.value.trim();
      renderGrid();
    });

    // "/" keyboard shortcut focuses search, like many docs/search-first sites
    document.addEventListener("keydown", e => {
      if (e.key === "/" && document.activeElement !== searchInput) {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  // ---------- Scroll reveal animation ----------
  let revealObserver = null;
  function initRevealObserver() {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach(el => el.classList.add("reveal-visible"));
      return;
    }
    revealObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    observeReveals();
  }

  function observeReveals() {
    if (!revealObserver) return;
    document.querySelectorAll(".reveal:not(.reveal-visible)").forEach(el => revealObserver.observe(el));
  }

  // ---------- Mobile nav ----------
  function initMobileNav() {
    navToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
    mainNav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mainNav.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
    document.addEventListener("click", e => {
      if (!mainNav.classList.contains("nav-open")) return;
      if (mainNav.contains(e.target) || navToggle.contains(e.target)) return;
      mainNav.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  }

  // ---------- Init ----------
  function init() {
    initTheme();
    themeToggle.addEventListener("click", toggleTheme);
    initMobileNav();
    yearEl.textContent = new Date().getFullYear();

    initRevealObserver();
    renderFilters();
    renderGrid();
    initSearch();
    injectStructuredData();
  }

  document.addEventListener("DOMContentLoaded", init);
})();
