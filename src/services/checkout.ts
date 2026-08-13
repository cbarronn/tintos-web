/* Checkout service — prepared for Shopify, Stripe, MercadoPago, OpenPay */
/* No credentials. No vendor lock-in. */

export interface CheckoutData {
  items: Array<{
    productId: string;
    size: string;
    color: string;
    quantity: number;
    price: number;
  }>;
  customer?: {
    email: string;
    firstName: string;
    lastName: string;
    phone?: string;
  };
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  subtotal: number;
  shipping: number;
  total: number;
}

export async function createCheckout(data: CheckoutData): Promise<{ checkoutUrl: string }> {
  // Replace with actual checkout provider:
  // Shopify: await shopifyClient.checkout.create(...)
  // Stripe: await stripe.checkout.sessions.create(...)
  // MercadoPago: await mercadopago.preferences.create(...)
  console.log('[Checkout] Creating checkout session:', data);
  return { checkoutUrl: '#checkout-not-configured' };
}

export async function getShippingRates(zip: string): Promise<Array<{ name: string; price: number }>> {
  console.log('[Shipping] Getting rates for:', zip);
  return [
    { name: 'Envío estándar (5-7 días)', price: 299 },
    { name: 'Envío express (2-3 días)', price: 449 },
  ];
}
