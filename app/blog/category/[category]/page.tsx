/**
 * Blog Category Page
 * Displays all blogs in a specific category
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import BlogCard from '@/components/blog/BlogCard';
import { getBlogsByCategory, getAllBlogCategories } from '@/lib/markdown';
import { getCategoryBySlug, getAllCategories } from '@/lib/categories';

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} - Avni Blog`,
    description: category.description,
    openGraph: {
      title: `${category.name} - Avni Blog`,
      description: category.description,
      url: `/blog/category/${category.slug}`,
    },
  };
}

// Generate static params for all categories
export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({ category: cat.slug }));
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);

  if (!category) {
    notFound();
  }

  const blogs = await getBlogsByCategory(category.name);

  return (
    <>
      <Header />

      <main className="min-h-screen bg-[#F5F5F5] pt-[72px]">
        {/* Hero Section */}
        <Section spacing="sm" className="bg-white py-12">
          <Container>
            <div className="text-center max-w-4xl mx-auto">
              <div className="inline-block mb-4">
                <span
                  className="px-4 py-2 rounded-full text-white font-anek font-semibold text-sm uppercase"
                  style={{ backgroundColor: category.color }}
                >
                  {category.name}
                </span>
              </div>
              <h1 className="font-anek font-bold text-4xl md:text-5xl lg:text-6xl text-[#0b2540] mb-4">
                {category.name}
              </h1>
              <p className="font-noto text-lg md:text-xl text-gray-700">
                {category.description}
              </p>
              <p className="font-noto text-base text-gray-600 mt-4">
                {blogs.length} {blogs.length === 1 ? 'post' : 'posts'}
              </p>
            </div>
          </Container>
        </Section>

        {/* Blog Grid */}
        <Section spacing="lg" className="bg-[#F5F5F5]">
          <Container>
            {blogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => (
                  <BlogCard key={blog.slug} blog={blog} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No posts found in this category yet.
                </p>
              </div>
            )}
          </Container>
        </Section>
      </main>

      <Footer />
    </>
  );
}
