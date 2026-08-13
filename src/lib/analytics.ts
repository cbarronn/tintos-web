/* Analytics event tracking — prepared for GA4, Meta Pixel, TikTok Pixel */
/* No credentials included. Configure via environment variables. */

type EcommerceEvent =
  | 'view_item'
  | 'add_to_cart'
  | 'remove_from_cart'
  | 'view_cart'
  | 'begin_checkout'
  | 'add_shipping_info'
  | 'add_payment_info'
  | 'purchase'
  | 'view_item_list'
  | 'select_item'
  | 'search';

interface EventData {
  [key: string]: unknown;
}

export function trackEvent(event: EcommerceEvent, data?: EventData) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as Record<string, unknown> & { gtag: (...args: unknown[]) => void }).gtag('event', event, data);
  }

  // Meta Pixel
  if (typeof window !== 'undefined' && 'fbq' in window) {
    const fbq = (window as Record<string, unknown> & { fbq: (...args: unknown[]) => void }).fbq;
    const metaEventMap: Record<string, string> = {
      view_item: 'ViewContent',
      add_to_cart: 'AddToCart',
      begin_checkout: 'InitiateCheckout',
      purchase: 'Purchase',
      search: 'Search',
    };
    const metaEvent = metaEventMap[event];
    if (metaEvent) fbq('track', metaEvent, data);
  }

  // Console log in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Analytics] ${event}`, data);
  }
}
