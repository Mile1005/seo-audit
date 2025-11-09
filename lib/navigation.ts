import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from '../i18n';

// Define routing configuration
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always' // Always use locale prefix: /en/, /de/, etc.
});

// Create type-safe navigation utilities for i18n routing
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
