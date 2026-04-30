import { api } from '../utils/api';

export default async function sitemap() {
    const baseUrl = 'https://makkahtravel.co.uk';

    try {
        // 1. Fetch all necessary data
        const [settings, umrahData, hajjData, blogData] = await Promise.all([
            api.getSettings(),
            api.getUmrahPackages(),
            api.getHajjPackages(),
            api.getBlogs(),
        ]);

        // 2. Map static pages from navigation
        const navPages = settings?.result?.navigation_bar || [];
        const staticRoutes = navPages
            .filter((page) => page.page_url && !page.page_url.startsWith('http'))
            .map((page) => ({
                url: `${baseUrl}${page.page_url === 'home' ? '' : `/${page.page_url}`}`,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority: page.page_url === 'home' ? 1.0 : 0.8,
            }));

        // Add homepage explicitly if not present
        if (!staticRoutes.some(route => route.url === baseUrl || route.url === `${baseUrl}/`)) {
            staticRoutes.unshift({
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            });
        }

        // 3. Map Umrah Packages
        // Handle different possible API structures
        const rawUmrah = umrahData?.result?.data || umrahData?.result?.packages?.data || umrahData?.result || [];
        const umrahRoutes = (Array.isArray(rawUmrah) ? rawUmrah : []).map((pkg) => ({
            url: `${baseUrl}/umrah/${pkg.page_url}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        // 4. Map Hajj Packages
        const rawHajj = hajjData?.result?.data || hajjData?.result?.packages?.data || hajjData?.result || [];
        const hajjRoutes = (Array.isArray(rawHajj) ? rawHajj : []).map((pkg) => ({
            url: `${baseUrl}/hajj/${pkg.page_url}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.7,
        }));

        // 5. Map Blog Posts
        const featuredBlogs = blogData?.featured_blogs || [];
        const latestBlogs = blogData?.latest_blogs || [];
        const allBlogs = [...featuredBlogs, ...latestBlogs];
        
        // Remove duplicates if any (by id or page_url)
        const uniqueBlogs = Array.from(new Map(allBlogs.map(blog => [blog.page_url, blog])).values());

        const blogRoutes = uniqueBlogs.map((blog) => ({
            url: `${baseUrl}/blog/${blog.page_url}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.6,
        }));

        return [
            ...staticRoutes,
            ...umrahRoutes,
            ...hajjRoutes,
            ...blogRoutes,
        ];
    } catch (error) {
        console.error('Error generating sitemap:', error);
        // Return at least the homepage if everything fails
        return [
            {
                url: baseUrl,
                lastModified: new Date(),
                changeFrequency: 'daily',
                priority: 1.0,
            },
        ];
    }
}
