export default function robots() {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/api/', '/_next/', '/static/'],
        },
        sitemap: [
            'https://makkahtravel.co.uk/sitemap.xml',
            'https://makkahtravel.co.uk/post-sitemap.xml',
        ],
    };
}
