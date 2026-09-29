/**
 * Car Image Management and Fallback System.
 * Maps all 37 rental cars to their high-resolution images stored in the GitHub repository.
 * GitHub repository: anaschougle32/CarRental
 * Folder: Cars/Cars/
 */

export const GITHUB_CAR_IMAGE_BASE =
  "https://raw.githubusercontent.com/anaschougle32/CarRental/main/Cars/Cars";

export const LOCAL_CAR_IMAGE_BASE = "/images/cars";

/**
 * Exact filename dictionary for all 37 cars in the Cars/Cars folder.
 */
export const CAR_IMAGE_FILENAMES: Record<string, string> = {
  // Hatchbacks & Compacts
  "baleno-manual": "Baleno Manual.png",
  "baleno-automatic": "Baleno Automatic.png",
  "baleno": "Baleno Manual.png",
  "swift-manual": "Swift Manual.png",
  "swift-automatic": "Swift Automatic.png",
  "swift": "Swift Manual.png",
  "maruti-swift": "Swift Manual.png",
  "swift-dzire-manual": "Swift Dzire Manual.png",
  "swift-dzire": "Swift Dzire Manual.png",
  "dzire": "Swift Dzire Manual.png",
  "i10-manual": "I10 Manual.png",
  "i10-automatic": "I10 Automatic.png",
  "i10": "I10 Manual.png",
  "grand-i10": "I10 Manual.png",
  "i20-manual": "I20 Mannual.png",
  "i20-mannual": "I20 Mannual.png",
  "i20": "I20 Mannual.png",
  "i20-automatic-sunroof": "I20 Automatic Sunroof.png",
  "i20-automatic": "I20 Automatic Sunroof.png",
  "ignis-manual": "Ignis Manual.png",
  "ignis": "Ignis Manual.png",
  "wagonr": "WagonR.png",
  "wagon-r": "WagonR.png",

  // Crossovers & Compact SUVs
  "fronx-manual": "Fronx Manual.png",
  "fronx-automatic": "Fronx Automatic.png",
  "fronx": "Fronx Manual.png",
  "brezza-manual": "Brezza Manual.png",
  "brezza-automatic": "Brezza Automatic.png",
  "brezza": "Brezza Manual.png",
  "venue-manual": "Venue Manual.png",
  "venue-automatic": "Venue Automatic.png",
  "venue": "Venue Manual.png",

  // Mid & Full SUVs
  "creta-manual": "Creta Manual.png",
  "creta-automatic-sunroof": "Creta Automatic Sunroof.png",
  "creta-automatic": "Creta Automatic Sunroof.png",
  "creta": "Creta Manual.png",
  "alcazar-sunroof": "Alcazar Sunroof.png",
  "alcazar": "Alcazar Sunroof.png",
  "fortuner-automatic": "Fortuner Automatic.png",
  "fortuner": "Fortuner Automatic.png",
  "fortuner-legender-automatic": "Fortuner Legender Automatic.png",
  "fortuner-legender": "Fortuner Legender Automatic.png",
  "endeavour": "Endeavour.png",
  "ford-endeavour": "Endeavour.png",

  // MPVs & 7-Seaters
  "ertiga-manual": "Ertiga Manual.png",
  "ertiga-automatic": "Ertiga Automatic.png",
  "ertiga": "Ertiga Manual.png",
  "crysta-manual": "Crysta Manual.png",
  "crysta-automatic": "Crysta Automatic.png",
  "crysta": "Crysta Manual.png",
  "innova-crysta": "Crysta Manual.png",
  "hycross-automatic": "Hycross Automatic.png",
  "hycross": "Hycross Automatic.png",
  "innova-hycross": "Hycross Automatic.png",
  "kia-carens": "kia Carens.png",
  "carens": "kia Carens.png",
  "old-innova-manual": "Old Innova Manual.png",
  "old-innova": "Old Innova Manual.png",
  "innova-old": "Old Innova Manual.png",

  // Off-Road 4x4
  "thar-hardtop-manual": "Thar HardTop Manual.png",
  "thar-hardtop": "Thar HardTop Manual.png",
  "thar-soft-top-automatic": "Thar Soft Top Automatic.png",
  "thar-soft-top": "Thar Soft Top Automatic.png",
  "thar-rox-automatic-sunroof": "Thar Rox Automatic Sunroof.png",
  "thar-rox": "Thar Rox Automatic Sunroof.png",
  "thar-roxx": "Thar Rox Automatic Sunroof.png",
  "thar": "Thar HardTop Manual.png",
  "mahindra-thar": "Thar HardTop Manual.png",

  // Luxury & Premium
  "audi-a4": "Audi A4.png",
  "audi": "Audi A4.png",
  "bmw-320-d": "BMW 320 D.png",
  "bmw-320d": "BMW 320 D.png",
  "bmw": "BMW 320 D.png",
  "bmw-3-series": "BMW 320 D.png",
  "mercedes": "Mercedes.png",
  "mercedes-c-class": "Mercedes.png",
  "mini-cooper": "Mini Cooper.png",
  "mini": "Mini Cooper.png",
};

/**
 * Normalizes any string identifier (slug, car name, model) for lookup.
 */
function normalizeCarKey(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/\(.*?\)/g, "") // remove parenthetical remarks like (Automatic), (Manual)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Finds the matching filename in Cars/Cars for any car name or slug.
 */
export function getCarImageFilename(nameOrSlug?: string): string {
  if (!nameOrSlug) return "Swift Manual.png";

  const key = normalizeCarKey(nameOrSlug);

  // 1. Direct match
  if (CAR_IMAGE_FILENAMES[key]) {
    return CAR_IMAGE_FILENAMES[key];
  }

  // 2. Substring matching (e.g. "maruti-baleno-automatic" matches "baleno-automatic")
  for (const [mapKey, filename] of Object.entries(CAR_IMAGE_FILENAMES)) {
    if (key.includes(mapKey) || mapKey.includes(key)) {
      return filename;
    }
  }

  return "Swift Manual.png";
}

/**
 * Returns the GitHub hosted raw image URL for a car.
 */
export function getCarGitHubImageUrl(filename: string): string {
  return `${GITHUB_CAR_IMAGE_BASE}/${encodeURIComponent(filename)}`;
}

/**
 * Returns the local static image URL for a car (from public/images/cars).
 */
export function getCarLocalImageUrl(filename: string): string {
  return `${LOCAL_CAR_IMAGE_BASE}/${encodeURIComponent(filename)}`;
}

/**
 * Resolves the primary image URL for a car.
 * If car has a valid custom image that isn't a placeholder, uses it.
 * Otherwise, links directly to the GitHub hosted image.
 */
export function getCarImageUrl(car?: {
  name?: string;
  slug?: string;
  main_image?: string;
}): string {
  if (
    car?.main_image &&
    car.main_image.trim() !== "" &&
    !car.main_image.includes("car-placeholder.jpg")
  ) {
    return car.main_image;
  }

  const filename = getCarImageFilename(car?.slug || car?.name);
  return getCarGitHubImageUrl(filename);
}

/**
 * Fallback image handler for when the primary image fails to load.
 * Tries local path, then GitHub raw URL, then generic fallback.
 */
export function getCarFallbackImage(nameOrSlug?: string): string {
  const filename = getCarImageFilename(nameOrSlug);
  return getCarGitHubImageUrl(filename);
}

/**
 * Enhances a car object so its main_image is guaranteed to be a valid car image.
 */
export function attachCarImageFallback<T extends { name?: string; slug?: string; main_image?: string; images?: string[] }>(car: T): T {
  const current = car.main_image;
  const isInvalid = !current || current.trim() === "" || current.includes("car-placeholder.jpg");

  if (isInvalid) {
    const fallbackUrl = getCarImageUrl(car);
    return {
      ...car,
      main_image: fallbackUrl,
      images: car.images && car.images.length > 0 ? car.images : [fallbackUrl],
    };
  }

  return car;
}
