import { NextResponse } from "next/server";

const API_BASE = "https://admin.makkahtravel.co.uk/api";

const STATIC_ROUTES = new Set([
  "",
  "home",
  "about-us",
  "contact-us",
  "terms-and-conditions",
  "privacy-policy",
  "cookies-policy",
  "customization",
  "customise-your-package",
  "hajj-and-umrah-visa",
  "thank-you",
  "blog",
  "_not-found",
]);

function isSuccessfulStatus(value) {
  return value === true || value === 1 || value === "1";
}

async function fetchJson(url) {
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

async function isValidDynamicPath(pathname) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) return true;
  if (parts.length > 2) return false;

  if (parts.length === 1) {
    if (STATIC_ROUTES.has(parts[0])) return true;
    const slug = encodeURIComponent(parts[0]);
    const data = await fetchJson(`${API_BASE}/get-page?page_url=${slug}`);
    return Boolean(data?.result) && data?.success !== false;
  }

  const [section, slug] = parts;
  const encodedSlug = encodeURIComponent(slug);

  if (section === "blog") {
    const data = await fetchJson(
      `${API_BASE}/get-makkah-blog?page_url=${encodedSlug}`,
    );
    return Boolean(data?.blog);
  }

  if (section === "hajj" || section === "umrah") {
    const endpoint = section === "hajj" ? "hajj-packages" : "umrah-packages";
    const data = await fetchJson(`${API_BASE}/${endpoint}?slug=${encodedSlug}`);
    return Boolean(data?.result) && isSuccessfulStatus(data?.status);
  }

  return false;
}

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next") || pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  const isValid = await isValidDynamicPath(pathname);
  if (isValid) return NextResponse.next();

  const notFoundUrl = new URL("/_not-found", req.url);
  return NextResponse.rewrite(notFoundUrl, { status: 404 });
}

export const config = {
  matcher: ["/((?!.*\\..*).*)"],
};
