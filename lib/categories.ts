/**
 * Category Utilities
 * Manages blog categories and their styling
 */

export interface Category {
  id: string;
  name: string;
  slug: string;
  color: string;
  bgColor: string;
  description: string;
}

// Category definitions
const CATEGORIES: Category[] = [
  {
    id: 'user-story',
    name: 'User Story',
    slug: 'user-story',
    color: '#FF8854',
    bgColor: '#FFF5F0',
    description: 'Real stories from organizations using Avni to transform their field operations',
  },
  {
    id: 'technical-story',
    name: 'Technical Story',
    slug: 'technical-story',
    color: '#419372',
    bgColor: '#F0F9F5',
    description: 'Deep dives into Avni\'s technical architecture and implementation details',
  },
  {
    id: 'avni-news',
    name: 'Avni News',
    slug: 'avni-news',
    color: '#0B2540',
    bgColor: '#E9EAF8',
    description: 'Latest updates, releases, and announcements from the Avni team',
  },
  {
    id: 'sector',
    name: 'Sector',
    slug: 'sector',
    color: '#FBA57F',
    bgColor: '#FFF5F0',
    description: 'Sector-specific insights covering healthcare, education, WASH, and more',
  },
];

/**
 * Get all categories
 */
export function getAllCategories(): Category[] {
  return CATEGORIES;
}

/**
 * Get category by slug
 */
export function getCategoryBySlug(slug: string): Category | null {
  const normalized = slug.toLowerCase().replace(/\s+/g, '-');
  return CATEGORIES.find((cat: Category) => cat.slug === normalized) || null;
}

/**
 * Get category by name
 */
export function getCategoryByName(name: string | undefined): Category | null {
  if (!name) return null;
  
  return CATEGORIES.find(
    (cat: Category) => cat.name.toLowerCase() === name.toLowerCase()
  ) || null;
}

/**
 * Get category badge classes
 */
export function getCategoryBadgeClasses(categoryName: string | undefined): string {
  const category = getCategoryByName(categoryName);
  
  if (!category) {
    // Default styling
    return 'bg-gray-100 text-gray-700';
  }
  
  return `text-white`;
}

/**
 * Get category badge inline styles
 */
export function getCategoryBadgeStyles(categoryName: string | undefined): React.CSSProperties {
  const category = getCategoryByName(categoryName);
  
  if (!category) {
    return {};
  }
  
  return {
    backgroundColor: category.color,
    color: '#ffffff',
  };
}

/**
 * Get category card styles
 */
export function getCategoryCardStyles(categoryName: string): React.CSSProperties {
  const category = getCategoryByName(categoryName);
  
  if (!category) {
    return {};
  }
  
  return {
    backgroundColor: category.bgColor,
    borderColor: category.color,
  };
}
