# next-intl Usage Guide for AI SEO Turbo

## Quick Reference for Developers

### Importing Translation Hook

```typescript
// For client components
'use client';
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('common'); // namespace from messages/en.json
  return <button>{t('save')}</button>; // "Save"
}
```

```typescript
// For server components
import { getTranslations } from 'next-intl/server';

export default async function MyPage() {
  const t = await getTranslations('common');
  return <h1>{t('loading')}</h1>; // "Loading..."
}
```

### Navigation

```typescript
'use client';
// Use i18n-aware Link component instead of next/link
import { Link } from '@/lib/navigation';

export function Navigation() {
  return (
    <nav>
      <Link href="/features">Features</Link>  {/* Automatically adds /fr for French users */}
      <Link href="/pricing">Pricing</Link>
    </nav>
  );
}
```

```typescript
'use client';
// Programmatic navigation
import { useRouter } from '@/lib/navigation';

export function MyButton() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/dashboard'); // Respects current locale
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

### Getting Current Locale

```typescript
'use client';
import { useLocale } from 'next-intl';

export function MyComponent() {
  const locale = useLocale(); // 'en', 'fr', 'it', etc.
  return <div>Current language: {locale}</div>;
}
```

### Language Switcher

```typescript
import { LanguageSwitcher } from '@/components/layout/language-switcher';

export function Header() {
  return (
    <header>
      <nav>...</nav>
      <LanguageSwitcher />
    </header>
  );
}
```

### Adding New Translations

1. **Add to English first** (`messages/en.json`):

```json
{
  "features": {
    "title": "Powerful Features",
    "audit": "47-Point SEO Audit",
    "keywords": "1100+ Keyword Variations",
    "backlinks": "Backlink Analysis"
  }
}
```

2. **Translate to other languages** (`messages/fr.json`, etc.):

```json
{
  "features": {
    "title": "Fonctionnalités Puissantes",
    "audit": "Audit SEO en 47 Points",
    "keywords": "1100+ Variations de Mots-Clés",
    "backlinks": "Analyse des Backlinks"
  }
}
```

3. **Use in component**:

```typescript
const t = useTranslations('features');
<h1>{t('title')}</h1>
<p>{t('audit')}</p>
```

### Translation with Variables

Add to `messages/en.json`:

```json
{
  "greeting": "Hello {name}, you have {count} notifications"
}
```

Use in component:

```typescript
const t = useTranslations();
t("greeting", { name: "John", count: 5 }); // "Hello John, you have 5 notifications"
```

### Pluralization

Add to `messages/en.json`:

```json
{
  "items": "{count, plural, =0 {No items} =1 {One item} other {# items}}"
}
```

Use in component:

```typescript
const t = useTranslations();
t("items", { count: 0 }); // "No items"
t("items", { count: 1 }); // "One item"
t("items", { count: 5 }); // "5 items"
```

### Rich Text / HTML in Translations

```typescript
const t = useTranslations();

// Basic HTML
t.rich('welcome', {
  b: (chunks) => <strong>{chunks}</strong>,
  link: (chunks) => <Link href="/pricing">{chunks}</Link>
});

// In messages/en.json:
{
  "welcome": "Welcome to <b>AI SEO Turbo</b>! Check our <link>pricing</link>."
}
```

### Date & Time Formatting

```typescript
'use client';
import { useFormatter } from 'next-intl';

export function DateDisplay() {
  const format = useFormatter();
  const date = new Date('2025-11-01');

  return (
    <div>
      {format.dateTime(date, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
      {/* EN: November 1, 2025 */}
      {/* FR: 1 novembre 2025 */}
    </div>
  );
}
```

### Number Formatting

```typescript
'use client';
import { useFormatter } from 'next-intl';

export function PriceDisplay() {
  const format = useFormatter();

  return (
    <div>
      {format.number(29.99, {
        style: 'currency',
        currency: 'USD'
      })}
      {/* EN: $29.99 */}
      {/* FR: 29,99 $US */}
    </div>
  );
}
```

### Metadata & SEO (Server Components)

```typescript
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");

  return {
    title: t("features.title"),
    description: t("features.description"),
  };
}
```

### Organizing Translation Files

#### Flat Structure (Current):

```json
{
  "nav": { "home": "Home" },
  "features": { "title": "Features" }
}
```

#### Nested Structure (For large apps):

```json
{
  "nav": {
    "main": { "home": "Home", "features": "Features" },
    "footer": { "about": "About", "contact": "Contact" }
  }
}
```

Access nested:

```typescript
const t = useTranslations("nav.main");
t("home"); // "Home"
```

### Type Safety

Thanks to TypeScript configuration, you get:

- ✅ Autocomplete for all translation keys
- ✅ Compile-time errors for missing translations
- ✅ IntelliSense in VS Code

```typescript
const t = useTranslations("common");
t("save"); // ✅ Works - key exists
t("invalid"); // ❌ TypeScript error - key doesn't exist
```

### Best Practices

1. **Always add English first** - It's the base for type generation
2. **Keep keys semantic** - Use `features.audit.title` not `text1`
3. **Group by feature** - Organize by page/component
4. **Avoid hardcoded strings** - Everything user-facing should be translated
5. **Test with different locales** - Switch languages during development
6. **Use namespaces** - Keeps translation files manageable
7. **Extract common strings** - Buttons, forms, errors in `common` namespace

### Common Patterns

#### Form Labels & Validation

```json
{
  "forms": {
    "email": {
      "label": "Email Address",
      "placeholder": "Enter your email",
      "required": "Email is required",
      "invalid": "Please enter a valid email"
    }
  }
}
```

#### Error Messages

```json
{
  "errors": {
    "generic": "Something went wrong",
    "notFound": "Page not found",
    "unauthorized": "You need to login",
    "networkError": "Network connection failed"
  }
}
```

#### Success Messages

```json
{
  "success": {
    "saved": "Changes saved successfully",
    "created": "Created successfully",
    "deleted": "Deleted successfully"
  }
}
```

### Testing Translations

```typescript
// Vitest test example
import { NextIntlClientProvider } from 'next-intl';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';
import messages from '@/messages/en.json';

test('renders translated text', () => {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <MyComponent />
    </NextIntlClientProvider>
  );

  expect(screen.getByText('Save')).toBeInTheDocument();
});
```

### Debugging

Enable debug logging:

```typescript
// In i18n.ts
export default getRequestConfig(async ({ locale }) => {
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
    onError: (error) => {
      console.error("i18n error:", error);
    },
    getMessageFallback: ({ namespace, key }) => {
      return `${namespace}.${key}`; // Shows key path when translation missing
    },
  };
});
```

### Resources

- **Official Docs**: https://next-intl-docs.vercel.app/
- **Translation Files**: `/messages/*.json`
- **Navigation Utilities**: `/lib/navigation.ts`
- **i18n Config**: `/i18n.ts`
- **Middleware**: `/middleware.ts`

---

**Note**: Always restart the dev server after editing message files to see changes!
