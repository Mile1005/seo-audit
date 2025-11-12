const fs = require('fs');
const csv = fs.readFileSync('csv/all-page-titles-complete.csv', 'utf8');
const lines = csv.split('\n').filter(l => l.trim());
const longTitles = lines.filter(l => {
  const parts = l.split('","');
  const title = parts[3] || '';
  return title.length > 60;
});
console.log('Titles over 60 chars in complete CSV: ' + longTitles.length);
if (longTitles.length > 0) {
  longTitles.slice(0, 3).forEach(line => {
    const parts = line.split('","');
    console.log('Length: ' + (parts[3] || '').length + ' - ' + (parts[3] || ''));
  });
}