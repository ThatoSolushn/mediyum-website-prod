export const siteConfig = {
  name: "Mediyum ZA",
  legalName: "Mediyum ZA (PTY) LTD",
  tagline: "End-to-end IT solutions for South African businesses.",
  url: "https://www.mediyumza.co.za",
  wooCommerce: {
    // TODO: Replace placeholder URLs with your actual WooCommerce store URLs.
    baseUrl: "https://your-woocommerce-store.example.com",
    categories: {
      hardware: "https://your-woocommerce-store.example.com/category/hardware",
      licenses: "https://your-woocommerce-store.example.com/category/licenses",
      services: "https://your-woocommerce-store.example.com/category/services",
    },
  },
  social: {
    // Fill in when available, e.g.:
    // linkedIn: "https://www.linkedin.com/company/mediyum-za",
    // facebook: "https://www.facebook.com/mediyumza",
  },
};

export type SiteConfig = typeof siteConfig;

