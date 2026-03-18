import { describe, test, expect } from 'vitest';
import { render } from '@testing-library/react';
import { ReadingProgressBar } from './ReadingProgressBar';

describe('ReadingProgressBar', () => {
  test('renders without crashing', () => {
    const { container } = render(<ReadingProgressBar />);
    expect(container.firstChild).toBeInTheDocument();
  });

  test('has correct positioning classes', () => {
    const { container } = render(<ReadingProgressBar />);
    const div = container.firstChild as HTMLDivElement;
    expect(div.className).toContain('fixed');
    expect(div.className).toContain('top-0');
    expect(div.className).toContain('left-0');
    expect(div.className).toContain('right-0');
  });
});
