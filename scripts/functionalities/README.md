# Functionalities Scripts

This folder contains specialized automation scripts for various project functionalities.

## I18n Automation Scripts

### `i18n-folder-scanner.js` - **NEW FREE SCANNER**

**Purpose:** Free page-focused internationalization scanner using Perplexity AI (no OpenAI costs).

**Features:**

- Scans specific page folders (not entire app)
- Extracts only user-facing text content (filters out CSS, code, styling)
- Uses **Perplexity AI** for free translations (no API keys needed)
- Generates translation keys and namespaces
- Outputs ready-to-copy JSON file with all translations
- Supports: German (de), French (fr), Italian (it), Spanish (es), Indonesian (id)

**Usage:**

```bash
# Scan a specific page folder
node scripts/functionalities/i18n-folder-scanner.js /help/security/two-factor-authentication

# Examples:
node scripts/functionalities/i18n-folder-scanner.js /pricing
node scripts/functionalities/i18n-folder-scanner.js /dashboard/settings
```

**What it processes:**

- `layout.tsx` - Layout components
- `page.tsx` - Main page content
- `page-translate.tsx` - Translation-specific content
- Any other `.tsx/.jsx/.ts/.js` files in the page folder

**Smart filtering:**

- ✅ Extracts: User-facing text, titles, descriptions, labels
- ❌ Ignores: CSS classes, styling, code, URLs, technical content

**Output:**

- Creates `translations-ready-to-copy.json` with all translations
- Ready-to-copy format for easy integration
- Includes usage instructions

**Free Translation Process:**

1. Scans only the specified page folder
2. Extracts user-facing text (not CSS/styling/code)
3. Generates unique translation keys
4. Calls Perplexity AI for each translation (free)
5. Organizes by namespace and component
6. Outputs complete translation file

### `i18n-automate-simple.js`

**Purpose:** Automated internationalization of React components using regex-based string detection.

**Usage:**

```bash
# Direct execution only
node scripts/functionalities/i18n-automate-simple.js path/to/component.tsx
```

**Features:**

- Detects hardcoded strings in React components
- Transforms components to use `t()` function calls
- Updates English source messages (`messages/en.json`)
- Generates mock translations for all supported languages
- Updates all language files with consistent structure

**Supported Languages:** German (de), Italian (it), Indonesian (id), Spanish (es), French (fr)

### `i18n-automate.js`

**Purpose:** Full production-ready internationalization automation with AST parsing and AI translation.

**Requirements:**

- Babel dependencies: `@babel/parser`, `@babel/traverse`, `@babel/generator`, `@babel/types`
- OpenAI API key for real translations

**Usage:**

```bash
node scripts/functionalities/i18n-automate.js path/to/component.tsx
```

**Features:**

- Advanced AST parsing for complex JSX structures
- Real AI-powered translations via OpenAI GPT-4
- Comprehensive error handling and validation
- Production-ready with proper dependency management

## Automation Process

Both scripts implement the proven 5-step internationalization formula:

1. **Content Detection** - Scans components for untranslated strings
2. **Component Transformation** - Replaces hardcoded strings with `t()` calls
3. **English Source Updates** - Adds new keys to `messages/en.json`
4. **Bulk Translation** - Generates translations for all languages
5. **Language File Updates** - Updates all language files consistently

## Example Output

**Before:**

```tsx
<h1>Welcome to our platform</h1>
<p>This is a test component</p>
```

**After:**

```tsx
<h1>{t('welcome_to_our_platf_0')}</h1>
<p>{t('this_is_a_test_compo_1')}</p>
```

With corresponding entries added to all language files.</content>
<parameter name="filePath">c:\Users\Mile\Desktop\seo-audit-fresh\scripts\functionalities\README.md
