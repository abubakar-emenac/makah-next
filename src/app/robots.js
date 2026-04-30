export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/'],
        },
        sitemap: [
            'https://makkahtravel.co.uk/sitemap.xml',
            'https://makkahtravel.co.uk/post-sitemap.xml',
        ],
    };
}
