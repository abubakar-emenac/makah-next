// const BASE_URL = 'http://makkah-travel-uk-admin.test/public/api'
const BASE_URL = "https://admin.makkahtravel.co.uk/api";
const BASE_URL_IMG = "https://admin.makkahtravel.co.uk/media";
const BASE_URL_SVG = "https://admin.makkahtravel.co.uk/";

const endpoints = {
  getPage: `${BASE_URL}/get-page`,
  getPageUrl: (page_url) => `${BASE_URL}/get-page?page_url=${page_url}`,
  sendEmail: `${BASE_URL}/send-email`,
  generalSettings: `${BASE_URL}/general-setting`,
};

export { BASE_URL, endpoints, BASE_URL_IMG, BASE_URL_SVG };
