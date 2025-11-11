/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://avniproject.org',
  generateRobotsTxt: false, // We have custom robots.txt
  generateIndexSitemap: true,
  exclude: ['/404', '/api/*', '/_next/*', '/admin/*'],
  
  // Additional paths to include
  additionalPaths: async (config) => {
    const result = [];

    // Add blog posts (when they exist)
    // TODO: Fetch actual blog post slugs from CMS/markdown
    // const blogPosts = await getBlogPosts();
    // blogPosts.forEach((post) => {
    //   result.push({
    //     loc: `/blog/${post.slug}`,
    //     changefreq: 'monthly',
    //     priority: 0.7,
    //     lastmod: post.updatedAt || post.publishedAt,
    //   });
    // });

    // Add case studies (when they exist)
    // TODO: Fetch actual case study slugs from CMS/markdown
    // const caseStudies = await getCaseStudies();
    // caseStudies.forEach((study) => {
    //   result.push({
    //     loc: `/case-studies/${study.slug}`,
    //     changefreq: 'monthly',
    //     priority: 0.8,
    //     lastmod: study.publishedAt,
    //   });
    // });

    return result;
  },

  transform: async (config, path) => {
    // Custom priority and changefreq for different page types
    let priority = 0.7;
    let changefreq = 'weekly';

    // Homepage - highest priority
    if (path === '/') {
      priority = 1.0;
      changefreq = 'daily';
    }
    // Main navigation pages
    else if (path.includes('/solutions') || path.includes('/use-cases')) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    else if (path.includes('/services') || path.includes('/pricing')) {
      priority = 0.9;
      changefreq = 'weekly';
    }
    else if (path.includes('/about') || path.includes('/contact')) {
      priority = 0.8;
      changefreq: 'monthly';
    }
    // Blog and case studies
    else if (path.includes('/blog/')) {
      priority = 0.7;
      changefreq = 'monthly';
    }
    else if (path.includes('/case-studies/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Blog and case study index pages
    else if (path === '/blog' || path === '/case-studies') {
      priority = 0.9;
      changefreq = 'weekly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: new Date().toISOString(),
      // Add alternate language versions if needed
      // alternateRefs: [
      //   {
      //     href: `https://avniproject.org/es${path}`,
      //     hreflang: 'es',
      //   },
      // ],
    };
  },
};
