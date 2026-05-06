import { endpoints } from "../Helpers/apiEndpoints";

/**
 * Central fetch wrapper for Next.js Data Fetching with Tags
 */
async function fetchAPI(url, tags = [], revalidate = 3600) {
  try {
    const res = await fetch(url, {
      next: {
        tags: tags,
        revalidate: revalidate,
      },
    });

    if (!res.ok) {
      // console.error(`Fetch failed for ${url}: ${res.statusText}`);
      return null;
    }

    return await res.json();
  } catch (error) {
    // console.error(`Fetch error for ${url}:`, error);
    return null;
  }
}

async function fetchText(url, tags = [], revalidate = 3600) {
  try {
    const res = await fetch(url, {
      next: {
        tags: tags,
        revalidate: revalidate,
      },
    });

    if (!res.ok) {
      return null;
    }

    return await res.text();
  } catch (error) {
    return null;
  }
}

export const api = {
  // General Settings
  getSettings: () => fetchAPI(endpoints.generalSettings, ["settings"]),

  // Pages
  getPage: () => fetchAPI(endpoints.getPage, ["pages"]),
  getPageBySlug: (slug) => fetchAPI(endpoints.getPageUrl(slug), ["pages"]),

  // Umrah Packages
  getUmrahPackages: () => fetchAPI(endpoints.getUmrah, ["umrah-packages"]),
  getUmrahBySlug: (slug) => fetchAPI(endpoints.umrahByslug(slug), ["umrah-packages"]),
  getUmrahById: (id) => fetchAPI(endpoints.umrahById(id), ["umrah-packages"]),
  getUmrahByType: (type) => fetchAPI(endpoints.umrahByType(type), ["umrah-packages"]),
  getUmrahByStar: (stars, type) => fetchAPI(endpoints.umrahByStar(stars, type), ["umrah-packages"]),

  // Hajj Packages
  getHajjPackages: () => fetchAPI(endpoints.getHajj, ["hajj-packages"]),
  getHajjBySlug: (slug) => fetchAPI(endpoints.hajjByslug(slug), ["hajj-packages"]),
  getHajjById: (id) => fetchAPI(endpoints.hajjById(id), ["hajj-packages"]),
  getHajjByType: (type) => fetchAPI(endpoints.hajjByType(type), ["hajj-packages"]),
  getHajjByStar: (stars, type) => fetchAPI(endpoints.hajjByStar(stars, type), ["hajj-packages"]),

  // Blogs
  getBlogs: (page) => fetchAPI(endpoints.blogpage(page), ["blogs"]),
  getBlogDetails: (slug) => fetchAPI(endpoints.blogdeatilsgpage(slug), ["blogs"]),

  // Others
  getAirports: () => fetchAPI(endpoints.getAirport, ["settings"]),
  getReviews: (ids) => fetchAPI(endpoints.getReviews(ids), ["reviews"]),
  getGenerateSitemap: () => fetchText(endpoints.generateSitemap, ["sitemap"]),
  getGeneratePostSitemap: () => fetchText(endpoints.generatePostSitemap, ["sitemap"]),
};

export default api;
