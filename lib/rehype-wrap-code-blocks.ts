import type { Root, Parent } from 'hast';
import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to wrap code blocks in a container div for copy button positioning
 * Finds all <pre> elements that contain <code> (code blocks)
 * Wraps them in a <div class="code-block-wrapper relative">
 * Adds a placeholder button with data-copy-button attribute containing the code text
 */
export function rehypeWrapCodeBlocks() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      // Look for pre elements that contain code
      if (
        node.tagName === 'pre' &&
        node.children.some((child) => child.type === 'element' && child.tagName === 'code')
      ) {
        const codeChild = node.children.find((child) => child.type === 'element' && child.tagName === 'code') as
          | Parent
          | undefined;

        // Extract the text content from the code block
        let codeText = '';
        if (codeChild && 'children' in codeChild) {
          codeText = codeChild.children
            .filter((child) => child.type === 'text')
            .map((child) => child.value)
            .join('');
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

        // Replace the original node with the wrapper
        // We need to find the parent and replace the node
        if (node && node.position && 'parent' in node && node.parent) {
          const parent = node.parent as Parent;
          const index = parent.children.indexOf(node);
          if (index !== -1) {
            parent.children[index] = wrapper;
          }
        }
      }
    });
  };
}
