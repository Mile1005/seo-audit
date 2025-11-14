const fs = require('fs');
const csv = fs.readFileSync('csv/all-page-titles-complete.csv', 'utf8');
const lines = csv.split('\n').filter(line => line.trim());

const titles = new Map();
const descriptions = new Map(); // Assuming we have descriptions too

lines.forEach((line, index) => {
  if (index === 0) return; // skip header
  const cols = line.split('","').map(col => col.replace(/^"|"$/g, ''));
  if (cols.length >= 4) {
    const url = cols[0];
    const locale = cols[1];
    const title = cols[3];

    const key = `${locale}:${title}`;
    if (!titles.has(key)) {
      titles.set(key, []);
    }
    titles.get(key).push(url);
  }
});

console.log('Duplicate Titles by Locale:');
titles.forEach((urls, key) => {
  if (urls.length > 1) {
    console.log(`\n${key} (${urls.length} pages):`);
    urls.forEach(url => console.log(`  ${url}`));
  }
});

console.log('\nTotal unique title-locale combinations:', titles.size);