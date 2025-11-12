const fs = require('fs');

const content = fs.readFileSync('all-page-titles.csv', 'utf8');
const lines = content.split('\n').filter(l => l.trim() && !l.startsWith('URL'));

const titles = lines.map(line => {
  const parts = line.split('","');
  return {
    url: parts[0],
    title: parts[3] || '',
    length: (parts[3] || '').length
  };
}).filter(t => t.title);

const over60 = titles.filter(t => t.length > 60);

console.log('Titles over 60 chars in our CSV:');
over60.forEach(t => {
  console.log(`${t.length} chars: ${t.title}`);
  console.log(`URL: ${t.url}`);
  console.log('---');
});
console.log(`Total over 60: ${over60.length}`);

// Check specific URLs from the attached file
console.log('\nChecking specific URLs from attached file:');
const urlsToCheck = [
  'https://www.aiseoturbo.com/help/security',
  'https://www.aiseoturbo.com/help/troubleshooting',
  'https://www.aiseoturbo.com/help/security/two-factor-authentication'
];

urlsToCheck.forEach(url => {
  const match = titles.find(t => t.url.includes(url));
  if (match) {
    console.log(`${url}: ${match.length} chars - ${match.title}`);
  } else {
    console.log(`${url}: NOT FOUND in CSV`);
  }
});