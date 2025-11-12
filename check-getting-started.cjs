const fs = require('fs');
const csv = fs.readFileSync('csv/all-page-titles-complete.csv', 'utf8');
const lines = csv.split('\n').filter(l => l.trim());
const matches = lines.filter(l => l.includes('getting-started') && !l.includes('dashboard-setup') && !l.includes('first-audit') && !l.includes('quick-start') && !l.includes('seo-scores'));
console.log('Getting started matches: ' + matches.length);
matches.slice(0, 3).forEach(line => {
  const parts = line.split('","');
  console.log(parts[1] + ': ' + (parts[3] || 'NO TITLE'));
});