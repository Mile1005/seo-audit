const fs = require('fs');
const csv = fs.readFileSync('csv/all-page-titles-complete.csv', 'utf8');
const lines = csv.split('\n');
const urls = [
  'https://www.aiseoturbo.com/pricing',
  'https://www.aiseoturbo.com/blog', 
  'https://www.aiseoturbo.com/features',
  'https://www.aiseoturbo.com/help/security',
  'https://www.aiseoturbo.com/help/troubleshooting',
  'https://www.aiseoturbo.com/help/security/two-factor-authentication',
  'https://www.aiseoturbo.com/help/getting-started'
];

urls.forEach(url => {
  const line = lines.find(l => l.includes(url));
  if (line) {
    const parts = line.split('","');
    console.log(url + ': ' + (parts[3] || 'NO TITLE'));
  } else {
    console.log(url + ': NOT FOUND');
  }
});