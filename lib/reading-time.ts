/**
 * Calculate estimated reading time in minutes, excluding code blocks
 * Assumes 200 words per minute (WPM) reading speed
 * @param doc Document with raw markdown body
 * @returns Estimated reading time in minutes (minimum 1)
 */
export function calculateReadingTime(doc: { body: { raw: string } }): number {
  // Get the raw markdown content
  const raw = doc.body.raw;

  // Remove all code blocks (between ``` tags)
  const textOnly = raw.replace(/```[\s\S]*?```/g, '');

  // Count words by splitting on whitespace
  const words = textOnly.trim().split(/\s+/).length;

  // Calculate minutes at 200 WPM, round up
  const minutes = Math.ceil(words / 200);

  // Return at least 1 minute
  return Math.max(minutes, 1);
}
