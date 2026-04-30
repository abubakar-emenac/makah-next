import { api } from '../../utils/api';

/**
 * Route handler for /post-sitemap.xml
 * Generates a dedicated XML sitemap for blog posts.
 */
export async function GET() {
    const baseUrl = 'https://makkahtravel.co.uk';
    
    try {
        const blogData = await api.getBlogs();
        const featuredBlogs = blogData?.featured_blogs || [];
        const latestBlogs = blogData?.latest_blogs || [];
        const allBlogs = [...featuredBlogs, ...latestBlogs];
        
        // Remove duplicates
        const uniqueBlogs = Array.from(new Map(allBlogs.map(blog => [blog.page_url, blog])).values());

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${uniqueBlogs
            .map((post) => {
                const slug = post.page_url || post.id;
                return `
    <url>
      <loc>${baseUrl}/blog/${slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.6</priority>
    </url>`;
            })
            .join('')}
</urlset>`;

        return new Response(sitemap, {
            headers: {
                'Content-Type': 'application/xml',
                'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=3600',
            },
        });
    } catch (error) {
        console.error('Error generating post-sitemap:', error);
        return new Response('Error generating sitemap', { status: 500 });
    }
}
