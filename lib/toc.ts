/**
 * Table of Contents heading type
 * Represents a extracted H2 or H3 heading from the article
 */
export interface Heading {
  depth: 2 | 3;
  value: string;
  id: string;
}

/**
 * Slugifies a heading text to create a URL-safe anchor ID
 * Handles collisions by appending a counter when duplicate slugs are encountered
 * Preserves Unicode characters (Chinese, etc.)
 */
export function slugifyHeading(text: string, existingIds: Set<string>): string {
  // Convert to lowercase
  let slug = text.toLowerCase();
  // Replace whitespace sequences with single hyphen
  slug = slug.replace(/\s+/g, '-');
  // Remove unsafe URL characters (keep Unicode letters/numbers)
  slug = slug.replace(/[^-\p{L}\p{N}]/gu, '');
  // Remove leading/trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  // Handle collisions
  if (!existingIds.has(slug)) {
    return slug;
  }

  let counter = 1;
  let suffixedSlug = `${slug}-${counter}`;
  while (existingIds.has(suffixedSlug)) {
    counter++;
    suffixedSlug = `${slug}-${counter}`;
  }
  return suffixedSlug;
}

/**
 * Recursively extracts H2 and H3 headings from Hast AST
 * Returns an array of Heading objects with generated unique IDs
 */
export function extractHeadings(node: any, headingIds: Set<string>): Heading[] {
  const headings: Heading[] = [];

  if (node.type === 'element' && (node.tagName === 'h2' || node.tagName === 'h3')) {
    const depth = node.tagName === 'h2' ? 2 : 3;
    // Get text content from all child nodes
    const value = getTextContent(node);
    const id = slugifyHeading(value, headingIds);
    headingIds.add(id);
    headings.push({ depth, value, id });
  }

  if (node.children) {
    for (const child of node.children) {
      headings.push(...extractHeadings(child, headingIds));
    }
  }

  return headings;
}

/**
 * Gets the text content from a Hast node by concatenating all text child nodes
 */
function getTextContent(node: any): string {
  if (node.type === 'text') {
    return node.value;
  }
  if (node.children) {
    return node.children.map(getTextContent).join('');
  }
  return '';
}

/**
 * Rehype plugin to extract H2/H3 headings and attach them to doc.data
 * This makes them available to Contentlayer via the computed field
 */
export function rehypeExtractHeadings() {
  return (tree: any, file: any) => {
    const headingIds = new Set<string>();
    const headings = extractHeadings(tree, headingIds);
    // Attach headings to the document data so Contentlayer can read it
    file.data.headings = headings;
  };
}
