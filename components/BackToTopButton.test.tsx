import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { BackToTopButton } from './BackToTopButton';

describe('BackToTopButton', () => {
  test('renders without crashing', () => {
    const { container } = render(<BackToTopButton />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('button has correct aria-label', () => {
    const { getByRole } = render(<BackToTopButton />);
    const button = getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Back to top');
  });
});
