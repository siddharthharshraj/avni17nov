/**
 * Featured Blog Utility
 * Dynamically fetches the LATEST FEATURED blog for navigation dropdown
 * Returns the most recent blog marked with featured: true
 * Falls back to latest blog if no featured blog exists
 */

import { getAllBlogs } from './markdown';

export async function getFeaturedBlogForNav() {
  try {
    const blogs = await getAllBlogs();
    
    // First, try to find the latest blog marked as featured
    const featuredBlogs = blogs.filter(blog => blog.frontmatter.featured === true);
    
    // Use the most recent featured blog, or fall back to the most recent blog
    const selectedBlog = featuredBlogs.length > 0 ? featuredBlogs[0] : blogs[0];
    
    if (!selectedBlog) {
      return null;
    }
    
    // Extract image from featuredImage object or fallback to image field
    let image = '/images/blog-placeholder.jpg';
    if (selectedBlog.frontmatter.featuredImage) {
      // Handle featuredImage object: { src: '...', alt: '...' }
      if (typeof selectedBlog.frontmatter.featuredImage === 'object') {
        image = selectedBlog.frontmatter.featuredImage.src || image;
      } else if (typeof selectedBlog.frontmatter.featuredImage === 'string') {
        // Handle string directly
        image = selectedBlog.frontmatter.featuredImage;
      }
    } else if (selectedBlog.frontmatter.image) {
      // Fallback to image field
      image = selectedBlog.frontmatter.image;
    }
    
    const result = {
      title: selectedBlog.frontmatter.title,
      link: `/blog/${selectedBlog.slug}`,
      image,
    };
    
    console.log('✅ Featured blog for nav:', {
      title: result.title,
      image: result.image,
      slug: selectedBlog.slug,
    });
    
    return result;
  } catch (error) {
    console.error('Error fetching featured blog:', error);
    return null;
  }
}
