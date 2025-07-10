// Globale JavaScript voor Musicado Theme - Alleen Nederlands
class ShopifyGlobal {
  constructor() {
    this.init();
  }

  init() {
    this.setupAccessibility();
    this.setupFormHelpers();
    this.setupErrorHandling();
  }

  setupAccessibility() {
    // Ga naar inhoud functionaliteit
    const skipLink = document.querySelector('.skip-to-content-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = skipLink.getAttribute('href');
        const target = document.querySelector(targetId);
        if (target) {
          target.focus();
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    // Toetsenbord navigatie voor aangepaste elementen
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        const target = e.target;
        if (target.hasAttribute('data-clickable')) {
          e.preventDefault();
          target.click();
        }
      }
    });
  }

  setupFormHelpers() {
    // Generieke formulier validatie helpers
    document.addEventListener('invalid', (e) => {
      e.target.classList.add('form-field-error');
    }, true);

    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('form-field-error')) {
        e.target.classList.remove('form-field-error');
      }
    });

    // Shopify winkelwagen formulier helpers
    const cartForms = document.querySelectorAll('form[action*="/cart"]');
    cartForms.forEach(form => {
      form.addEventListener('submit', this.handleCartSubmit.bind(this));
    });
  }

  async handleCartSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(window.routes.cart_add_url, {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const result = await response.json();
        this.showCartSuccess(result);
      } else {
        throw new Error('Mislukt om toe te voegen aan winkelwagen');
      }
    } catch (error) {
      this.showCartError(error.message);
    }
  }

  showCartSuccess(result) {
    // Toon succes melding
    this.showNotification('Product toegevoegd aan winkelwagen!', 'success');
    // Optioneel omleiding naar winkelwagen of update winkelwagen UI
    if (window.cartStrings) {
      // Update winkelwagen aantal als winkelwagen drawer bestaat
      this.updateCartCount();
    }
  }

  showCartError(message) {
    this.showNotification(message || 'Fout bij toevoegen aan winkelwagen', 'error');
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      z-index: 10000;
      animation: slideInRight 0.3s ease-out;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 4000);
  }

  async updateCartCount() {
    try {
      const response = await fetch('/cart.js');
      const cart = await response.json();
      
      // Update winkelwagen aantal elementen
      const cartCountElements = document.querySelectorAll('.cart-count');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
    } catch (error) {
      console.error('Mislukt om winkelwagen aantal bij te werken:', error);
    }
  }

  setupErrorHandling() {
    // Globale fout handler voor ongevangen fouten
    window.addEventListener('error', (e) => {
      console.error('Globale fout:', e.error);
      // Zou kunnen verzenden naar fout tracking service
    });

    // Behandel promise afwijzingen
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Onbehandelde promise afwijzing:', e.reason);
      e.preventDefault();
    });
  }

  // Hulp functies
  static debounce(func, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), delay);
    };
  }

  static throttle(func, delay) {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= delay) {
        lastCall = now;
        func.apply(null, args);
      }
    };
  }

  static formatMoney(cents, format = '€{{amount}}') {
    const value = (cents / 100).toFixed(2);
    return format.replace('{{amount}}', value);
  }
}

// Initialiseer wanneer DOM klaar is
document.addEventListener('DOMContentLoaded', () => {
  window.ShopifyGlobal = new ShopifyGlobal();
});

// Export voor gebruik in andere scripts
window.ShopifyUtils = {
  debounce: ShopifyGlobal.debounce,
  throttle: ShopifyGlobal.throttle,
  formatMoney: ShopifyGlobal.formatMoney
};
