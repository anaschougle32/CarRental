/**
 * Official social media links for Zio Car Rentals.
 * Single source of truth across the entire application, SEO schemas, and layouts.
 */
export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/ziocarrentals",
  instagram: "https://www.instagram.com/ziocars",
  x: "https://x.com/ziocarrentals",
  pinterest: "https://in.pinterest.com/ziocar",
  youtube: "https://www.youtube.com/@ziocars",
} as const;

export const SOCIAL_ARRAY = [
  SOCIAL_LINKS.facebook,
  SOCIAL_LINKS.instagram,
  SOCIAL_LINKS.x,
  SOCIAL_LINKS.pinterest,
  SOCIAL_LINKS.youtube,
];
