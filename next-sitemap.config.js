/** @type {import('next-sitemap').IConfig} */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || 'https://strapi.emishaglobal.com';

async function fetchAllSlugs(endpoint) {
  const slugs = [];
  let page = 1;
  const pageSize = 100;

  while (true) {
    try {
      const url = `${STRAPI_URL}/api/${endpoint}?fields[0]=Slug&fields[1]=updatedAt&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
      const res = await fetch(url);
      if (!res.ok) break;
      const json = await res.json();
      const items = json?.data || [];
      if (items.length === 0) break;

      for (const item of items) {
        const attrs = item?.attributes || item;
        const slug = attrs?.Slug || attrs?.slug;
        const updatedAt = attrs?.updatedAt;
        if (slug) slugs.push({ slug, updatedAt });
      }

      const total = json?.meta?.pagination?.total || 0;
      if (slugs.length >= total || items.length < pageSize) break;
      page++;
    } catch (e) {
      console.error(`[next-sitemap] Failed fetching ${endpoint} page ${page}:`, e.message);
      break;
    }
  }

  return slugs;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://emishaglobal.com';
const isDevDomain = siteUrl.includes('dev.emishaglobal.com');

module.exports = {
  siteUrl,
  generateIndexSitemap: false,
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: isDevDomain
      ? [{ userAgent: '*', disallow: '/' }]
      : [{ userAgent: '*', allow: '/' }],
  },
  // Exclude backup/copy pages and API routes
  exclude: [
    '/api/*',
    '/404',
    '/news-static',
    '/news-all-parts-filter',
    '/resources-detail',
    '/contact-backup*',
    '/news - Copy*',
    '/resources - Copy*',
    '/index - Copy*',
    '/news-backup*',
    '/resources-backup*',
    '/index-backup*',
  ],
  // Fetch all dynamic slugs from Strapi and add them explicitly
  additionalPaths: async () => {
    const [newsSlugs, resourceSlugs] = await Promise.all([
      fetchAllSlugs('news-articles'),
      fetchAllSlugs('resources'),
    ]);

    const newsEntries = newsSlugs.map(({ slug, updatedAt }) => ({
      loc: `/news/${slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: updatedAt ? new Date(updatedAt).toISOString() : new Date().toISOString(),
    }));

    const resourceEntries = resourceSlugs.map(({ slug, updatedAt }) => ({
      loc: `/resources/${slug}`,
      changefreq: 'monthly',
      priority: 0.6,
      lastmod: updatedAt ? new Date(updatedAt).toISOString() : new Date().toISOString(),
    }));

    console.log(`[next-sitemap] Added ${newsEntries.length} news + ${resourceEntries.length} resource paths`);
    return [...newsEntries, ...resourceEntries];
  },
  transform: async (_config, path) => {
    const priority =
      path === '/' ? 1.0 :
      path.startsWith('/news/') || path.startsWith('/resources/') ? 0.6 :
      path.startsWith('/services/') ? 0.8 :
      ['/company', '/contact', '/news', '/resources'].includes(path) ? 0.8 :
      0.3;

    const changefreq =
      path === '/' ? 'weekly' :
      path === '/news' || path === '/resources' ? 'daily' :
      path.startsWith('/news/') || path.startsWith('/resources/') ? 'monthly' :
      path.startsWith('/services/') ? 'monthly' :
      'yearly';

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
    };
  },
};
