/**
 * Blog Client Component
 * Handles client-side search, filtering, and pagination
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogSearch from '@/components/blog/BlogSearch';
import BlogFilter from '@/components/blog/BlogFilter';
import BlogCard from '@/components/blog/BlogCard';
import FeaturedBlog from '@/components/blog/FeaturedBlog';
import Pagination from '@/components/blog/Pagination';
import { Blog } from '@/lib/markdown';

interface BlogClientProps {
  featuredBlog: Blog | null;
  blogs: Blog[];
}

const BLOGS_PER_PAGE = 6;

export default function BlogClient({ featuredBlog, blogs }: BlogClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page on search
  }, []);

  // Handle filter change
  const handleFilterChange = useCallback((categories: string[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1); // Reset to first page on filter
  }, []);

  // Filter blogs based on search and categories
  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      // Search filter
      const matchesSearch = searchQuery === '' || 
        blog.frontmatter.title.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        (blog.frontmatter.category && selectedCategories.includes(blog.frontmatter.category));

      return matchesSearch && matchesCategory;
    });
  }, [blogs, searchQuery, selectedCategories]);

  // Pagination
  const totalPages = Math.ceil(filteredBlogs.length / BLOGS_PER_PAGE);
  const paginatedBlogs = useMemo(() => {
    const startIndex = (currentPage - 1) * BLOGS_PER_PAGE;
    const endIndex = startIndex + BLOGS_PER_PAGE;
    return filteredBlogs.slice(startIndex, endIndex);
  }, [filteredBlogs, currentPage]);

  // Handle page change
  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  return (
    <>
      {/* Featured Blog */}
      {featuredBlog && (
        <Section spacing="sm" className="bg-[#F5F5F5] pt-6 pb-6">
          <Container>
            <FeaturedBlog blog={featuredBlog} />
          </Container>
        </Section>
      )}

      {/* Search and Filter */}
      <Section spacing="sm" className="bg-[#F5F5F5] py-6">
        <Container>
          {/* Wrapper with relative positioning for dropdown */}
          <div className="relative">
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
              {/* Search */}
              <div className="flex-1">
                <BlogSearch onSearch={handleSearch} />
              </div>

              {/* Filter */}
              <div className="md:w-auto">
                <BlogFilter
                  selectedCategories={selectedCategories}
                  onFilterChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Blog Grid */}
      <Section spacing="lg" className="bg-[#F5F5F5]">
        <Container>
          {paginatedBlogs.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                {paginatedBlogs.map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="text-center py-12">
              <p className="font-noto text-lg text-gray-600">
                No blogs found matching your criteria.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
