/**
 * 🎯 Dynamic Favicon Loader
 * Changes favicon during page loading/async operations
 */

class FaviconLoader {
  private originalFavicon: string = '/favicon-static.svg';
  private loaderFavicon: string = '/favicon-loader.svg';
  private faviconElement: HTMLLinkElement | null = null;

  constructor() {
    this.init();
  }

  /**
   * Initialize favicon element
   */
  private init() {
    this.faviconElement = document.querySelector('link[rel="icon"]');
    if (!this.faviconElement) {
      this.faviconElement = document.createElement('link');
      this.faviconElement.rel = 'icon';
      this.faviconElement.type = 'image/svg+xml';
      document.head.appendChild(this.faviconElement);
    }
    // Set initial favicon
    this.setStatic();
  }

  /**
   * Show loading favicon (animated spinner)
   */
  showLoading() {
    if (this.faviconElement) {
      this.faviconElement.href = this.loaderFavicon + '?t=' + Date.now();
     
    }
  }

  /**
   * Show static favicon (normal icon)
   */
  setStatic() {
    if (this.faviconElement) {
      this.faviconElement.href = this.originalFavicon + '?t=' + Date.now();
     
    }
  }

  /**
   * Show error favicon (optional - can add red icon)
   */
  showError() {
    // Can implement custom error favicon if needed
    this.setStatic();
   
  }

  /**
   * Change favicon dynamically
   */
  changeFavicon(href: string) {
    if (this.faviconElement) {
      this.faviconElement.href = href + '?t=' + Date.now();
    }
  }
}

// Export singleton instance
export const faviconLoader = new FaviconLoader();

/**
 * Hook into page lifecycle
 */
export const setupFaviconLoader = () => {
  // Show loader when page starts loading
  window.addEventListener('beforeunload', () => {
    faviconLoader.showLoading();
  });

  // Show static when page fully loaded
  window.addEventListener('load', () => {
    faviconLoader.setStatic();
  });

  // Monitor for errors
  window.addEventListener('error', () => {
    faviconLoader.showError();
  });

  // Listen for visibility changes (tab switching)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      // User returned to tab, ensure correct favicon
      if (document.readyState === 'complete') {
        faviconLoader.setStatic();
      } else {
        faviconLoader.showLoading();
      }
    }
  });
};

/**
 * Helper to show loading during async operations
 */
export const withFaviconLoader = async <T>(promise: Promise<T>): Promise<T> => {
  faviconLoader.showLoading();
  try {
    const result = await promise;
    faviconLoader.setStatic();
    return result;
  } catch (error) {
    faviconLoader.showError();
    throw error;
  }
};

export default faviconLoader;
