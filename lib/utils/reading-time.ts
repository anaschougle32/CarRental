/**
 * Calculates the estimated reading time for a given text
 * @param text The text content to analyze
 * @param wordsPerMinute Average reading speed (default: 200 words per minute)
 * @returns Estimated reading time in minutes (rounded up to the nearest minute)
 */
export function calculateReadingTime(text: string, wordsPerMinute = 200): number {
  if (!text) return 0;
  
  // Remove HTML tags if present and count words
  const textWithoutTags = text.replace(/<[^>]*>/g, ' ');
  const wordCount = textWithoutTags.trim().split(/\s+/).length;
  
  // Calculate reading time in minutes, rounded up
  const readingTime = Math.ceil(wordCount / wordsPerMinute);
  
  // Return at least 1 minute for very short content
  return Math.max(1, readingTime);
}
