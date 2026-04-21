import { BASE_URL_Front, BASE_URL_IMG, endpoints } from "./apiEndpoints";

const SITE_TITLE = "Makkah Travel";
const SITE_DESCRIPTION = "Makkah Travel UK";

async function fetchJson(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function buildMetadata({
  title,
  description,
  keywords,
  image,
  canonicalPath,
  noindex = false,
}) {
  const canonical = canonicalPath
    ? new URL(canonicalPath.replace(/^\//, ""), BASE_URL_Front).toString()
    : BASE_URL_Front;

  return {
    title: title || SITE_TITLE,
    description: description || SITE_DESCRIPTION,
    keywords: keywords || "",
    alternates: { canonical },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      title: title || SITE_TITLE,
      description: description || SITE_DESCRIPTION,
      url: canonical,
      type: "website",
      images: image ? [image] : [],
    },
  };
}

export async function getPageMetadataBySlug(slug, canonicalPath) {
  const data = await fetchJson(endpoints.getPageUrl(encodeURIComponent(slug)));
  const page = data?.result;
  return buildMetadata({
    title: page?.browser_title,
    description: page?.meta_description,
    keywords: page?.meta_keywords,
    image: page?.image_url ? `${BASE_URL_IMG}/${page.image_url}` : "",
    canonicalPath,
  });
}

export async function getBlogDetailMetadata(pageUrl) {
  const data = await fetchJson(endpoints.blogdeatilsgpage(encodeURIComponent(pageUrl)));
  const blog = data?.blog;
  return buildMetadata({
    title: blog?.browser_title || blog?.title,
    description: blog?.meta_description,
    keywords: blog?.meta_keywords,
    image: blog?.banner_image_url ? `${BASE_URL_IMG}/${blog.banner_image_url}` : "",
    canonicalPath: `/blog/${pageUrl}`,
  });
}

export async function getPackageMetadata(type, slug) {
  const url = type === "umrah" ? endpoints.umrahByslug(encodeURIComponent(slug)) : endpoints.hajjByslug(encodeURIComponent(slug));
  const data = await fetchJson(url);
  const pkg = data?.result;
  return buildMetadata({
    title: pkg?.browser_title || pkg?.title,
    description: pkg?.meta_description,
    keywords: pkg?.meta_keywords,
    image: pkg?.image_url ? `${BASE_URL_IMG}/${pkg.image_url}` : "",
    canonicalPath: `/${type}/${slug}`,
    noindex: true,
  });
}
