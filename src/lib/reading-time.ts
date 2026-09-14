const WORDS_PER_MINUTE = 200;

export function readingTime(body?: string): string | undefined {
  if (!body) return undefined;

  const words = body
    .replace(/```[\s\S]*?```/g, "") // drop fenced code blocks
    .replace(/`[^`]*`/g, "") // drop inline code
    .replace(/!\[.*?\]\(.*?\)/g, "") // drop images
    .replace(/\[(.*?)\]\(.*?\)/g, "$1") // keep link text, drop the url
    .trim()
    .split(/\s+/)
    .filter(Boolean);

  if (words.length === 0) return undefined;

  const minutes = Math.max(1, Math.round(words.length / WORDS_PER_MINUTE));
  return `${minutes} min read`;
}
