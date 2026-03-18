import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { CopyButton } from './CopyButton';

describe('CopyButton', () => {
  test('renders without crashing', () => {
    const { container } = render(<CopyButton text="test code" />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('button has correct aria-label', () => {
    const { getByRole } = render(<CopyButton text="test code" />);
    const button = getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Copy code');
  });
});
