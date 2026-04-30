// const BASE_URL = "http://makkah-travel-uk-admin.test/public/api";
// const BASE_URL_IMG = "http://makkah-travel-uk-admin.test/public/media";
// const BASE_URL_SVG = "http://makkah-travel-uk-admin.test/public/";
const BASE_URL = "https://admin.makkahtravel.co.uk/api";
const WEB_URL = "https://admin.makkahtravel.co.uk";
const BASE_URL_IMG = "https://admin.makkahtravel.co.uk/media";
const BASE_URL_SVG = "https://admin.makkahtravel.co.uk/";
const BASE_URL_SVG_PUBLIC = "https://admin.makkahtravel.co.uk";

const BASE_URL_Front = "https://makkahtravel.co.uk/";
const endpoints = {
  getPage: `${BASE_URL}/get-page`,
  getPageUrl: (page_url) => `${BASE_URL}/get-page?page_url=${page_url}`,
  sendEmail: `${BASE_URL}/send-email`,
  generalSettings: `${BASE_URL}/general-setting`,

  getUmrah: `${BASE_URL}/umrah-packages`,
  getHajj: `${BASE_URL}/hajj-packages`,
  umrahByType: (type) => `${BASE_URL}/umrah-packages?type=${type}`,
  umrahByslug: (slug) => `${BASE_URL}/umrah-packages?slug=${slug}`,
  umrahById: (id) => `${BASE_URL}/umrah-packages?package_ids=${id}`,
  umrahByStar: (stars, type) =>
    `${BASE_URL}/umrah-packages?type=${type}&stars=${stars}`,
  hajjByType: (type) => `${BASE_URL}/hajj-packages?type=${type}`,
  hajjByslug: (slug) => `${BASE_URL}/hajj-packages?slug=${slug}`,
  hajjById: (id) => `${BASE_URL}/hajj-packages?package_ids=${id}`,
  hajjByStar: (stars, type) =>
    `${BASE_URL}/hajj-packages?type=${type}&stars=${stars}`,
  blogpage: `${BASE_URL}/get-makkah-blog`,
  blogdeatilsgpage: (page_url) =>
    `${BASE_URL}/get-makkah-blog?page_url=${page_url}`,
  getAirport: `${BASE_URL}/airports`,
  getReviews: (ids) => `${BASE_URL}/reviews?review_ids=${ids}`,
  generateSitemap: `${BASE_URL}/generate-sitemap`,
  generatePostSitemap: `${BASE_URL}/generate-post-sitemap`,
};

export {
  BASE_URL,
  endpoints,
  BASE_URL_IMG,
  BASE_URL_SVG,
  BASE_URL_Front,
  WEB_URL,
  BASE_URL_SVG_PUBLIC,
};
