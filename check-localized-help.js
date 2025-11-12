import fs from 'fs';

const csv = fs.readFileSync('all-page-titles-complete.csv', 'utf8');
const lines = csv.split('\n');

const helpPages = [
  'help/security/two-factor-authentication',
  'help/features/site-crawler',
  'help/security/privacy',
  'help/security/gdpr',
  'help/api/webhooks',
  'help/billing/upgrade-plan',
  'help/billing/invoices',
  'help/features/ai-assistant',
  'help/billing/cancellation',
  'help/billing/payment-methods',
  'help/security/best-practices',
  'help/features/competitor-analysis'
];

console.log('Checking localized titles for additional help pages:');
helpPages.forEach(page => {
  console.log(`\n=== ${page} ===`);
  const matches = lines.filter(line => line.includes(page));
  if (matches.length === 0) {
    console.log('NO ENTRIES FOUND');
  } else {
    matches.slice(0, 6).forEach(match => { // Show first 6 matches
      const parts = match.split(',');
      if (parts.length >= 8) {
        console.log(`${parts[1]}: ${parts[6].replace(/"/g, '')}`);
      }
    });
    if (matches.length > 6) console.log(`... and ${matches.length - 6} more`);
  }
});