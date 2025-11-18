import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './i18n-config';

// Define routing configuration
export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // English at root, others with locale prefix
});

// Create type-safe navigation utilities for i18n routing
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
