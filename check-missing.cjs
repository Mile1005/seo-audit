const fs = require('fs');

const en = JSON.parse(fs.readFileSync('messages/en.json', 'utf8'));
const de = JSON.parse(fs.readFileSync('messages/de.json', 'utf8'));

function flatten(obj, prefix='', out={}) {
  for (const [k, v] of Object.entries(obj || {})) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = String(v);
  }
  return out;
}

function findCta(obj, path='') {
  for (const [k, v] of Object.entries(obj || {})) {
    const currentPath = path ? `${path}.${k}` : k;
    if (k === 'cta') {
      console.log(`${currentPath}:`, v);
    } else if (v && typeof v === 'object' && !Array.isArray(v)) {
      findCta(v, currentPath);
    }
  }
}

console.log('CTA sections in English featurePages:');
findCta(en.featurePages);

console.log('\nCTA sections in German featurePages:');
findCta(de.featurePages);

const enFlat = flatten(en);
const deFlat = flatten(de);
const missing = Object.keys(enFlat).filter(k => !(k in deFlat));

console.log('\nMissing in de:', missing.filter(k => k.includes('cta')));