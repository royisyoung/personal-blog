import RSS = require('rss');
import { writeFileSync } from 'fs';
import path from 'path';
import { getAllPosts } from './content';
import type { Post } from 'contentlayer/generated';

/**
 * Generate RSS feed XML file at build time
 * Includes full article content for RSS readers
 */
export async function generateRSS(): Promise<void> {
  const posts = getAllPosts();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteTitle = process.env.NEXT_PUBLIC_SITE_TITLE || 'My Blog';
  const siteDescription = process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'A personal technology blog';

  // Create RSS feed with content namespace for full content
  const feed = new RSS({
    title: siteTitle,
    description: siteDescription,
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    language: 'zh-CN',
    custom_namespaces: {
      content: 'http://purl.org/rss/1.0/modules/content/',
    },
  });

  // Add each post to the feed
  posts.forEach((post: Post) => {
    const postUrl = `${siteUrl}/posts/${post.slug}`;
    // For RSS 2.0, include full content as content:encoded
    const description = post.description || '';

    feed.item({
      title: post.title,
      description: description,
      url: postUrl,
      date: new Date(post.date),
      guid: postUrl,
      categories: post.tags || [],
      custom_elements: [
        { 'content:encoded': post.body.raw },
      ],
    });
  });

  // Write the XML file to public directory
  const outputPath = path.join(process.cwd(), 'public', 'rss.xml');
  writeFileSync(outputPath, feed.xml({ indent: true }));

  console.log(`✓ RSS feed generated: ${outputPath}`);
  console.log(`  - Included ${posts.length} posts`);
}
