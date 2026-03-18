import { describe, test, expect } from 'vitest';
import { calculateReadingTime } from './reading-time';

describe('calculateReadingTime', () => {
  test('empty document returns minimum 1 minute', () => {
    const result = calculateReadingTime({ body: { raw: '' } });
    expect(result).toBe(1);
  });

  test('short text returns 1 minute', () => {
    // 100 words, less than 200 WPM → 1 minute
    const shortText = 'word '.repeat(100);
    const result = calculateReadingTime({ body: { raw: shortText } });
    expect(result).toBe(1);
  });

  test('long text calculates correct minutes', () => {
    // 400 words → 2 minutes at 200 WPM
    const longText = 'word '.repeat(400);
    const result = calculateReadingTime({ body: { raw: longText } });
    expect(result).toBe(2);
  });

  test('300 words rounds up to 2 minutes', () => {
    const text = 'word '.repeat(300);
    const result = calculateReadingTime({ body: { raw: text } });
    expect(result).toBe(2);
  });

  test('excludes code blocks from word count', () => {
    // 200 words of text + 1000 words in code block → should still be 1 minute
    const text = `
This is some regular text that should be counted. ${'word '.repeat(150)}

\`\`\`
${'codeword '.repeat(1000)}
\`\`\`

More text after code.
`;
    const result = calculateReadingTime({ body: { raw: text } });
    // ~170 words outside code → 1 minute
    expect(result).toBe(1);
  });

  test('multiple code blocks are all excluded', () => {
    const text = `
Start text ${'word '.repeat(50)}

\`\`\`
${'code '.repeat(200)}
\`\`\`

Middle text ${'word '.repeat(50)}

\`\`\`
${'morecode '.repeat(200)}
\`\`\`

End text ${'word '.repeat(50)}
`;
    // Total 150 words outside code → 1 minute
    const result = calculateReadingTime({ body: { raw: text } });
    expect(result).toBe(1);
  });
});
