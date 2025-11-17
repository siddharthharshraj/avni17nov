import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const caseStudiesDirectory = path.join(process.cwd(), 'content/case-studies');

export interface CaseStudy {
  slug: string;
  title: string;
  sector: string;
  logo: string;
  description: string;
  date: string;
  author: string;
  readTime: string;
  tags: string[];
  featured: boolean;
  content: string;
}

export function getAllCaseStudySlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(caseStudiesDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => fileName.replace(/\.md$/, ''));
  } catch (error) {
    console.error('Error reading case studies directory:', error);
    return [];
  }
}

export function getCaseStudyBySlug(slug: string): CaseStudy | null {
  try {
    const fullPath = path.join(caseStudiesDirectory, `${slug}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title || '',
      sector: data.sector || 'Social Impact',
      logo: data.logo || '/logos/default.png',
      description: data.description || '',
      date: data.date || '',
      author: data.author || 'Avni Team',
      readTime: data.readTime || '5 min read',
      tags: data.tags || [],
      featured: data.featured || false,
      content,
    };
  } catch (error) {
    console.error(`Error reading case study ${slug}:`, error);
    return null;
  }
}

export function getAllCaseStudies(): CaseStudy[] {
  const slugs = getAllCaseStudySlugs();
  const caseStudies = slugs
    .map((slug) => getCaseStudyBySlug(slug))
    .filter((cs): cs is CaseStudy => cs !== null)
    .sort((a, b) => {
      // Sort by date descending
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });

  return caseStudies;
}

export function getFeaturedCaseStudies(): CaseStudy[] {
  return getAllCaseStudies().filter((cs) => cs.featured);
}

export function getCaseStudiesBySector(sector: string): CaseStudy[] {
  return getAllCaseStudies().filter(
    (cs) => cs.sector.toLowerCase() === sector.toLowerCase()
  );
}

export function getCaseStudiesByTag(tag: string): CaseStudy[] {
  return getAllCaseStudies().filter((cs) =>
    cs.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getRelatedCaseStudies(
  currentSlug: string,
  limit: number = 3
): CaseStudy[] {
  const currentCaseStudy = getCaseStudyBySlug(currentSlug);
  if (!currentCaseStudy) return [];

  const allCaseStudies = getAllCaseStudies().filter(
    (cs) => cs.slug !== currentSlug
  );

  // Find related by sector first
  const sameSector = allCaseStudies.filter(
    (cs) => cs.sector === currentCaseStudy.sector
  );

  // If not enough, add others
  const related = [...sameSector];
  if (related.length < limit) {
    const others = allCaseStudies.filter(
      (cs) => cs.sector !== currentCaseStudy.sector
    );
    related.push(...others);
  }

  return related.slice(0, limit);
}
