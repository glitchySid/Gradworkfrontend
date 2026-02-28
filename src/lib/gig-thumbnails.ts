/**
 * Returns a relevant fallback thumbnail URL for a gig based on its category and title.
 * Uses Unsplash stock photos with fixed IDs for consistent display.
 */

const CATEGORY_THUMBNAILS: Record<string, string> = {
  web_development:
    "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  mobile_development:
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80",
  data_science:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
  design:
    "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80",
  video_editing:
    "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80",
  content_writing:
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=600&q=80",
  other:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80",
};

// Keyword-based fallbacks for title matching when category is missing
const KEYWORD_THUMBNAILS: [RegExp, string][] = [
  [/website|web|react|next|frontend|html|css|javascript|node/i, CATEGORY_THUMBNAILS.web_development],
  [/mobile|android|ios|flutter|react native|app/i, CATEGORY_THUMBNAILS.mobile_development],
  [/data|analytics|machine learning|ai|python|ml/i, CATEGORY_THUMBNAILS.data_science],
  [/design|ui|ux|figma|logo|brand|graphic/i, CATEGORY_THUMBNAILS.design],
  [/video|edit|premiere|after effects|motion|animation/i, CATEGORY_THUMBNAILS.video_editing],
  [/writ|content|blog|article|copy|seo/i, CATEGORY_THUMBNAILS.content_writing],
];

const DEFAULT_THUMBNAIL =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80";

export function getGigThumbnail(
  thumbnailUrl: string | null | undefined,
  category: string | null | undefined,
  title: string
): string {
  // If the gig already has a custom thumbnail, use it
  if (thumbnailUrl) return thumbnailUrl;

  // Try category-based match
  if (category && CATEGORY_THUMBNAILS[category]) {
    return CATEGORY_THUMBNAILS[category];
  }

  // Try keyword-based match from title
  for (const [pattern, url] of KEYWORD_THUMBNAILS) {
    if (pattern.test(title)) return url;
  }

  return DEFAULT_THUMBNAIL;
}
