/**
 * Kings Biryani's and Family Restaurant - Main Application Script
 * ===============================================================
 * Handles menu rendering, category filtering, search, portion selection,
 * accessible gallery lightbox with keyboard navigation, secure customer reviews,
 * Indian mobile validation for catering enquiries, opening hours calculation (IST),
 * and mobile navigation accessibility.
 *
 * Bug Fixes:
 * - Toast now adds 'visible' class (was previously adding 'show' which CSS didn't use)
 * - WhatsApp links reference window.RESTAURANT_CONFIG (not window.CONFIG)
 * - Hero CTA links corrected
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderBrandAndConfig();
  renderSignatureDishes();
  renderMenuCategories();
  renderMenuItems(currentMenuCategory);
  renderGallery('all');
  renderCustomerReviews();
  setupMenuFiltersAndSearch();
  setupMenuAddToCart();
  setupGalleryFilters();
  setupLightbox();
  setupReviewModal();
  setupGenericModals();
  setupContactForm();
  setupMobileNav();
  setupScrollSpy();
  setupHoursStatus();
  setupHeroVideo();
}

/* ==========================================================================
   Utility: HTML Escaping for XSS Prevention
   ========================================================================== */
function escapeHTML(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/* ==========================================================================
   Toast Notification Helper
   BUG FIX: Now correctly adds 'visible' class (not 'show')
   ========================================================================== */
function showToast(message, type = 'info') {
  let container = document.getElementById('royal-toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'royal-toast-container';
    container.className = 'royal-toast-container';
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-atomic', 'true');
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `royal-toast ${type}`;

  const iconMap = {
    success: 'fa-circle-check',
    error: 'fa-triangle-exclamation',
    info: 'fa-circle-info',
    warning: 'fa-triangle-exclamation'
  };
  const icon = iconMap[type] || 'fa-circle-info';
  toast.innerHTML = `<i class="fa-solid ${icon}"></i> <span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  // Trigger animation: add 'visible' after a micro-delay
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.classList.add('visible');
    });
  });

  // Auto-dismiss after 4s
  setTimeout(() => {
    toast.classList.add('hide');
    toast.classList.remove('visible');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

window.showToast = showToast;

const DEFAULT_FOOD_IMG = 'images/menu/default-food.webp';

/* ==========================================================================
   1. Inject Config Details into DOM elements
   ========================================================================== */
function renderBrandAndConfig() {
  const config = window.RESTAURANT_CONFIG;
  if (!config) return;

  document.querySelectorAll('[data-bind="name"]').forEach(el => {
    el.textContent = config.name;
  });
  document.querySelectorAll('[data-bind="shortName"]').forEach(el => {
    el.textContent = config.shortName;
  });
  document.querySelectorAll('[data-bind="phone"]').forEach(el => {
    el.textContent = config.displayPhone;
  });
  document.querySelectorAll('[data-bind="hours"]').forEach(el => {
    el.textContent = config.openingHours?.display || '11:30 AM – 11:00 PM (Monday – Sunday)';
  });
  document.querySelectorAll('[data-bind="address"]').forEach(el => {
    el.textContent = config.fullAddress;
  });

  // WhatsApp links
  const waText = encodeURIComponent("Hello Kings Biryani's! I would like to inquire about your menu and place an order.");
  document.querySelectorAll('a[data-bind-link="whatsapp"]').forEach(a => {
    a.href = `https://wa.me/${config.whatsappNumber}?text=${waText}`;
  });

  document.querySelectorAll('a[data-bind-link="phone"]').forEach(a => {
    a.href = `tel:+${config.whatsappNumber}`;
  });

  document.querySelectorAll('a[data-bind-link="maps"]').forEach(a => {
    a.href = config.googleMapsUrl || 'https://maps.app.goo.gl/UXG6T495wVCukNiG6';
  });
}

/* ==========================================================================
   2. Render Signature / Featured Dishes
   ========================================================================== */
function renderSignatureDishes() {
  const container = document.getElementById('signature-dishes-grid');
  if (!container || !window.MENU_ITEMS) return;

  const signatures = window.MENU_ITEMS.filter(item => item.isSignature);
  if (signatures.length === 0) return;

  const config = window.RESTAURANT_CONFIG || {};
  const wa = config.whatsappNumber || '919391461106';

  container.innerHTML = signatures.map(item => {
    const waMsg = encodeURIComponent(`Hello Kings Biryani! I would like to order ${item.name} (₹${item.price}).`);
    return `
      <div class="dish-card signature-dish-card" data-id="${escapeHTML(item.id)}" data-category="${escapeHTML(item.category)}">
        <div class="dish-img-wrap">
          <img
            src="${escapeHTML(item.image)}"
            alt="${escapeHTML(item.name)} – Kings Biryani Tuni"
            class="dish-img"
            loading="lazy"
            width="400"
            height="300"
            onerror="this.onerror=null;this.src='${DEFAULT_FOOD_IMG}'"
          >
          <div class="dish-tags">
            ${item.badge ? `<span class="badge-tag royal-gold"><i class="fa-solid fa-crown"></i> ${escapeHTML(item.badge)}</span>` : ''}
            <span class="diet-indicator ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}" aria-label="${item.isVeg ? 'Vegetarian dish' : 'Non-Vegetarian dish'}">
              <span class="dot"></span>
            </span>
          </div>
        </div>
        <div class="dish-content">
          <div class="dish-header">
            <h3 class="dish-title">${escapeHTML(item.name)}</h3>
            <div class="dish-price">₹${item.price}</div>
          </div>
          <p class="dish-desc">${escapeHTML(item.description)}</p>
          <div class="dish-footer">
            <div class="dish-meta">
              ${item.serves ? `<span class="meta-item"><i class="fa-solid fa-user-group"></i> ${escapeHTML(item.serves)}</span>` : ''}
              ${item.spicyLevel ? `<span class="meta-item spice"><i class="fa-solid fa-pepper-hot"></i> ${'🌶'.repeat(item.spicyLevel)}</span>` : ''}
            </div>
            <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap">
              <div class="card-cart-btn-wrap">
                <button type="button" class="btn-card-add btn-add-cart" data-item-id="${escapeHTML(item.id)}" aria-label="Add ${escapeHTML(item.name)} to cart">
                  <i class="fa-solid fa-plus"></i> Add
                </button>
              </div>
              <a href="https://wa.me/${wa}?text=${waMsg}" target="_blank" rel="noopener noreferrer" class="btn-card-action menu-card-order-btn" aria-label="Order ${escapeHTML(item.name)} on WhatsApp">
                <i class="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  if (window.kingsCart) window.kingsCart.syncMenuButtons();
}

/* ==========================================================================
   3. Render Menu Categories Tabs and Dietary Filters
   ========================================================================== */
let currentMenuCategory = 'biryani'; // Default category
let currentDietFilter = 'all';       // 'all' | 'veg' | 'non-veg'
let currentSearchQuery = '';

function getCategoryItemCount(catId) {
  if (!window.MENU_ITEMS) return 0;
  return window.MENU_ITEMS.filter(item => {
    // Check dietary filter match
    if (currentDietFilter === 'veg' && !item.isVeg) return false;
    if (currentDietFilter === 'non-veg' && item.isVeg) return false;
    if (catId !== 'all' && item.category !== catId) return false;
    return true;
  }).length;
}

function updateActiveCategoryHeader(totalShowing = 0) {
  const badgeContainer = document.getElementById('active-category-badge');
  const countContainer = document.getElementById('menu-item-count');
  if (!badgeContainer) return;

  const activeCat = window.MENU_CATEGORIES?.find(c => c.id === currentMenuCategory);
  const catName = currentMenuCategory === 'all'
    ? 'All Categories'
    : (activeCat ? activeCat.name : 'All Dishes');
  const catIcon = currentMenuCategory === 'all'
    ? 'utensils'
    : (activeCat?.icon || 'bowl-food');

  const dietLabels = {
    'all': 'All Dishes',
    'veg': 'Pure Veg Only',
    'non-veg': 'Non-Veg Only'
  };

  const query = (currentSearchQuery || '').trim();

  let html = `
    <span class="diet-pill-tag ${currentDietFilter === 'veg' ? 'veg' : (currentDietFilter === 'non-veg' ? 'non-veg' : 'all-diet')}">
      <span class="dot"></span>
      ${escapeHTML(dietLabels[currentDietFilter] || 'All Dishes')}
    </span>
    <span class="category-name-text">
      <i class="fa-solid fa-${escapeHTML(catIcon)}"></i>
      ${escapeHTML(catName)}
    </span>
  `;

  if (query) {
    html += `
      <span class="search-tag-badge">
        <i class="fa-solid fa-magnifying-glass"></i> "${escapeHTML(query)}"
      </span>
    `;
  }

  badgeContainer.innerHTML = html;

  if (countContainer) {
    countContainer.innerHTML = `<span><strong>${totalShowing}</strong> ${totalShowing === 1 ? 'dish' : 'dishes'} available</span>`;
  }
}

function renderMenuCategories() {
  const container = document.getElementById('menu-category-tabs');
  if (!container) return;

  const categories = window.MENU_CATEGORIES || [];

  // Build tabs array: "All Categories" + 10 specific categories
  const allTabs = [
    { id: 'all', name: 'All Categories', icon: 'utensils' },
    ...categories
  ];

  container.innerHTML = allTabs.map(cat => {
    const isActive = (cat.id === currentMenuCategory);
    const count = getCategoryItemCount(cat.id);
    return `
      <button
        type="button"
        class="category-pill ${isActive ? 'active' : ''}"
        data-category-id="${escapeHTML(cat.id)}"
        role="tab"
        aria-selected="${isActive ? 'true' : 'false'}"
        aria-label="${escapeHTML(cat.name)} (${count} dishes)"
      >
        <i class="fa-solid fa-${escapeHTML(cat.icon || 'bowl-food')}"></i>
        <span>${escapeHTML(cat.name)}</span>
        <span class="category-count-badge">${count}</span>
      </button>
    `;
  }).join('');
}

/* ==========================================================================
   4. Filter and Render Menu Items
   ========================================================================== */
function getFilteredMenuItems() {
  if (!window.MENU_ITEMS) return [];
  const query = (currentSearchQuery || '').toLowerCase().trim();

  return window.MENU_ITEMS.filter(item => {
    // 1. Dietary filter
    if (currentDietFilter === 'veg' && !item.isVeg) return false;
    if (currentDietFilter === 'non-veg' && item.isVeg) return false;

    // 2. Category filter
    if (currentMenuCategory !== 'all' && item.category !== currentMenuCategory) {
      return false;
    }

    // 3. Search query filter
    if (query) {
      const nameMatch = item.name && item.name.toLowerCase().includes(query);
      const descMatch = item.description && item.description.toLowerCase().includes(query);
      const catMatch = item.category && item.category.toLowerCase().includes(query);
      const badgeMatch = item.badge && item.badge.toLowerCase().includes(query);
      return nameMatch || descMatch || catMatch || badgeMatch;
    }

    return true;
  });
}

function renderMenuItems(catId = null) {
  if (catId) currentMenuCategory = catId;

  const container = document.getElementById('menu-items-grid');
  const emptyNotice = document.getElementById('menu-empty-notice');
  if (!container || !window.MENU_ITEMS) return;

  const filtered = getFilteredMenuItems();

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyNotice) emptyNotice.classList.remove('hidden');
    updateActiveCategoryHeader(0);
    return;
  }

  if (emptyNotice) emptyNotice.classList.add('hidden');
  updateActiveCategoryHeader(filtered.length);

  const config = window.RESTAURANT_CONFIG || {};
  const wa = config.whatsappNumber || '919391461106';

  container.innerHTML = filtered.map(item => {
    const hasHalf = !!item.halfPrice;
    const defaultWaMsg = hasHalf
      ? `Hello Kings Biryani! I would like to order ${item.name} (Full - ₹${item.price}).`
      : `Hello Kings Biryani! I would like to order ${item.name} (₹${item.price}).`;

    return `
      <div class="menu-card" data-id="${escapeHTML(item.id)}" data-category="${escapeHTML(item.category)}" data-veg="${item.isVeg ? 'true' : 'false'}">
        <div class="menu-card-img-wrap">
          <img
            src="${escapeHTML(item.image)}"
            alt="${escapeHTML(item.name)} – ${item.isVeg ? 'Pure Veg' : 'Non-Veg'} dish at Kings Biryani Tuni"
            loading="lazy"
            class="menu-card-img"
            width="400"
            height="300"
            onerror="this.onerror=null;this.src='${DEFAULT_FOOD_IMG}'"
          >
          <div class="diet-indicator-badge ${item.isVeg ? 'veg' : 'non-veg'}" title="${item.isVeg ? 'Pure Veg' : 'Non-Veg'}" aria-label="${item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}">
            <span class="dot"></span>
          </div>
          ${item.badge ? `<span class="menu-item-badge">${escapeHTML(item.badge)}</span>` : ''}
        </div>
        <div class="menu-card-body">
          <div class="menu-card-header">
            <h4 class="menu-card-title">${escapeHTML(item.name)}</h4>
            <div class="menu-card-price" id="card-price-${escapeHTML(item.id)}">₹${item.price}</div>
          </div>

          ${hasHalf ? `
            <div class="portion-selector-bar" role="group" aria-label="Portion size for ${escapeHTML(item.name)}">
              <button type="button" class="portion-choice-btn active" data-item-id="${escapeHTML(item.id)}" data-portion="full" data-price="${item.price}" onclick="handlePortionChange('${escapeHTML(item.id)}', 'full', ${item.price})">
                Full (₹${item.price})
              </button>
              <button type="button" class="portion-choice-btn" data-item-id="${escapeHTML(item.id)}" data-portion="half" data-price="${item.halfPrice}" onclick="handlePortionChange('${escapeHTML(item.id)}', 'half', ${item.halfPrice})">
                Half (₹${item.halfPrice})
              </button>
            </div>
          ` : ''}

          <p class="menu-card-desc">${escapeHTML(item.description)}</p>

          <div class="menu-card-footer">
            <div class="menu-card-meta">
              <span class="diet-pill-tag ${item.isVeg ? 'veg' : 'non-veg'}" style="font-size:0.7rem;padding:0.15rem 0.5rem">
                <span class="dot" style="width:5px;height:5px"></span>
                ${item.isVeg ? 'Pure Veg' : 'Non-Veg'}
              </span>
              ${item.serves ? `<span><i class="fa-solid fa-users"></i> ${escapeHTML(item.serves)}</span>` : ''}
              ${item.spicyLevel > 0 ? `<span><i class="fa-solid fa-pepper-hot"></i> ${'🌶'.repeat(item.spicyLevel)}</span>` : ''}
            </div>
            <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap">
              <div class="card-cart-btn-wrap">
                <button
                  type="button"
                  class="btn-card-add btn-add-cart"
                  data-item-id="${escapeHTML(item.id)}"
                  aria-label="Add ${escapeHTML(item.name)} to cart"
                >
                  <i class="fa-solid fa-plus"></i> Add
                </button>
              </div>
              <a
                href="https://wa.me/${wa}?text=${encodeURIComponent(defaultWaMsg)}"
                target="_blank"
                rel="noopener noreferrer"
                class="btn-card-action menu-card-order-btn"
                id="order-link-${escapeHTML(item.id)}"
                data-name="${escapeHTML(item.name)}"
                data-price="${item.price}"
                data-half-price="${item.halfPrice || ''}"
                aria-label="Order ${escapeHTML(item.name)} on WhatsApp"
              >
                <i class="fa-brands fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // After rendering, sync cart button states and quantity steppers
  if (window.kingsCart) window.kingsCart.syncMenuButtons();
}

/* ==========================================================================
   4b. Portion Change Helper
   ========================================================================== */
window.handlePortionChange = function(itemId, portion, price) {
  const card = document.querySelector(`.menu-card[data-id="${itemId}"]`);
  if (!card) return;

  card.querySelectorAll('.portion-choice-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-portion') === portion);
  });

  const priceEl = document.getElementById(`card-price-${itemId}`);
  if (priceEl) priceEl.textContent = `₹${price}`;

  const orderLink = document.getElementById(`order-link-${itemId}`);
  if (orderLink) {
    const itemName = orderLink.getAttribute('data-name') || 'food';
    const portionLabel = portion === 'half' ? 'Half' : 'Full';
    const config = window.RESTAURANT_CONFIG || {};
    const phone = config.whatsappNumber || '919391461106';
    const msg = `Hello Kings Biryani! I would like to order ${itemName} (${portionLabel} - ₹${price}).`;
    orderLink.href = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  }

  // Sync quantity stepper for the selected portion
  if (window.kingsCart) window.kingsCart.syncMenuButtons();
};

/* ==========================================================================
   5. Setup "Add to Cart" Buttons on Menu Cards
   ========================================================================== */
function setupMenuAddToCart() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-add-cart');
    if (!btn) return;

    const itemId = btn.getAttribute('data-item-id');
    if (!itemId || !window.MENU_ITEMS) return;

    const menuItem = window.MENU_ITEMS.find(m => m.id === itemId);
    if (!menuItem) return;

    // Determine selected portion
    const card = btn.closest('.menu-card, .dish-card, .signature-dish-card');
    let price = menuItem.price;
    let portion = null;

    if (card) {
      const activePortion = card.querySelector('.portion-choice-btn.active');
      if (activePortion) {
        portion = activePortion.getAttribute('data-portion');
        price = parseFloat(activePortion.getAttribute('data-price')) || menuItem.price;
      }
    }

    if (window.kingsCart) {
      window.kingsCart.addItem({
        id: menuItem.id,
        name: menuItem.name,
        price: price,
        portion: portion,
        isVeg: menuItem.isVeg
      });
    }
  });
}

/* ==========================================================================
   6. Setup Menu Search, Category Clicking, and Dietary Filters
   ========================================================================== */
function setupMenuFiltersAndSearch() {
  // Dietary Filter Buttons (All / Pure Veg / Non-Veg)
  const dietButtons = document.querySelectorAll('.diet-filter-btn');
  dietButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const diet = btn.getAttribute('data-diet');
      if (!diet || diet === currentDietFilter) return;

      currentDietFilter = diet;
      dietButtons.forEach(b => {
        const isActive = (b.getAttribute('data-diet') === currentDietFilter);
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-checked', isActive ? 'true' : 'false');
      });

      renderMenuCategories();
      renderMenuItems(currentMenuCategory);
    });
  });

  // Category Navigation Tabs (delegated on container)
  const catTabsContainer = document.getElementById('menu-category-tabs');
  if (catTabsContainer) {
    catTabsContainer.addEventListener('click', (e) => {
      const pill = e.target.closest('.category-pill');
      if (!pill) return;

      const catId = pill.getAttribute('data-category-id');
      if (!catId) return;

      currentMenuCategory = catId;
      catTabsContainer.querySelectorAll('.category-pill').forEach(b => {
        const isActive = (b.getAttribute('data-category-id') === currentMenuCategory);
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      renderMenuItems(currentMenuCategory);
    });
  }

  // Search Input with real-time filtering
  const searchInput = document.getElementById('menu-search-input');
  const clearBtn = document.getElementById('menu-search-clear');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value;
      if (clearBtn) {
        clearBtn.style.display = currentSearchQuery.length > 0 ? 'block' : 'none';
      }
      renderMenuItems(currentMenuCategory);
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (searchInput) {
        searchInput.value = '';
        currentSearchQuery = '';
        clearBtn.style.display = 'none';
        searchInput.focus();
        renderMenuItems(currentMenuCategory);
      }
    });
  }

  // Reset Filters Button in Empty Notice State
  const resetBtn = document.getElementById('btn-reset-filters');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      currentSearchQuery = '';
      currentDietFilter = 'all';
      currentMenuCategory = 'biryani';

      if (searchInput) {
        searchInput.value = '';
        if (clearBtn) clearBtn.style.display = 'none';
      }

      dietButtons.forEach(b => {
        const isActive = (b.getAttribute('data-diet') === 'all');
        b.classList.toggle('active', isActive);
        b.setAttribute('aria-checked', isActive ? 'true' : 'false');
      });

      renderMenuCategories();
      renderMenuItems(currentMenuCategory);
    });
  }
}

/* ==========================================================================
   7. Accessible Photo Gallery with Keyboard & Lightbox Navigation
   ========================================================================== */
let currentGalleryItems = [];
let currentLightboxIndex = 0;
let lastActiveElementBeforeLightbox = null;

function renderGallery(cat = 'all') {
  const container = document.getElementById('gallery-grid');
  if (!container || !window.GALLERY_ITEMS) return;

  currentGalleryItems = (cat === 'all')
    ? window.GALLERY_ITEMS
    : window.GALLERY_ITEMS.filter(g => g.category === cat);

  if (currentGalleryItems.length === 0) {
    container.innerHTML = `
      <div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--text-muted)">
        <i class="fa-solid fa-images" style="font-size:2rem;margin-bottom:1rem;display:block;opacity:0.5"></i>
        <p>No photos in this category.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = currentGalleryItems.map((item, index) => `
    <div
      class="gallery-item"
      data-category="${escapeHTML(item.category)}"
      data-index="${index}"
      tabindex="0"
      role="button"
      aria-label="View enlarged photo: ${escapeHTML(item.title)}"
    >
      <img
        src="${escapeHTML(item.image)}"
        alt="${escapeHTML(item.title)} – ${escapeHTML(item.desc)}"
        loading="lazy"
        class="gallery-img"
        width="400"
        height="240"
        onerror="this.src='${DEFAULT_FOOD_IMG}'"
      >
      <div class="gallery-overlay" aria-hidden="true">
        <div class="gallery-zoom-icon"><i class="fa-solid fa-expand"></i></div>
        <div class="gallery-info">
          <h4>${escapeHTML(item.title)}</h4>
          <p>${escapeHTML(item.desc)}</p>
        </div>
      </div>
    </div>
  `).join('');

  // Attach event listeners
  container.querySelectorAll('.gallery-item').forEach(itemEl => {
    const idx = parseInt(itemEl.getAttribute('data-index'), 10);
    itemEl.addEventListener('click', () => openGalleryIndex(idx, itemEl));
    itemEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGalleryIndex(idx, itemEl);
      }
    });
  });
}

function setupGalleryFilters() {
  const filterBtns = document.querySelectorAll('.gallery-filter-pill');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-gallery-cat');
      renderGallery(cat);
    });
  });
}

function setupLightbox() {
  const modal = document.getElementById('lightbox-modal');
  const closeBtn = document.getElementById('lightbox-close');
  const backdrop = document.getElementById('lightbox-backdrop');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (backdrop) backdrop.addEventListener('click', closeLightbox);
  if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(-1); });
  if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); navigateLightbox(1); });

  document.addEventListener('keydown', (e) => {
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowLeft') navigateLightbox(-1);
    else if (e.key === 'ArrowRight') navigateLightbox(1);
  });
}

function openGalleryIndex(index, triggerElement) {
  if (!currentGalleryItems || currentGalleryItems.length === 0) return;
  if (index < 0) index = currentGalleryItems.length - 1;
  if (index >= currentGalleryItems.length) index = 0;

  currentLightboxIndex = index;
  lastActiveElementBeforeLightbox = triggerElement || document.activeElement;

  const item = currentGalleryItems[currentLightboxIndex];
  openLightbox(item.image, item.title, item.desc);
}

function navigateLightbox(direction) {
  if (!currentGalleryItems || currentGalleryItems.length === 0) return;
  let newIndex = currentLightboxIndex + direction;
  if (newIndex < 0) newIndex = currentGalleryItems.length - 1;
  if (newIndex >= currentGalleryItems.length) newIndex = 0;

  currentLightboxIndex = newIndex;
  const item = currentGalleryItems[currentLightboxIndex];
  updateLightboxContent(item.image, item.title, item.desc);
}

function updateLightboxContent(src, title, desc) {
  const img = document.getElementById('lightbox-img');
  const titleEl = document.getElementById('lightbox-title');
  const descEl = document.getElementById('lightbox-desc');

  if (img) {
    img.src = '';  // Reset to trigger load event
    img.alt = `${title} – ${desc}`;
    img.src = src;
    img.onerror = () => { img.src = DEFAULT_FOOD_IMG; };
  }
  if (titleEl) titleEl.textContent = title;
  if (descEl) descEl.textContent = desc;
}

function openLightbox(src, title, desc) {
  const modal = document.getElementById('lightbox-modal');
  if (!modal) return;

  updateLightboxContent(src, title, desc);
  modal.classList.add('active');
  modal.setAttribute('aria-hidden', 'false');
  document.body.classList.add('modal-open');

  const closeBtn = document.getElementById('lightbox-close');
  if (closeBtn) closeBtn.focus();
}

function closeLightbox() {
  const modal = document.getElementById('lightbox-modal');
  if (modal) {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');

    if (lastActiveElementBeforeLightbox && typeof lastActiveElementBeforeLightbox.focus === 'function') {
      lastActiveElementBeforeLightbox.focus();
    }
  }
}

window.openLightbox = openLightbox;
window.closeLightbox = closeLightbox;

/* ==========================================================================
   8. Secure Customer Reviews Rendering & Review Modal
   ========================================================================== */
function renderCustomerReviews() {
  const container = document.getElementById('reviews-carousel-track');
  if (!container) return;

  container.innerHTML = '';
  let reviews = [...(window.CUSTOMER_REVIEWS || [])];

  // Safely merge user-submitted reviews from localStorage (prepend so they appear first)
  try {
    const rawSaved = localStorage.getItem('kings_user_reviews');
    if (rawSaved) {
      const parsed = JSON.parse(rawSaved);
      if (Array.isArray(parsed)) {
        const validatedUserReviews = parsed.filter(r =>
          r && typeof r.name === 'string' &&
          typeof r.comment === 'string' &&
          typeof r.rating === 'number'
        );
        reviews = [...validatedUserReviews, ...reviews];
      }
    }
  } catch (e) {
    console.error('Failed to parse user reviews from storage', e);
  }

  // Empty state fallback
  if (!reviews.length) {
    const empty = document.createElement('div');
    empty.className = 'reviews-empty-state';
    empty.innerHTML = '<i class="fa-solid fa-star" aria-hidden="true"></i><p>No reviews yet. Be the first to share your experience!</p>';
    container.appendChild(empty);
    return;
  }

  // Safe DOM construction — XSS-immune, no innerHTML for user data
  reviews.forEach(rev => {
    const card = document.createElement('div');
    card.className = 'review-card';

    // ── Top row: avatar | name+location | badge ──
    const cardTop = document.createElement('div');
    cardTop.className = 'review-card-top';

    const avatar = document.createElement('div');
    avatar.className = 'reviewer-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    // Show first letter of reviewer's name
    const initials = (rev.name || '?').charAt(0).toUpperCase();
    avatar.style.fontFamily = 'var(--font-body)';
    avatar.style.fontWeight = '700';
    avatar.style.fontSize = '1.1rem';
    avatar.textContent = initials;

    const details = document.createElement('div');
    details.className = 'reviewer-details';

    const nameEl = document.createElement('h4');
    nameEl.className = 'reviewer-name';
    nameEl.textContent = rev.name;

    const locEl = document.createElement('span');
    locEl.className = 'reviewer-location';
    locEl.textContent = rev.location || 'Customer Review';

    details.appendChild(nameEl);
    details.appendChild(locEl);

    const badge = document.createElement('span');
    badge.className = 'review-badge';
    const badgeIcon = document.createElement('i');
    badgeIcon.className = 'fa-solid fa-circle-check';
    badgeIcon.setAttribute('aria-hidden', 'true');
    badge.appendChild(badgeIcon);
    badge.appendChild(document.createTextNode(' ' + (rev.badge || 'Customer')));

    cardTop.appendChild(avatar);
    cardTop.appendChild(details);
    cardTop.appendChild(badge);

    // ── Star rating ──
    const starsContainer = document.createElement('div');
    starsContainer.className = 'review-stars';
    starsContainer.setAttribute('aria-label', `Rating: ${rev.rating} out of 5 stars`);
    const ratingVal = Math.min(5, Math.max(1, rev.rating || 5));

    for (let i = 0; i < 5; i++) {
      const star = document.createElement('i');
      star.setAttribute('aria-hidden', 'true');
      if (i < Math.floor(ratingVal)) {
        // Filled star — must have BOTH fa-solid AND fa-star for CSS selector to match
        star.className = 'fa-solid fa-star';
      } else if (ratingVal - i >= 0.5) {
        // Half star
        star.className = 'fa-solid fa-star-half-stroke';
      } else {
        // Empty star — must have BOTH fa-regular AND fa-star
        star.className = 'fa-regular fa-star';
      }
      starsContainer.appendChild(star);
    }

    // ── Comment ──
    const comment = document.createElement('p');
    comment.className = 'review-comment';
    comment.textContent = '\u201C' + rev.comment + '\u201D';

    // ── Date footer ──
    const dateEl = document.createElement('div');
    dateEl.className = 'review-date';
    dateEl.textContent = rev.date || 'Recent visit';

    card.appendChild(cardTop);
    card.appendChild(starsContainer);
    card.appendChild(comment);
    card.appendChild(dateEl);

    container.appendChild(card);
  });
}

function setupReviewModal() {
  const openBtn = document.getElementById('open-add-review-btn');
  const modal = document.getElementById('add-review-modal');
  const closeBtn = document.getElementById('close-review-modal-btn');
  const form = document.getElementById('add-review-form');

  if (openBtn && modal) {
    openBtn.addEventListener('click', () => {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  }

  if (closeBtn && modal) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  if (modal) {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('review-input-name')?.value.trim();
      const rating = parseFloat(document.getElementById('review-input-rating')?.value || '5');
      const comment = document.getElementById('review-input-text')?.value.trim();

      if (!name || name.length < 2 || name.length > 50) {
        showToast('Please enter your full name (2 to 50 characters).', 'error');
        document.getElementById('review-input-name')?.focus();
        return;
      }

      if (isNaN(rating) || rating < 1 || rating > 5) {
        showToast('Please select a valid rating between 1 and 5 stars.', 'error');
        return;
      }

      if (!comment || comment.length < 10 || comment.length > 500) {
        showToast('Please share your comments (10 to 500 characters).', 'error');
        document.getElementById('review-input-text')?.focus();
        return;
      }

      const newReview = {
        id: 'user_' + Date.now(),
        name,
        location: 'Tuni Diner (Saved Locally)',
        rating,
        date: 'Just now',
        badge: 'Guest Review',
        comment
      };

      try {
        const stored = JSON.parse(localStorage.getItem('kings_user_reviews') || '[]');
        stored.unshift(newReview);
        if (stored.length > 10) stored.length = 10;
        localStorage.setItem('kings_user_reviews', JSON.stringify(stored));
      } catch (err) {
        console.error('Storage error', err);
      }

      renderCustomerReviews();
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
      form.reset();
      showToast('Thank you for your review! It has been saved locally.', 'success');
    });
  }
}

/* ==========================================================================
   9. Generic Modal Opener and Closer
   ========================================================================== */
function setupGenericModals() {
  document.querySelectorAll('[data-modal-open]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = btn.getAttribute('data-modal-open');
      const targetModal = document.getElementById(modalId);
      if (targetModal) {
        targetModal.classList.add('active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
      }
    });
  });

  document.querySelectorAll('[data-modal-close]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const modal = btn.closest('.modal-overlay');
      if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      }
    });
  });

  // Close modals clicking overlay backdrop
  document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      }
    });
  });
}

/* ==========================================================================
   10. Table Reservation / Catering Enquiry Form
   ========================================================================== */
function setupContactForm() {
  const form = document.getElementById('catering-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('enquiry-name')?.value.trim();
    const phone = document.getElementById('enquiry-phone')?.value.trim();
    const eventType = document.getElementById('enquiry-type')?.value;
    const guests = document.getElementById('enquiry-guests')?.value;
    const date = document.getElementById('enquiry-date')?.value.trim();
    const message = document.getElementById('enquiry-message')?.value.trim();

    // Name validation
    if (!name || name.length < 2 || name.length > 50) {
      showToast('Please enter your full name (at least 2 letters).', 'error');
      document.getElementById('enquiry-name')?.focus();
      return;
    }

    // Indian Mobile Number validation
    const digitsOnly = phone ? phone.replace(/\D/g, '') : '';
    const valid10Digits = digitsOnly.slice(-10);
    if (!phone || !/^[6-9]\d{9}$/.test(valid10Digits)) {
      showToast('Please enter a valid 10-digit Indian mobile number (starting with 6-9).', 'error');
      document.getElementById('enquiry-phone')?.focus();
      return;
    }

    // Preferred date validation
    if (!date || date.length < 3) {
      showToast('Please specify your preferred date and time.', 'error');
      document.getElementById('enquiry-date')?.focus();
      return;
    }

    const config = window.RESTAURANT_CONFIG || { whatsappNumber: '919391461106' };

    let msg = `*KINGS BIRYANI'S & FAMILY RESTAURANT - TUNI*\n\n`;
    msg += `*TABLE BOOKING & CATERING ENQUIRY*\n\n`;
    msg += `Customer Name: ${name}\n`;
    msg += `Phone Number: ${valid10Digits}\n`;
    msg += `Service Type: ${eventType}\n`;
    msg += `Number of Guests: ${guests}\n`;
    msg += `Preferred Date & Time: ${date}`;
    if (message) msg += `\nSpecial Instructions: ${message}`;

    const url = `https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent(msg)}`;

    const win = window.open(url, '_blank');
    if (!win || win.closed || typeof win.closed === 'undefined') {
      window.location.href = url;
    }

    showToast('Enquiry prepared for WhatsApp! Please press Send in WhatsApp to submit your enquiry.', 'success');
  });
}

/* ==========================================================================
   11. Mobile Navigation Drawer & Accessibility
   ========================================================================== */
function setupMobileNav() {
  const toggleBtn = document.getElementById('mobile-nav-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const closeBtn = document.getElementById('mobile-nav-close');
  const navLinks = document.querySelectorAll('.mobile-nav-link');

  if (toggleBtn && drawer) {
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-controls', 'mobile-nav-drawer');

    toggleBtn.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('open');
      if (isOpen) {
        closeNav();
      } else {
        drawer.classList.add('open');
        drawer.setAttribute('aria-hidden', 'false');
        document.body.classList.add('nav-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        if (closeBtn) closeBtn.focus();
      }
    });
  }

  function closeNav() {
    if (drawer) {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('nav-open');
      if (toggleBtn) {
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.focus();
      }
    }
  }

  if (closeBtn) closeBtn.addEventListener('click', closeNav);
  navLinks.forEach(link => link.addEventListener('click', closeNav));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
      closeNav();
    }
  });

  // Close nav when clicking backdrop area
  document.addEventListener('click', (e) => {
    if (drawer && drawer.classList.contains('open')) {
      if (!drawer.contains(e.target) && !toggleBtn?.contains(e.target)) {
        closeNav();
      }
    }
  });
}

/* ==========================================================================
   12. Sticky Navbar and Scroll Spy
   ========================================================================== */
function setupScrollSpy() {
  const header = document.getElementById('main-header');
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');

  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Only run scroll spy if links use hash anchors
    const hasHashLinks = Array.from(desktopLinks).some(link => link.getAttribute('href')?.startsWith('#'));
    if (!hasHashLinks) {
      lastScrollY = scrollY;
      return;
    }

    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    if (currentId) {
      desktopLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          link.classList.toggle('active', href === `#${currentId}`);
        }
      });
    }

    lastScrollY = scrollY;
  }, { passive: true });
}

/* ==========================================================================
   13. Restaurant Open/Closed Status Check (IST)
   ========================================================================== */
function setupHoursStatus() {
  const statusBadge = document.getElementById('live-open-status');
  if (!statusBadge) return;

  const config = window.RESTAURANT_CONFIG || {};
  const openMins = config.openingHours?.openMinutes || 690;   // 11:30 AM
  const closeMins = config.openingHours?.closeMinutes || 1380; // 11:00 PM

  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Kolkata',
      hour: 'numeric',
      minute: 'numeric',
      hour12: false
    });

    const parts = formatter.formatToParts(new Date());
    const hour = parseInt(parts.find(p => p.type === 'hour')?.value || '0', 10);
    const minute = parseInt(parts.find(p => p.type === 'minute')?.value || '0', 10);
    const totalMins = (hour * 60) + minute;

    const isOpen = (totalMins >= openMins && totalMins < closeMins);

    if (isOpen) {
      statusBadge.innerHTML = `<span class="live-dot online"></span> Open Now &nbsp;(11:30 AM – 11:00 PM)`;
      statusBadge.className = 'live-status-pill open';
    } else {
      statusBadge.innerHTML = `<span class="live-dot offline"></span> Currently Closed &nbsp;(Opens 11:30 AM)`;
      statusBadge.className = 'live-status-pill closed';
    }
  } catch (err) {
    console.error('Timezone check fallback', err);
    statusBadge.innerHTML = `<span class="live-dot online"></span> Open Daily: 11:30 AM – 11:00 PM`;
    statusBadge.className = 'live-status-pill open';
  }
}

/* ==========================================================================
   14. Hero Background Video Handling
   ========================================================================== */
function setupHeroVideo() {
  const video = document.querySelector('.hero-bg-video');
  if (!video) return;

  video.muted = true;
  video.playsInline = true;

  // Attempt autoplay (browsers may block this without mute)
  const playPromise = video.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      // Autoplay blocked — video stays as poster/still
    });
  }

  // Respect reduced motion preference
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    video.pause();
  }
}
