// const BASE_URL = 'http://makkah-travel-uk-admin.test/public/api'
const BASE_URL = "https://makkahtravel.co.uk/administrator/api";
const BASE_URL_IMG = "https://makkahtravel.co.uk/administrator/api/media";
const endpoints = {
  getPage: `${BASE_URL}/get-page`,
  getPageUrl: (page_url) => `${BASE_URL}/get-page?page_url=${page_url}`,
  sendEmail: `${BASE_URL}/send-email`,
  generalSettings: `${BASE_URL}/general-setting`,
};

export { BASE_URL, endpoints, BASE_URL_IMG, BASE_URL_SVG };
