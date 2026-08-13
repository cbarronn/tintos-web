export const siteConfig = {
  name: 'TINTOS',
  tagline: 'EL CARÁCTER NO PASA DE MODA.',
  origin: 'LEÓN · GUANAJUATO · MÉXICO',
  url: 'https://tintos.mx',
  instagram: '@tintos_mex',
  instagramUrl: 'https://instagram.com/tintos_mex',
  whatsapp: {
    // Configurar número real
    number: '524771234567',
    defaultMessage: 'Hola TINTOS, necesito información sobre este modelo:',
  },
  shipping: {
    freeShippingThreshold: 4500, // MXN
    currency: 'MXN',
  },
  announcement: 'ENVÍOS A TODO MÉXICO · COMPRA SEGURA · HECHO EN LEÓN',
  analytics: {
    gaId: process.env.NEXT_PUBLIC_GA_ID || '',
    metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || '',
    tiktokPixelId: process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || '',
    gtmId: process.env.NEXT_PUBLIC_GTM_ID || '',
  },
  seo: {
    defaultTitle: 'TINTOS — Botines Artesanales | Hecho en León, México',
    defaultDescription:
      'Botines artesanales de piel premium. Fabricación artesanal en León, Guanajuato. Chelsea y Bostonianos diseñados para permanecer. El carácter no pasa de moda.',
    keywords: [
      'botines mexicanos',
      'botines artesanales',
      'botines de piel',
      'botines Chelsea México',
      'calzado hecho en León',
      'calzado mexicano premium',
      'zapatos artesanales León Guanajuato',
      'TINTOS',
      'botines Chelsea',
      'botines Bostonianos',
    ],
  },
};
