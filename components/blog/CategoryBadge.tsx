/**
 * Category Badge Component
 * Displays category with color-coded styling
 */

interface CategoryBadgeProps {
  category: string;
}

const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  'User Story': { bg: '#FFF5F0', text: '#FF8854' },
  'Technical Story': { bg: '#E6F0FF', text: '#0066FF' },
  'Sector': { bg: '#F0EBFF', text: '#6C47FF' },
  'Avni News': { bg: '#E6F7F0', text: '#00A56D' },
};

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  const colors = CATEGORY_COLORS[category] || { bg: '#F3F4F6', text: '#6B7280' };

  return (
    <span
      className="inline-block px-4 py-2 rounded-full font-anek font-bold text-xs uppercase tracking-wide"
      style={{
        backgroundColor: colors.bg,
        color: colors.text,
      }}
    >
      {category}
    </span>
  );
}
