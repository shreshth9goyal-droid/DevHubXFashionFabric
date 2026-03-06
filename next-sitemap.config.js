/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fashionfabric.info',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/admin/*', '/api/*'],
}
