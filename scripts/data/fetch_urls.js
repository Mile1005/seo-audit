import axios from 'axios';
import xml2js from 'xml2js';
import fs from 'fs';

const SITEMAP_URL = 'https://aiseoturbo.com/sitemap.xml';
const LANGUAGES = ['de', 'fr', 'en', 'it', 'es', 'id'];

async function fetchAndCreateUrlsCsv() {
  try {
    const response = await axios.get(SITEMAP_URL);
    const parser = new xml2js.Parser();
    const result = await parser.parseStringPromise(response.data);
    const englishUrls = result.urlset.url.map(u => u.loc[0]);

    const csvLines = ['url,lang'];
    englishUrls.forEach(url => {
      LANGUAGES.forEach(lang => {
        let newUrl;
        if (url === 'https://www.aiseoturbo.com/') {
          newUrl = lang === 'en' ? url : `https://www.aiseoturbo.com/${lang}/`;
        } else {
          const path = url.replace('https://www.aiseoturbo.com/', '');
          newUrl = lang === 'en' ? url : `https://www.aiseoturbo.com/${lang}/${path}`;
        }
        csvLines.push(`${newUrl},${lang}`);
      });
    });

    fs.writeFileSync('urls.csv', csvLines.join('\n'));
    console.log(`Added ${englishUrls.length * LANGUAGES.length} URLs to urls.csv (${englishUrls.length} English base URLs expanded to all languages)`);
  } catch (e) {
    console.error('Failed to fetch sitemap:', e.message);
  }
}

fetchAndCreateUrlsCsv();