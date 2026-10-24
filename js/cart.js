/**
 * Kings Biryani's and Family Restaurant - Cart Module
 * =====================================================
 * Full localStorage-persisted shopping cart with:
 * - Add/remove/quantity control
 * - Subtotal + delivery charge calculation
 * - Customer details form
 * - WhatsApp order message generation with confirmation step
 * - Order summary before sending
 */

(function () {
  'use strict';

  const CART_STORAGE_KEY = 'kings_cart_items';
  const ORDER_TYPE_KEY = 'kings_order_type';
  const CONFIG = window.RESTAURANT_CONFIG || {};
  const WHATSAPP = CONFIG.whatsappNumber || '919391461106';
  const CURRENCY = CONFIG.currency || '₹';
  const DELIVERY_FEE = CONFIG.deliveryFee || 30;
  const FREE_DELIVERY_ABOVE = CONFIG.freeDeliveryAbove || 600;
  const PACKAGING = CONFIG.packagingCharge || 20;

  class KingsCart {
    constructor() {
      this.cart = [];
      this.orderType = 'delivery'; // Delivery only
      this.drawerOpen = false;
      this.loadCart();
      this.loadOrderType();
      this.init();
    }

    /* -----------------------------------------------------------------------
       STORAGE
    ----------------------------------------------------------------------- */
    loadCart() {
      try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        this.cart = Array.isArray(parsed) ? parsed : [];
        // Sanitize: only keep items with required fields
        this.cart = this.cart.filter(item =>
          item && typeof item.id === 'string' &&
          typeof item.name === 'string' &&
          typeof item.price === 'number' &&
          typeof item.qty === 'number' &&
          item.qty > 0
        );
      } catch (e) {
        console.warn('[Cart] Failed to load cart from storage', e);
        this.cart = [];
      }
    }

    saveCart() {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.cart));
      } catch (e) {
        console.warn('[Cart] Failed to save cart', e);
      }
    }

    loadOrderType() {
      this.orderType = 'delivery';
      try {
        localStorage.setItem(ORDER_TYPE_KEY, 'delivery');
      } catch (e) { /* ignore */ }
    }

    saveOrderType() {
      try {
        localStorage.setItem(ORDER_TYPE_KEY, 'delivery');
      } catch (e) { /* ignore */ }
    }

    /* -----------------------------------------------------------------------
       CART OPERATIONS
    ----------------------------------------------------------------------- */
    addItem(item) {
      if (!item || !item.id || !item.name || typeof item.price !== 'number') {
        console.warn('[Cart] Invalid item', item);
        return;
      }

      const key = item.portion ? `${item.id}_${item.portion}` : item.id;
      const existing = this.cart.find(c => c.cartKey === key);

      if (existing) {
        existing.qty = Math.min(existing.qty + 1, 20);
        this.showToast(`${item.name} quantity updated!`, 'success');
      } else {
        this.cart.push({
          cartKey: key,
          id: item.id,
          name: item.name,
          price: item.price,
          portion: item.portion || null,
          isVeg: !!item.isVeg,
          qty: 1
        });
        this.showToast(`${item.name} added to cart!`, 'success');
      }

      this.saveCart();
      this.updateUI();
      this.syncMenuButtons();
    }

    removeItem(cartKey) {
      this.cart = this.cart.filter(c => c.cartKey !== cartKey);
      this.saveCart();
      this.updateUI();
      this.syncMenuButtons();
    }

    updateQuantity(cartKey, newQty) {
      const item = this.cart.find(c => c.cartKey === cartKey);
      if (!item) return;

      const qty = parseInt(newQty, 10);
      if (isNaN(qty) || qty < 1) {
        this.removeItem(cartKey);
        return;
      }

      item.qty = Math.min(qty, 20);
      this.saveCart();
      this.updateUI();
    }

    clearCart() {
      this.cart = [];
      this.saveCart();
      this.updateUI();
      this.syncMenuButtons();
      this.showToast('Cart cleared.', 'info');
    }

    /* -----------------------------------------------------------------------
       CALCULATIONS
    ----------------------------------------------------------------------- */
    getSubtotal() {
      return this.cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    }

    getItemCount() {
      return this.cart.reduce((sum, item) => sum + item.qty, 0);
    }

    getPackaging() {
      return this.cart.length > 0 ? PACKAGING : 0;
    }

    getDeliveryFee() {
      const sub = this.getSubtotal();
      if (sub <= 0) return 0;
      return sub >= FREE_DELIVERY_ABOVE ? 0 : DELIVERY_FEE;
    }

    getTotal() {
      return this.getSubtotal() + this.getPackaging() + this.getDeliveryFee();
    }

    /* -----------------------------------------------------------------------
       UI UPDATE
    ----------------------------------------------------------------------- */
    updateUI() {
      this.updateCountBadges();
      if (this.drawerOpen) {
        this.renderCartItems();
        this.renderBill();
      }
    }

    updateCountBadges() {
      const count = this.getItemCount();
      document.querySelectorAll('.cart-count-badge, #cart-count').forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'inline-flex' : 'none';
      });

      // Update floating cart pill
      const floatingPill = document.getElementById('floating-cart-pill');
      if (floatingPill) {
        const countEl = floatingPill.querySelector('.floating-cart-count');
        if (countEl) countEl.textContent = count;
        floatingPill.style.display = count > 0 ? 'inline-flex' : 'none';
      }
    }

    renderCartItems() {
      const container = document.getElementById('cart-items-container');
      if (!container) return;

      if (this.cart.length === 0) {
        container.innerHTML = `
          <div class="cart-empty-state">
            <div class="cart-empty-icon">
              <i class="fa-solid fa-bag-shopping"></i>
            </div>
            <h4>Your cart is empty</h4>
            <p>Browse our menu and add your favourite biryani or starters to get started!</p>
            <a href="menu.html" class="btn-primary" style="margin-top:0.5rem">
              <i class="fa-solid fa-book-open"></i> Browse Menu
            </a>
          </div>
        `;
        return;
      }

      container.innerHTML = `
        <div class="cart-items-container">
          ${this.cart.map(item => `
            <div class="cart-item-row" data-cart-key="${this.escHTML(item.cartKey)}">
              <div class="cart-item-badge ${item.isVeg ? 'veg' : 'non-veg'}">
                <span class="dot"></span>
              </div>
              <div class="cart-item-info">
                <div class="cart-item-title">${this.escHTML(item.name)}</div>
                ${item.portion ? `<div class="cart-item-portion">${this.escHTML(item.portion)} portion</div>` : ''}
                <div class="cart-item-pricing">${CURRENCY}${item.price} × ${item.qty}</div>
              </div>
              <div class="cart-item-controls">
                <button type="button" class="qty-btn" data-action="dec" data-key="${this.escHTML(item.cartKey)}" aria-label="Decrease quantity">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="qty-count">${item.qty}</span>
                <button type="button" class="qty-btn" data-action="inc" data-key="${this.escHTML(item.cartKey)}" aria-label="Increase quantity">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>
              <div class="cart-item-total">${CURRENCY}${(item.price * item.qty).toFixed(0)}</div>
              <button type="button" class="cart-remove-btn" data-key="${this.escHTML(item.cartKey)}" aria-label="Remove ${this.escHTML(item.name)} from cart">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          `).join('')}
        </div>
      `;

      // Attach quantity and remove events
      container.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-key');
          const action = btn.getAttribute('data-action');
          const item = this.cart.find(c => c.cartKey === key);
          if (!item) return;
          if (action === 'inc') this.updateQuantity(key, item.qty + 1);
          else this.updateQuantity(key, item.qty - 1);
        });
      });

      container.querySelectorAll('.cart-remove-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const key = btn.getAttribute('data-key');
          this.removeItem(key);
        });
      });
    }

    renderBill() {
      const billEl = document.getElementById('cart-bill-breakdown');
      if (!billEl) return;

      const sub = this.getSubtotal();
      const pkg = this.getPackaging();
      const delivery = this.getDeliveryFee();
      const total = this.getTotal();

      let deliveryHtml = '';
      if (delivery === 0 && sub >= FREE_DELIVERY_ABOVE) {
        deliveryHtml = `
          <div class="bill-row">
            <span>Delivery (within Tuni)</span>
            <span class="free-tag">FREE</span>
          </div>
        `;
      } else {
        deliveryHtml = `
          <div class="bill-row">
            <span>Delivery (within Tuni)</span>
            <span>${CURRENCY}${delivery}</span>
          </div>
        `;
      }

      billEl.innerHTML = `
        <div class="bill-breakdown-card">
          <div class="bill-row">
            <span>Subtotal (${this.getItemCount()} items)</span>
            <span>${CURRENCY}${sub}</span>
          </div>
          <div class="bill-row">
            <span>Packaging</span>
            <span>${CURRENCY}${pkg}</span>
          </div>
          ${deliveryHtml}
          <div class="bill-row total-row">
            <span>Total</span>
            <span class="total-amount">${CURRENCY}${total}</span>
          </div>
        </div>
      `;
    }

    syncMenuButtons() {
      // Update "Add to Cart" and Quantity Stepper states based on current cart
      document.querySelectorAll('.menu-card[data-id], .signature-dish-card[data-id]').forEach(card => {
        const id = card.getAttribute('data-id');
        const btnWrap = card.querySelector('.card-cart-btn-wrap');
        if (!btnWrap) return;

        // Determine current portion if selector exists
        const activePortion = card.querySelector('.portion-choice-btn.active');
        const portion = activePortion ? activePortion.getAttribute('data-portion') : null;
        const key = portion ? `${id}_${portion}` : id;

        // Look for exact key match first, then fallback to item ID match if no portion
        const cartEntry = this.cart.find(c => c.cartKey === key) ||
                          (!portion ? this.cart.find(c => c.id === id) : null);

        if (cartEntry && cartEntry.qty > 0) {
          btnWrap.innerHTML = `
            <div class="card-qty-control" data-item-id="${this.escHTML(id)}" data-key="${this.escHTML(cartEntry.cartKey)}">
              <button type="button" class="card-qty-btn card-qty-dec" data-action="dec" data-key="${this.escHTML(cartEntry.cartKey)}" data-item-id="${this.escHTML(id)}" aria-label="Decrease quantity">
                <i class="fa-solid fa-minus"></i>
              </button>
              <span class="card-qty-count" aria-live="polite">${cartEntry.qty}</span>
              <button type="button" class="card-qty-btn card-qty-inc" data-action="inc" data-key="${this.escHTML(cartEntry.cartKey)}" data-item-id="${this.escHTML(id)}" aria-label="Increase quantity">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          `;
        } else {
          btnWrap.innerHTML = `
            <button
              type="button"
              class="btn-card-add btn-add-cart"
              data-item-id="${this.escHTML(id)}"
              aria-label="Add to cart"
            >
              <i class="fa-solid fa-plus"></i> Add
            </button>
          `;
        }
      });
    }

    /* -----------------------------------------------------------------------
       DRAWER OPEN / CLOSE
    ----------------------------------------------------------------------- */
    openDrawer() {
      const drawer = document.getElementById('cart-drawer');
      const backdrop = document.getElementById('cart-drawer-backdrop');
      if (!drawer) return;

      this.drawerOpen = true;
      drawer.classList.add('open');
      if (backdrop) backdrop.classList.add('open');
      document.body.classList.add('cart-open');

      this.renderCartItems();
      this.renderBill();

      const closeBtn = drawer.querySelector('.cart-close-btn');
      if (closeBtn) closeBtn.focus();
    }

    closeDrawer() {
      const drawer = document.getElementById('cart-drawer');
      const backdrop = document.getElementById('cart-drawer-backdrop');

      this.drawerOpen = false;
      if (drawer) drawer.classList.remove('open');
      if (backdrop) backdrop.classList.remove('open');
      document.body.classList.remove('cart-open');
    }

    /* -----------------------------------------------------------------------
       WHATSAPP ORDER
    ----------------------------------------------------------------------- */
    buildWhatsAppMessage(customerName, customerPhone, deliveryAddress, specialNotes) {
      const items = this.cart.map(item => {
        const portion = item.portion ? ` (${item.portion})` : '';
        const veg = item.isVeg ? '[VEG]' : '[NON-VEG]';
        return `• ${item.name}${portion} ${veg} × ${item.qty} = ${CURRENCY}${item.price * item.qty}`;
      }).join('\n');

      const sub = this.getSubtotal();
      const pkg = this.getPackaging();
      const delivery = this.getDeliveryFee();
      const total = this.getTotal();

      let msg = `*KINGS BIRYANI'S & FAMILY RESTAURANT, TUNI*\n`;
      msg += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━*\n`;
      msg += `*🛒 NEW ORDER — DELIVERY*\n\n`;
      msg += `*Order Items:*\n${items}\n\n`;
      msg += `*Order Summary:*\n`;
      msg += `  Subtotal: ${CURRENCY}${sub}\n`;
      msg += `  Packaging: ${CURRENCY}${pkg}\n`;
      msg += `  Delivery: ${delivery === 0 ? 'FREE' : CURRENCY + delivery}\n`;
      msg += `  *Total: ${CURRENCY}${total}*\n\n`;
      msg += `*Order Type:* 🚴 Delivery\n`;
      if (customerName) msg += `*Name:* ${customerName}\n`;
      if (customerPhone) msg += `*Phone:* ${customerPhone}\n`;
      if (deliveryAddress) {
        msg += `*Delivery Address:* ${deliveryAddress}\n`;
      }
      if (specialNotes) msg += `*Notes:* ${specialNotes}\n`;
      msg += `\n━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
      msg += `_Please confirm this order and estimated delivery time. Payment: Cash on delivery._`;

      return msg;
    }

    submitOrder() {
      if (this.cart.length === 0) {
        this.showToast('Your cart is empty. Please add items first.', 'error');
        return;
      }

      // Collect customer details
      const nameInput = document.getElementById('cart-customer-name');
      const phoneInput = document.getElementById('cart-customer-phone');
      const addressInput = document.getElementById('cart-delivery-address');
      const notesInput = document.getElementById('cart-special-notes');

      const name = nameInput ? nameInput.value.trim() : '';
      const phone = phoneInput ? phoneInput.value.trim() : '';
      const address = addressInput ? addressInput.value.trim() : '';
      const notes = notesInput ? notesInput.value.trim() : '';

      // Name validation
      if (!name || name.length < 2) {
        this.showToast('Please enter your name (at least 2 characters).', 'error');
        if (nameInput) nameInput.focus();
        return;
      }

      // Phone validation (Indian mobile)
      if (phone) {
        const digits = phone.replace(/\D/g, '').slice(-10);
        if (!/^[6-9]\d{9}$/.test(digits)) {
          this.showToast('Please enter a valid 10-digit Indian mobile number.', 'error');
          if (phoneInput) phoneInput.focus();
          return;
        }
      }

      // Delivery address required
      if (!address || address.length < 3) {
        this.showToast('Please enter your complete delivery address.', 'error');
        if (addressInput) addressInput.focus();
        return;
      }

      // Build message and open WhatsApp
      const msg = this.buildWhatsAppMessage(name, phone, address, notes);
      const url = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

      // Show confirmation dialog
      this.showOrderConfirmation(msg, url);
    }

    showOrderConfirmation(msg, waUrl) {
      // Create confirmation modal
      let confirmModal = document.getElementById('order-confirm-modal');
      if (!confirmModal) {
        confirmModal = document.createElement('div');
        confirmModal.id = 'order-confirm-modal';
        confirmModal.className = 'modal-overlay';
        confirmModal.setAttribute('role', 'dialog');
        confirmModal.setAttribute('aria-modal', 'true');
        confirmModal.setAttribute('aria-label', 'Order Confirmation');
        confirmModal.setAttribute('aria-hidden', 'true');
        document.body.appendChild(confirmModal);
      }

      const total = this.getTotal();
      confirmModal.innerHTML = `
        <div class="modal-card" style="max-width:520px">
          <button type="button" class="modal-close-icon" id="confirm-modal-close" aria-label="Close">
            <i class="fa-solid fa-xmark"></i>
          </button>
          <div style="text-align:center;margin-bottom:1.5rem">
            <i class="fa-brands fa-whatsapp" style="font-size:2.5rem;color:var(--whatsapp);margin-bottom:0.5rem;display:block"></i>
            <h3 style="font-family:var(--font-royal);color:var(--text-primary);font-size:1.4rem">Confirm Your Order</h3>
            <p style="color:var(--text-secondary);font-size:0.88rem;margin-top:0.5rem">Total: <strong style="color:var(--gold-primary);font-size:1.1rem">${CURRENCY}${total}</strong></p>
          </div>
          <div style="background:var(--bg-secondary);border:1px solid var(--brown-border);border-radius:var(--radius-md);padding:1rem;margin-bottom:1.25rem;font-size:0.8rem;color:var(--text-muted);line-height:1.6">
            <i class="fa-solid fa-circle-info" style="color:var(--gold-primary)"></i>
            <strong style="color:var(--text-secondary)"> Important:</strong> Clicking "Send Order" will open WhatsApp with your order details pre-filled.
            <strong>You must press Send in WhatsApp</strong> to complete the order. Your order is only confirmed when the restaurant replies with a confirmation message.
          </div>
          <div style="display:flex;gap:0.75rem;flex-wrap:wrap">
            <button type="button" id="confirm-modal-cancel" class="btn-outline-gold" style="flex:1;justify-content:center">
              <i class="fa-solid fa-arrow-left"></i> Go Back
            </button>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" id="confirm-modal-send" class="btn-whatsapp" style="flex:2;justify-content:center">
              <i class="fa-brands fa-whatsapp"></i> Send Order on WhatsApp
            </a>
          </div>
        </div>
      `;

      confirmModal.classList.add('active');
      confirmModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      const closeModal = () => {
        confirmModal.classList.remove('active');
        confirmModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
      };

      document.getElementById('confirm-modal-close').addEventListener('click', closeModal);
      document.getElementById('confirm-modal-cancel').addEventListener('click', closeModal);

      document.getElementById('confirm-modal-send').addEventListener('click', () => {
        closeModal();
        this.closeDrawer();
        // Clear cart after sending
        setTimeout(() => {
          this.clearCart();
          this.showToast('Order sent! Await confirmation from Kings Biryani on WhatsApp.', 'success');
        }, 500);
      });

      // Keyboard escape
      const escHandler = (e) => {
        if (e.key === 'Escape') {
          closeModal();
          document.removeEventListener('keydown', escHandler);
        }
      };
      document.addEventListener('keydown', escHandler);
    }

    /* -----------------------------------------------------------------------
       INIT — Setup Drawer UI and Event Listeners
    ----------------------------------------------------------------------- */
    init() {
      this.createDrawer();
      this.bindEvents();
      this.updateUI();
    }

    createDrawer() {
      // Only create if not already present
      if (document.getElementById('cart-drawer')) return;

      const backdrop = document.createElement('div');
      backdrop.id = 'cart-drawer-backdrop';
      backdrop.className = 'cart-drawer-backdrop';
      document.body.appendChild(backdrop);

      const drawer = document.createElement('div');
      drawer.id = 'cart-drawer';
      drawer.className = 'cart-drawer';
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-modal', 'true');
      drawer.setAttribute('aria-label', 'Shopping Cart');

      drawer.innerHTML = `
        <div class="cart-drawer-header">
          <div class="cart-header-title">
            <i class="fa-solid fa-bag-shopping"></i>
            <h3>Your Order</h3>
          </div>
          <button type="button" class="cart-close-btn" aria-label="Close cart">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>

        <div class="cart-drawer-body">
          <!-- Order type indicator (Delivery Only - full width) -->
          <div class="order-preference-toggle" role="region" aria-label="Order Type">
            <div class="preference-option">
              <div class="preference-label">
                <i class="fa-solid fa-motorcycle"></i> Delivery
              </div>
            </div>
          </div>

          <!-- Order notice -->
          <div class="order-notice-banner">
            <i class="fa-solid fa-circle-info"></i>
            <span>After reviewing your order, tap "Send Order" to open WhatsApp. You must send the message to complete your order. Orders are confirmed only after restaurant confirmation.</span>
          </div>

          <!-- Cart items (injected by renderCartItems) -->
          <div id="cart-items-container"></div>

          <!-- Bill breakdown (injected by renderBill) -->
          <div id="cart-bill-breakdown"></div>

          <!-- Customer details form -->
          <div class="cart-form-section" id="cart-customer-form">
            <h4><i class="fa-solid fa-user"></i> Your Details</h4>

            <div class="cart-input-field">
              <label for="cart-customer-name">Your Name *</label>
              <input type="text" id="cart-customer-name" placeholder="Full name" autocomplete="name" required>
            </div>

            <div class="cart-input-field">
              <label for="cart-customer-phone">Phone Number</label>
              <input type="tel" id="cart-customer-phone" placeholder="10-digit mobile number" autocomplete="tel" inputmode="numeric">
            </div>

            <div class="cart-input-field" id="delivery-address-field">
              <label for="cart-delivery-address">Delivery Address *</label>
              <textarea id="cart-delivery-address" rows="2" placeholder="House/flat number, street, landmark" required></textarea>
            </div>

            <div class="cart-input-field">
              <label for="cart-special-notes">Special Instructions</label>
              <textarea id="cart-special-notes" rows="2" placeholder="Extra spicy, less oil, no onions..."></textarea>
            </div>
          </div>
        </div>

        <div class="cart-drawer-footer">
          <button type="button" id="cart-submit-order" class="btn-whatsapp-submit">
            <i class="fa-brands fa-whatsapp"></i> Review & Send Order on WhatsApp
          </button>
          <button type="button" id="cart-clear-btn" class="cart-clear-btn">
            <i class="fa-solid fa-trash"></i> Clear Cart
          </button>
          <p class="secure-order-note">
            <i class="fa-brands fa-whatsapp"></i>
            Order confirmed only after restaurant replies on WhatsApp
          </p>
        </div>
      `;

      document.body.appendChild(drawer);
    }

    bindEvents() {
      // Backdrop close
      document.addEventListener('click', (e) => {
        const backdrop = document.getElementById('cart-drawer-backdrop');
        if (e.target === backdrop) this.closeDrawer();
      });

      // Escape key
      document.addEventListener('keydown', (e) => {
        const drawer = document.getElementById('cart-drawer');
        if (e.key === 'Escape' && drawer && drawer.classList.contains('open')) {
          this.closeDrawer();
        }
      });

      // Cart close button (delegated)
      document.addEventListener('click', (e) => {
        if (e.target.closest('.cart-close-btn')) this.closeDrawer();
      });

      // Submit order
      document.addEventListener('click', (e) => {
        if (e.target.closest('#cart-submit-order')) this.submitOrder();
      });

      // Clear cart
      document.addEventListener('click', (e) => {
        if (e.target.closest('#cart-clear-btn')) {
          if (confirm('Are you sure you want to clear your cart?')) {
            this.clearCart();
          }
        }
      });

      // Cart header button / floating cart pill
      document.addEventListener('click', (e) => {
        if (e.target.closest('.cart-header-btn') || e.target.closest('#floating-cart-pill')) {
          this.openDrawer();
        }
      });

      // Card Quantity Stepper Buttons (+ / - on dish cards)
      document.addEventListener('click', (e) => {
        const qtyBtn = e.target.closest('.card-qty-btn');
        if (!qtyBtn) return;

        const key = qtyBtn.getAttribute('data-key');
        const action = qtyBtn.getAttribute('data-action');
        const itemId = qtyBtn.getAttribute('data-item-id');

        let cartEntry = null;
        if (key) {
          cartEntry = this.cart.find(c => c.cartKey === key);
        }
        if (!cartEntry && itemId) {
          cartEntry = this.cart.find(c => c.id === itemId);
        }
        if (!cartEntry) return;

        if (action === 'inc') {
          this.updateQuantity(cartEntry.cartKey, cartEntry.qty + 1);
        } else if (action === 'dec') {
          this.updateQuantity(cartEntry.cartKey, cartEntry.qty - 1);
        }
      });
    }

    /* -----------------------------------------------------------------------
       UTILITY
    ----------------------------------------------------------------------- */
    escHTML(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }

    showToast(message, type = 'info') {
      if (typeof window.showToast === 'function') {
        window.showToast(message, type);
      }
    }
  }

  // Initialize on DOMContentLoaded
  function initCart() {
    window.kingsCart = new KingsCart();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCart);
  } else {
    initCart();
  }

})();
