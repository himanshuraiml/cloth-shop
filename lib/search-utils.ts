export interface RecentSearch {
  query: string;
  timestamp: number;
}

const RECENT_SEARCHES_KEY = 'tribaah_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export const getRecentSearches = (): RecentSearch[] => {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addRecentSearch = (query: string): void => {
  if (typeof window === 'undefined') return;

  try {
    const searches = getRecentSearches();
    const filtered = searches.filter((s) => s.query.toLowerCase() !== query.toLowerCase());

    const updated = [
      { query, timestamp: Date.now() },
      ...filtered,
    ].slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error('Error saving recent search:', error);
  }
};

export const clearRecentSearches = (): void => {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(RECENT_SEARCHES_KEY);
  } catch (error) {
    console.error('Error clearing recent searches:', error);
  }
};

export const highlightMatch = (text: string, query: string): string => {
  if (!query) return text;

  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark class="bg-yellow-200 text-gray-900">$1</mark>');
};

export const calculateRelevance = (
  item: any,
  query: string
): number => {
  const q = query.toLowerCase();
  const name = (item.name || '').toLowerCase();
  const description = (item.description || '').toLowerCase();

  let score = 0;

  if (name === q) score += 100;
  else if (name.startsWith(q)) score += 50;
  else if (name.includes(q)) score += 25;

  if (description.includes(q)) score += 10;

  return score;
};

export const sortByRelevance = (items: any[], query: string): any[] => {
  return items
    .map((item) => ({
      ...item,
      relevance: calculateRelevance(item, query),
    }))
    .sort((a, b) => b.relevance - a.relevance);
};

export const popularSearches = [
  'T-Shirt',
  'Jeans',
  'Dress',
  'Sneakers',
  'Jacket',
  'Accessories',
];

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null;

  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};
