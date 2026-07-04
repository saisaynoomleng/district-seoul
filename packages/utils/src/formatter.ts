/**
 * Capitalize every word in a string
 * @param title string
 * @returns string
 */
export const formatTitle = (title: string): string => {
  return title
    .trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .map((w) => w.slice(0, 1).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Generate US Date Format
 * @param date string | Date
 * @returns string
 */
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/**
 * Generate any number into Korean Won
 * @param currency number
 * @returns string
 */
export const formatKoreanCurrency = (currency: number): string => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'krw',
  }).format(currency);
};

/**
 * Generate any number into US Dollar
 * @param currency number
 * @returns string
 */
export const formatUSCurrency = (currency: number): string => {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'usd',
  }).format(currency);
};

/**
 * Generate Sanity Slug for any string input
 * @param input string;
 * @returns string;
 */
export const sanitySlugifier = (input: string): string => {
  return input
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 200);
};
