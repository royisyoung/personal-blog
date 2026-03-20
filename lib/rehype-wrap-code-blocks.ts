import type { Root, Parent } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Recursively extract all text content from a node
 * Handles Shiki output where text is inside nested spans (.line span)
 */
function extractAllText(node: any): string {
  if (node.type === 'text') {
    return node.value;
  }
  if ('children' in node && Array.isArray(node.children)) {
    return node.children.map((child) => extractAllText(child)).join('');
  }
  return '';
}

/**
 * Rehype plugin to wrap code blocks in a container div for copy button positioning
 * Finds all <pre> elements that contain <code> (code blocks)
 * Wraps them in a <div class="code-block-wrapper relative">
 * Adds a placeholder button with data-copy-button attribute containing the code text
 */
export function rehypeWrapCodeBlocks() {
  return (tree: Root) => {
    // Visit recursively, keep track of parent
    const visitNode = (node: any, parent: Parent | null, index: number | null) => {
      if (
        node.type === 'element' &&
        node.tagName === 'pre' &&
        node.children.some((child: any) => child.type === 'element' && child.tagName === 'code')
      ) {
        const codeChild = node.children.find((child: any) => child.type === 'element' && child.tagName === 'code') as
          | Parent
          | undefined;

        // Extract the text content from the code block (recursive for Shiki output)
        let codeText = '';
        if (codeChild && 'children' in codeChild) {
          codeText = extractAllText(codeChild);
        }

        // Create wrapper div
        const wrapper = {
          type: 'element' as const,
          tagName: 'div',
          properties: {
            className: ['code-block-wrapper', 'relative'],
          },
          children: [node],
        };

        // Add copy button placeholder after the pre
        const placeholder = {
          type: 'element' as const,
          tagName: 'button',
          properties: {
            'data-copy-button': true,
            'data-code': codeText.trimEnd(),
            'aria-hidden': 'true',
          },
          children: [],
        };

        wrapper.children.push(placeholder);

        // Replace the original node with the wrapper in parent
        if (parent && index !== null) {
          parent.children[index] = wrapper;
        }
      }

      // Continue visiting children
      if ('children' in node) {
        node.children.forEach((child: any, i: number) => visitNode(child, node as Parent, i));
      }
    };

    visitNode(tree as any, null, null);
  };
}
