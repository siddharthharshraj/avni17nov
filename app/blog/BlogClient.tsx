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

  // Handle category filter
  const handleCategoryChange = useCallback((categories: string[]) => {
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
            <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center mb-6">
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

            {/* Results Count and Active Filters */}
            <div className="space-y-4">
              {/* Count */}
              <p className="font-noto text-base text-gray-600">
                Showing {filteredBlogs.length} blog{filteredBlogs.length === 1 ? '' : 's'}
                {(searchQuery || selectedCategories.length > 0) && (
                  <> with active filters</>
                )}
              </p>

              {/* Active Filters */}
              {(searchQuery || selectedCategories.length > 0) && (
                <div className="flex flex-wrap items-center gap-2">
                  {/* Search Query Badge */}
                  {searchQuery && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#419372] text-white rounded-full text-sm font-anek">
                      <span>Search: "{searchQuery}"</span>
                      <button
                        onClick={() => handleSearch('')}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        aria-label="Clear search"
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  )}

                  {/* Category Badges */}
                  {selectedCategories.map((category) => (
                    <div
                      key={category}
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FF8854] text-white rounded-full text-sm font-anek"
                    >
                      <span>{category}</span>
                      <button
                        onClick={() => handleCategoryChange(selectedCategories.filter(c => c !== category))}
                        className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                        aria-label={`Remove ${category} filter`}
                      >
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                    </div>
                  ))}

                  {/* Clear All Button */}
                  <button
                    onClick={() => {
                      handleSearch('');
                      handleCategoryChange([]);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 text-gray-700 rounded-full text-sm font-anek font-medium hover:bg-gray-50 transition-colors"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                    Clear All
                  </button>
                </div>
              )}
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
