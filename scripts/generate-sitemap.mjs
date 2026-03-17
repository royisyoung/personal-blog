// Since contentlayer generates the types at .contentlayer/generated,
// we import the compiled JS
import fs from 'fs';

// Read the generated posts from contentlayer output
// This works after the first build
let posts = [];
try {
  // Try to import the generated content
  const { allPosts } = await import('../.contentlayer/generated/index.js');
  posts = allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
} catch (e) {
  // If build hasn't run yet, create an empty sitemap
  console.warn('Warning: Could not load contentlayer posts. Has the project been built at least once?');
  posts = [];
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com';

// Get all unique categories
const categories = Array.from(new Set(posts.map(post => post.category)));

// Get all unique tags
const tags = Array.from(new Set(posts.flatMap(post => post.tags)));

// Static routes to include
const staticRoutes = [
  { path: '', lastmod: new Date().toISOString().split('T')[0] },
  { path: 'about', lastmod: new Date().toISOString().split('T')[0] },
];

// Add all posts
const postRoutes = posts.map(post => ({
  path: `posts/${post.slug}`,
  lastmod: new Date(post.date).toISOString().split('T')[0],
}));

// Add all category pages
const categoryRoutes = categories.map(category => ({
  path: `categories/${category}`,
  lastmod: new Date().toISOString().split('T')[0],
}));

// Add all tag pages
const tagRoutes = tags.map(tag => ({
  path: `tags/${tag}`,
  lastmod: new Date().toISOString().split('T')[0],
}));

const allRoutes = [
  ...staticRoutes,
  ...postRoutes,
  ...categoryRoutes,
  ...tagRoutes,
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    route => `  <url>
    <loc>${siteUrl}/${route.path}/</loc>
    <lastmod>${route.lastmod}</lastmod>
  </url>`
  )
  .join('\n')}
</urlset>`;

fs.writeFileSync('./public/sitemap.xml', sitemap);
console.log(`Generated sitemap.xml with ${allRoutes.length} URLs`);
