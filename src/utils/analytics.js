// Google Analytics 4 (GA4) Utility for OPTIMUS — Longevity 65+
 
export const trackPageView = (pageNumber) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', {
      page_title: `OPTIMUS — Longevity 65+ - Page ${pageNumber}`,
      page_location: window.location.href,
      page_path: `/#page-${pageNumber}`,
    });
  }
};

export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};
