// Admin route paths defined as constants so the platform's sitemap generator
// cannot detect them from static string analysis of Route components in App.tsx
export const ADMIN_ROUTES = {
  login: "/admin/login",
  dashboard: "/admin",
  newPost: "/admin/new",
  editPost: "/admin/edit/:id",
  seoSetup: "/admin/seo-analytics-setup",
  categories: "/admin/categories",
} as const;
