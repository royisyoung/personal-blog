import { describe, test, expect } from 'vitest';
import { slugifyHeading, extractHeadings } from './toc';
import type { Heading } from './toc';

describe('slugifyHeading', () => {
  test('converts text to lowercase', () => {
    const existingIds = new Set<string>();
    const result = slugifyHeading('Hello World', existingIds);
    expect(result).toBe('hello-world');
  });

  test('removes special characters', () => {
    const existingIds = new Set<string>();
    const result = slugifyHeading('Hello! World?', existingIds);
    expect(result).toBe('hello-world');
  });

  test('replaces spaces with hyphens', () => {
    const existingIds = new Set<string>();
    const result = slugifyHeading('this is a long heading', existingIds);
    expect(result).toBe('this-is-a-long-heading');
  });

  test('removes leading and trailing hyphens', () => {
    const existingIds = new Set<string>();
    const result = slugifyHeading('  --hello world--  ', existingIds);
    expect(result).toBe('hello-world');
  });

  test('collapses multiple spaces into single hyphen', () => {
    const existingIds = new Set<string>();
    const result = slugifyHeading('hello   world   test', existingIds);
    expect(result).toBe('hello-world-test');
  });

  test('handles collisions by appending counter', () => {
    const existingIds = new Set<string>(['introduction']);
    const result = slugifyHeading('Introduction', existingIds);
    expect(result).toBe('introduction-1');
  });

  test('handles multiple collisions with incrementing counters', () => {
    const existingIds = new Set<string>(['introduction', 'introduction-1']);
    const result = slugifyHeading('Introduction', existingIds);
    expect(result).toBe('introduction-2');
  });

  test('handles Chinese characters', () => {
    const existingIds = new Set<string>();
    const result = slugifyHeading('介绍 中文标题', existingIds);
    // Chinese characters are kept, spaces become hyphens
    expect(result).toBe('介绍-中文标题');
  });
});

describe('extractHeadings', () => {
  test('extracts only h2 and h3, skips h1', () => {
    const root = {
      type: 'element',
      tagName: 'div',
      children: [
        { type: 'element', tagName: 'h1', children: [{ type: 'text', value: 'Title' }] },
        { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'Chapter 1' }] },
        { type: 'element', tagName: 'h3', children: [{ type: 'text', value: 'Section 1.1' }] },
        { type: 'element', tagName: 'h4', children: [{ type: 'text', value: 'Subsection' }] },
      ],
    };

    const headingIds = new Set<string>();
    const result = extractHeadings(root, headingIds);

    expect(result.length).toBe(2);
    expect(result.map((h) => ({ depth: h.depth, value: h.value }))).toEqual([
      { depth: 2, value: 'Chapter 1' },
      { depth: 3, value: 'Section 1.1' },
    ]);
  });

  test('extracts correct values and generates correct ids', () => {
    const root = {
      type: 'element',
      tagName: 'article',
      children: [
        { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'Getting Started' }] },
        { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'Advanced Usage' }] },
      ],
    };

    const headingIds = new Set<string>();
    const result = extractHeadings(root, headingIds);

    expect(result[0].id).toBe('getting-started');
    expect(result[1].id).toBe('advanced-usage');
    expect(result[0].value).toBe('Getting Started');
    expect(result[1].value).toBe('Advanced Usage');
  });

  test('generates unique ids for duplicate headings', () => {
    const root = {
      type: 'element',
      tagName: 'div',
      children: [
        { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'Introduction' }] },
        { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'Introduction' }] },
        { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'Introduction' }] },
      ],
    };

    const headingIds = new Set<string>();
    const result = extractHeadings(root, headingIds);

    expect(result[0].id).toBe('introduction');
    expect(result[1].id).toBe('introduction-1');
    expect(result[2].id).toBe('introduction-2');
  });

  test('extracts nested headings recursively', () => {
    const root = {
      type: 'element',
      tagName: 'div',
      children: [
        {
          type: 'element',
          tagName: 'section',
          children: [
            { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'First' }] },
            {
              type: 'element',
              tagName: 'div',
              children: [{ type: 'element', tagName: 'h3', children: [{ type: 'text', value: 'Sub One' }] }],
            },
          ],
        },
        { type: 'element', tagName: 'h2', children: [{ type: 'text', value: 'Second' }] },
      ],
    };

    const headingIds = new Set<string>();
    const result = extractHeadings(root, headingIds);

    expect(result.length).toBe(3);
    expect(result.map((h) => h.value)).toEqual(['First', 'Sub One', 'Second']);
    expect(result.map((h) => h.depth)).toEqual([2, 3, 2]);
  });

  test('concatenates text from multiple child nodes', () => {
    const root = {
      type: 'element',
      tagName: 'div',
      children: [
        {
          type: 'element',
          tagName: 'h2',
          children: [
            { type: 'text', value: 'Hello ' },
            { type: 'element', tagName: 'code', children: [{ type: 'text', value: 'World' }] },
          ],
        },
      ],
    };

    const headingIds = new Set<string>();
    const result = extractHeadings(root, headingIds);

    expect(result[0].value).toBe('Hello World');
  });

  test('returns empty array when no headings', () => {
    const root = {
      type: 'element',
      tagName: 'div',
      children: [
        { type: 'element', tagName: 'p', children: [{ type: 'text', value: 'Paragraph' }] },
        { type: 'element', tagName: 'h1', children: [{ type: 'text', value: 'Only H1' }] },
      ],
    };

    const headingIds = new Set<string>();
    const result = extractHeadings(root, headingIds);

    expect(result).toEqual([]);
  });
});
