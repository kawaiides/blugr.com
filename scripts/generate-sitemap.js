const fs = require('fs');
const { getUrls } = require('../lib/getUrls'); // Your data fetching logic

async function generate() {
  const writer = fs.createWriteStream('public/sitemap.xml');
  writer.write('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

  const urls = await getUrls(); // Fetch URLs efficiently
  urls.forEach(url => {
    writer.write(`<url><loc>https://example.com/${url}</loc></url>\n`);
  });

  writer.write('</urlset>');
  writer.end();
}

generate().catch(console.error);