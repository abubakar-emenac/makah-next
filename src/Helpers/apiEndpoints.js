const BASE_URL = 'http://makkah-travel-uk-admin.test/public/api'
const BASE_URL_IMG = 'http://makkah-travel-uk-admin.test/public/media'
const endpoints = {
    getPage: `${BASE_URL}/get-page`,
    getPageUrl : (page_url)=> `${BASE_URL}/get-page?page_url=${page_url}`
}

export {BASE_URL, endpoints,BASE_URL_IMG}