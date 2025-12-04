const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../../messages');
const LOCALES = ['fr', 'it', 'es', 'id', 'de'];
const EN_PATH = path.join(MESSAGES_DIR, 'en.json');

const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));

function flattenKeys(obj, prefix = '') {
  let keys = {};
  for (const key in obj) {
    const newKey = prefix ? `${prefix}.${key}` : key;
    if (typeof obj[key] === 'object' && obj[key] !== null) {
      Object.assign(keys, flattenKeys(obj[key], newKey));
    } else {
      keys[newKey] = obj[key];
    }
  }
  return keys;
}

function setNestedValue(obj, keyPath, value) {
  const keys = keyPath.split('.');
  let current = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {};
    current = current[keys[i]];
  }
  current[keys[keys.length - 1]] = value;
}

const enKeys = flattenKeys(enData);

LOCALES.forEach(locale => {
  const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));
  const localeKeys = flattenKeys(localeData);

  let added = 0;
  Object.keys(enKeys).forEach(key => {
    if (!(key in localeKeys)) {
      setNestedValue(localeData, key, enKeys[key]);
      added++;
    }
  });

  fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2));
  console.log(`Added ${added} missing keys to ${locale}.json`);
});