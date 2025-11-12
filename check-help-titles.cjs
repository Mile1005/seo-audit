const fs = require('fs');
const csv = fs.readFileSync('all-page-titles.csv', 'utf8');
const lines = csv.split('\n').filter(l => l.trim());
const helpTitles = lines.filter(l => l.includes('/help/'));
console.log('Help pages in our CSV: ' + helpTitles.length);
helpTitles.slice(0, 5).forEach(line => {
  const parts = line.split('","');
  console.log(parts[0] + ' -> ' + (parts[3] || 'NO TITLE'));
});