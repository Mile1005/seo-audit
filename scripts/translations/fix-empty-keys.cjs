const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '../../messages');
const LOCALES = ['fr', 'it', 'es', 'id', 'de'];
const EN_PATH = path.join(MESSAGES_DIR, 'en.json');

const enData = JSON.parse(fs.readFileSync(EN_PATH, 'utf8'));

function getNestedValue(obj, keyPath) {
  return keyPath.split('.').reduce((current, key) => current && current[key], obj);
}

LOCALES.forEach(locale => {
  const emptyKeysPath = path.join(__dirname, `empty-keys-${locale}.json`);
  if (!fs.existsSync(emptyKeysPath)) {
    console.log(`No empty keys file for ${locale}`);
    return;
  }

  const emptyKeys = JSON.parse(fs.readFileSync(emptyKeysPath, 'utf8'));
  const localePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const localeData = JSON.parse(fs.readFileSync(localePath, 'utf8'));

  emptyKeys.forEach(key => {
    const enValue = getNestedValue(enData, key);
    if (enValue !== undefined) {
      // Set the value in localeData
      const keys = key.split('.');
      let current = localeData;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
      }
      current[keys[keys.length - 1]] = enValue;
      console.log(`Fixed ${locale}: ${key} = ${JSON.stringify(enValue)}`);
    }
  });

  fs.writeFileSync(localePath, JSON.stringify(localeData, null, 2));
  console.log(`Updated ${locale}.json`);
});