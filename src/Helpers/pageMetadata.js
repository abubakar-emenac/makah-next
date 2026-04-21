import { BASE_URL_IMG, endpoints } from "./apiEndpoints";

export async function getPageMetadataBySlug(slug) {
  try {
    const res = await fetch(endpoints.getPageUrl(slug), { next: { revalidate: 300 } });
    const data = await res.json();
    const page = data?.result;
    if (!page) return {};
    const imageUrl = page.image_url ? `${BASE_URL_IMG}/${page.image_url}` : undefined;
    return {
      title: page.browser_title || "Makkah Travel",
      description: page.meta_description || "Makkah Travel UK",
      openGraph: {
        title: page.browser_title || "Makkah Travel",
        description: page.meta_description || "Makkah Travel UK",
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    return {};
  }
}
