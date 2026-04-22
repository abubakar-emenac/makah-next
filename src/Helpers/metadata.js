import {
  BASE_URL_Front,
  BASE_URL_IMG,
  BASE_URL_SVG_PUBLIC,
  endpoints,
} from "./apiEndpoints";

async function fetchJson(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 300 } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

function getSettingsArray(generalSettings) {
  return generalSettings?.result?.settings || generalSettings?.settings || [];
}

function resolveImageUrl(pathOrUrl) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${BASE_URL_IMG}/${pathOrUrl.replace(/^\/+/, "")}`;
}

function resolveFaviconUrl(pathOrUrl) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") return undefined;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${BASE_URL_SVG_PUBLIC}/${pathOrUrl.replace(/^\/+/, "")}`;
}

function extractGoogleVerification(contents) {
  if (typeof contents !== "string") return undefined;

  const strictMatch = contents.match(
    /name=["']google-site-verification["'][^>]*content=["']([^"']+)["']/i
  );
  if (strictMatch?.[1]) return strictMatch[1];

  const fallbackMatch = contents.match(
    /google-site-verification[^>]*content=["']([^"']+)["']/i
  );
  return fallbackMatch?.[1];
}

async function fetchGeneralSettings() {
  return fetchJson(endpoints.generalSettings);
}

async function fetchPageBySlug(slug) {
  const normalizedSlug = (slug || "").replace(/^\/+/, "").trim();
  const isHomeSlug = normalizedSlug === "" || normalizedSlug === "home";

  if (isHomeSlug) {
    return fetchJson(endpoints.getPage);
  }

  return fetchJson(endpoints.getPageUrl(encodeURIComponent(normalizedSlug)));
}

export function generatePageMetadata(pageData, generalSettings, slug = "") {
  const settings = getSettingsArray(generalSettings);

  const logoSetting = settings.find((s) => s.ref_name === "Website Logo");
  const indexSetting = settings.find((s) => s.ref_name === "Google Can Index?");
  const seoTagSetting = settings.find(
    (s) => s.ref_name === "SEO Meta Tags in Header"
  );

  const favicon = logoSetting?.contents?.favicon;
  const hasIndexSetting = Boolean(indexSetting);
  const canIndex = hasIndexSetting
    ? indexSetting?.contents?.enable_google_can_index === "1"
    : undefined;
  const googleVerification =
    seoTagSetting?.is_active && seoTagSetting?.contents
      ? extractGoogleVerification(seoTagSetting.contents)
      : undefined;

  const meta = pageData?.meta || {};
  const title = pageData?.browser_title || meta?.title || pageData?.title;
  const description = pageData?.meta_description || meta?.description;
  const keywords = pageData?.meta_keywords || meta?.keywords;

  const image =
    resolveImageUrl(pageData?.image_url) ||
    resolveImageUrl(pageData?.banner_image_url);

  const baseUrl = BASE_URL_Front.replace(/\/+$/, "");
  const normalizedSlug = (slug || "").replace(/^\/+/, "");
  const canonicalUrl =
    normalizedSlug === "" || normalizedSlug === "home"
      ? baseUrl
      : `${baseUrl}/${normalizedSlug}`;

  return {
    title,
    description,
    keywords,
    verification: googleVerification
      ? {
          google: googleVerification,
        }
      : undefined,
    icons: {
      icon: resolveFaviconUrl(favicon),
    },
    robots: hasIndexSetting
      ? {
          index: canIndex,
          follow: canIndex,
        }
      : undefined,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "website",
      images: image ? [image] : [],
    },
  };
}

export async function getPageMetadataBySlug(slug, canonicalPath) {
  const [pageResponse, generalSettings] = await Promise.all([
    fetchPageBySlug(slug),
    fetchGeneralSettings(),
  ]);
  const page = pageResponse?.result;
  return generatePageMetadata(page, generalSettings, canonicalPath || slug);
}

export async function getBlogDetailMetadata(pageUrl) {
  const [blogResponse, generalSettings] = await Promise.all([
    fetchJson(endpoints.blogdeatilsgpage(encodeURIComponent(pageUrl))),
    fetchGeneralSettings(),
  ]);
  const blog = blogResponse?.blog;
  return generatePageMetadata(blog, generalSettings, `blog/${pageUrl}`);
}

export async function getPackageMetadata(type, slug) {
  const url =
    type === "umrah"
      ? endpoints.umrahByslug(encodeURIComponent(slug))
      : endpoints.hajjByslug(encodeURIComponent(slug));

  const [packageResponse, generalSettings] = await Promise.all([
    fetchJson(url),
    fetchGeneralSettings(),
  ]);
  const pkg = packageResponse?.result;
  return generatePageMetadata(pkg, generalSettings, `${type}/${slug}`);
}

export async function getNotFoundMetadata() {
  const [notFoundResponse, generalSettings] = await Promise.all([
    fetchJson(endpoints.getPageUrl("404")),
    fetchGeneralSettings(),
  ]);
  const notFoundPage = notFoundResponse?.result;
  return generatePageMetadata(notFoundPage, generalSettings, "404");
}
