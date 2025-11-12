import fs from 'fs';

const content = fs.readFileSync('all-page-titles-complete.csv', 'utf8');
const lines = content.split('\n');

const authPages = lines.filter(line => line.includes('help/api/authentication'));
console.log('All authentication page URLs:');
authPages.forEach(line => {
  const parts = line.split(',');
  console.log(`${parts[0]} (${parts[1]})`);
});