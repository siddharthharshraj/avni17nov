/**
 * Blog Content Component
 * Renders markdown content with proper styling and image handling
 * Typography: Noto Sans 24px/36px for body, Anek Latin for headings
 */

import MarkdownContent from '@/components/ui/MarkdownContent';

interface BlogContentProps {
  htmlContent: string;
}

export default function BlogContent({ htmlContent }: BlogContentProps) {
  return <MarkdownContent htmlContent={htmlContent} className="mb-12" />;
}
