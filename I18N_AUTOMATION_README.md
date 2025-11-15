# AISEOTurbo Internationalization Automation

This script automates the complete internationalization process using the proven 5-step formula.

## 🚀 Quick Start

```bash
# Internationalize a component automatically
pnpm i18n:auto app/[locale]/help/troubleshooting/new-page/NewPageContent.tsx

# Or run directly
node scripts/i18n-automate.js app/[locale]/help/troubleshooting/new-page/NewPageContent.tsx
```

## 🎯 What It Does

The automation script implements the **5-Step Internationalization Formula**:

### 1. **Content Detection & Analysis**
- Scans React components for hardcoded strings
- Identifies JSX text and string literals that need translation
- Filters out code, imports, and already-translated content
- Extracts component namespace automatically

### 2. **Component Transformation**
- Replaces hardcoded strings with `t()` function calls
- Generates consistent translation keys
- Ensures `useTranslations` import is present
- Maintains code formatting and structure

### 3. **English Source Updates**
- Adds new translation keys to `messages/en.json`
- Creates proper nested structure based on namespace
- Maintains JSON formatting and consistency

### 4. **Bulk Translation via AI**
- Uses OpenAI GPT-4 for high-quality translations
- Translates to all supported languages: `de`, `it`, `id`, `es`, `fr`
- Maintains exact JSON structure and key names
- Handles translation context and terminology

### 5. **Language File Updates**
- Updates all language files with new translations
- Preserves existing translations
- Maintains consistent JSON structure across all files

## 📋 Prerequisites

### Environment Variables
```bash
# Add to your .env.local file
OPENAI_API_KEY=your_openai_api_key_here
```

### Dependencies
```bash
pnpm add @babel/parser @babel/traverse @babel/generator @babel/types openai
```

## 🛠️ Supported Languages

- 🇩🇪 **German** (`de`)
- 🇮🇹 **Italian** (`it`)
- 🇮🇩 **Indonesian** (`id`)
- 🇪🇸 **Spanish** (`es`)
- 🇫🇷 **French** (`fr`)

## 📝 Usage Examples

### Basic Component Internationalization
```bash
# Internationalize a help page component
pnpm i18n:auto app/[locale]/help/getting-started/QuickStartContent.tsx

# Internationalize a feature component
pnpm i18n:auto components/features/PricingCard.tsx
```

### Batch Processing Multiple Components
```bash
# Process multiple components (requires custom script)
find app/[locale]/help -name "*.tsx" -exec pnpm i18n:auto {} \;
```

## 🔧 How It Works

### AST-Based Analysis
The script uses Babel's AST parser to:
- Identify hardcoded strings in JSX and JavaScript
- Distinguish between translatable content and code
- Preserve component structure and logic

### Smart Key Generation
- Creates readable, consistent translation keys
- Avoids conflicts with existing keys
- Follows naming conventions automatically

### AI-Powered Translation
- Uses GPT-4 for context-aware translations
- Maintains technical terminology accuracy
- Handles complex UI text and instructions

### Quality Assurance
- Validates JSON structure after each update
- Ensures namespace consistency
- Provides detailed logging and error reporting

## ⚠️ Important Notes

### What Gets Translated
- ✅ JSX text content (`<p>Hello World</p>`)
- ✅ String literals in component logic
- ✅ User-facing text and labels

### What Doesn't Get Translated
- ❌ Import statements and module paths
- ❌ CSS class names and IDs
- ❌ Code comments and variable names
- ❌ Already translated `t()` calls
- ❌ Dynamic content with interpolation

### Safety Features
- **Non-destructive**: Never overwrites existing translations
- **Validation**: Runs type checking after updates
- **Backup**: Creates git commits for each major step
- **Error recovery**: Stops on errors with detailed messages

## 🏗️ Architecture

```
I18nAutomator
├── detectUntranslatedContent()    # AST analysis
├── transformComponent()           # Code transformation
├── updateEnglishSource()          # en.json updates
├── bulkTranslate()                # AI translation
├── updateLanguageFiles()          # Language file updates
└── Helper methods for key generation, namespace extraction, etc.
```

## 🔍 Troubleshooting

### Common Issues

**"No untranslated content found"**
- Component may already be fully internationalized
- Check if strings are already wrapped in `t()` calls

**"Translation API error"**
- Verify `OPENAI_API_KEY` is set correctly
- Check API quota and billing status

**"Namespace not found"**
- Ensure component follows expected directory structure
- Manually specify namespace if needed

### Manual Override
If automation fails, you can always fall back to the manual 5-step process documented in `FORMULA_FOR_ACCURATE_TRANSLATING`.

## 📊 Metrics & Quality

### Translation Quality
- **Context Awareness**: AI understands UI/UX context
- **Terminology Consistency**: Maintains technical terms across languages
- **Cultural Adaptation**: Handles locale-specific formatting

### Performance
- **Batch Processing**: Translates entire components at once
- **Incremental Updates**: Only processes changed content
- **Fast Execution**: ~30 seconds per component (including translations)

## 🚀 Future Enhancements

### Planned Features
- **Interactive Mode**: Step-by-step confirmation for complex components
- **Translation Memory**: Reuse existing translations for similar strings
- **Quality Review**: Human-in-the-loop validation for critical content
- **Batch Processing**: Process entire directories automatically
- **Custom Dictionaries**: Domain-specific terminology management

### Integration Possibilities
- **GitHub Actions**: Automated PR processing
- **VS Code Extension**: IDE-integrated translation
- **Webhook Integration**: Real-time translation updates
- **CMS Integration**: Content management system sync

## 🤝 Contributing

When adding new features:
1. Follow the existing 5-step formula structure
2. Add comprehensive error handling
3. Include detailed logging
4. Update this documentation
5. Test with multiple component types

## 📞 Support

For issues or questions:
1. Check the troubleshooting section above
2. Review the manual formula in `FORMULA_FOR_ACCURATE_TRANSLATING`
3. Create an issue with component path and error details

---

**Remember**: This automation script implements the proven manual process. For complex components or edge cases, the manual approach remains the most reliable method.