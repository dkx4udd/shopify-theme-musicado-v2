// Global JavaScript for Musicado Theme
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
    // Skip to content functionality
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

    // Keyboard navigation for custom elements
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
    // Generic form validation helpers
    document.addEventListener('invalid', (e) => {
      e.target.classList.add('form-field-error');
    }, true);

    document.addEventListener('input', (e) => {
      if (e.target.classList.contains('form-field-error')) {
        e.target.classList.remove('form-field-error');
      }
    });

    // Shopify cart form helpers
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
        throw new Error('Failed to add to cart');
      }
    } catch (error) {
      this.showCartError(error.message);
    }
  }

  showCartSuccess(result) {
    // Show success notification
    this.showNotification('Product added to cart!', 'success');
    // Optionally redirect to cart or update cart UI
    if (window.cartStrings) {
      // Update cart count if cart drawer exists
      this.updateCartCount();
    }
  }

  showCartError(message) {
    this.showNotification(message || 'Error adding to cart', 'error');
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
      
      // Update cart count elements
      const cartCountElements = document.querySelectorAll('.cart-count');
      cartCountElements.forEach(element => {
        element.textContent = cart.item_count;
      });
    } catch (error) {
      console.error('Failed to update cart count:', error);
    }
  }

  setupErrorHandling() {
    // Global error handler for uncaught errors
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
      // Could send to error tracking service
    });

    // Handle promise rejections
    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
      e.preventDefault();
    });
  }

  // Utility functions
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

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  window.ShopifyGlobal = new ShopifyGlobal();
});

// Export for use in other scripts
window.ShopifyUtils = {
  debounce: ShopifyGlobal.debounce,
  throttle: ShopifyGlobal.throttle,
  formatMoney: ShopifyGlobal.formatMoney
};