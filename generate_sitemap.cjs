const fs = require('fs');
const path = require('path');

const baseUrl = 'https://dentasmart.ai';

const staticRoutes = [
  '/',
  '/how-it-works',
  '/features',
  '/pricing',
  '/employers',
  '/team',
  '/hub',
  '/faqs',
  '/privacy-policy',
  '/terms-of-service'
];

const articleIds = [
  'unclear-diagnoses',
  'rushed-decisions',
  'questioning-recommendations',
  'surprise-costs',
  'monitoring-confusion',
  'insurance-influence',
  'misleading-insurance',
  'annual-maximums',
  'risky-waiting-periods',
  'denied-claims',
  'treatment-timing',
  'confusing-policies',
  'undetected-cavities',
  'silent-gum-disease',
  'missed-cracks',
  'infection-emergencies',
  'surprise-root-canals',
  'tooth-wear',
  'wisdom-teeth-issues'
];

const generateSitemap = () => {
  const currentDate = new Date().toISOString().split('T')[0];

  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

  // Add static routes
  staticRoutes.forEach(route => {
    sitemap += `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  });

  // Add dynamic article routes
  articleIds.forEach(id => {
    sitemap += `
  <url>
    <loc>${baseUrl}/hub/${id}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });

  sitemap += `
</urlset>`;

  return sitemap;
};

const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /
Sitemap: ${baseUrl}/sitemap.xml
`;
};

const sitemapContent = generateSitemap();
const robotsTxtContent = generateRobotsTxt();

const publicDir = path.join(__dirname, 'client', 'public');

fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapContent);
console.log('sitemap.xml generated successfully.');

fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxtContent);
console.log('robots.txt generated successfully.');
