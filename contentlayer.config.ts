import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import { z } from 'zod';

/**
 * Post 文档类型定义
 * 定义博客文章的数据结构和 frontmatter 验证
 */
export const Post = defineDocumentType(() => ({
  name: 'Post',
  filePathPattern: `**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
      description: 'Short article title',
      validate: z.string().min(1),
    },
    date: {
      type: 'date',
      required: true,
      description: 'Publication date in ISO format YYYY-MM-DD',
      validate: z.date(),
    },
    description: {
      type: 'string',
      required: true,
      description: 'Article description/excerpt for SEO and listing',
      validate: z.string().min(1),
    },
    category: {
      type: 'string',
      required: true,
      description: 'Primary category for the article',
      validate: z.string().min(1),
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      required: true,
      description: 'Keywords/tags for filtering and related content',
      validate: z.array(z.string().min(1)),
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => {
        // Each post is in /content/posts/{slug}/index.mdx
        // Get the directory name as the slug
        const parts = doc._raw.flattenedPath.split('/');
        return parts[parts.length - 2];
      },
    },
    body: {
      type: 'string',
      resolve: (doc) => doc.body.raw,
    },
  },
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Post],
});
