'use client';

import { usePathname, useRouter } from '@/lib/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { locales, localeNames, type Locale } from '@/i18n';
import { FlagIcon } from '@/components/ui/flag-icons';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { Languages, Check } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale() as Locale;
  const { data: session, update: updateSession } = useSession();
  const t = useTranslations('common');
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);

  const handleLocaleChange = async (newLocale: Locale) => {
    if (newLocale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Start transition for smooth UI update
    startTransition(async () => {
      try {
        // If user is logged in, update their preference in database
        if (session?.user?.email) {
          const response = await fetch('/api/user/preferences', {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              preferredLocale: newLocale,
            }),
          });

          if (!response.ok) {
            console.error('Failed to update user locale preference');
          } else {
            // Update session to reflect new locale
            await updateSession({
              ...session,
              user: {
                ...session.user,
                preferredLocale: newLocale,
              },
            });
          }
        }

        // Set cookie for guests (middleware will read this)
        document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;

        // Navigate to the same page with new locale
        router.replace(pathname, { locale: newLocale });
        
        // Close dropdown
        setIsOpen(false);

        // Show success toast
        toast({
          title: t('languageChanged'),
          description: `${localeNames[newLocale]}`,
          duration: 2000,
        });
      } catch (error) {
        console.error('Error changing language:', error);
        toast({
          title: t('error'),
          description: t('languageChangeFailed'),
          variant: 'destructive',
        });
      }
    });
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center gap-2 h-9"
          disabled={isPending}
        >
          <Languages className="h-4 w-4" />
          <span className="hidden sm:inline-flex items-center"><FlagIcon locale={currentLocale} title={localeNames[currentLocale]} /></span>
          <span className="hidden md:inline">{localeNames[currentLocale]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuLabel className="text-xs font-medium text-muted-foreground">
          {t('selectLanguage')}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {locales.map((locale: Locale) => (
          <DropdownMenuItem
            key={locale}
            onClick={() => handleLocaleChange(locale)}
            disabled={isPending}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <span className="text-lg inline-flex items-center"><FlagIcon locale={locale} title={localeNames[locale]} /></span>
              <span>{localeNames[locale]}</span>
            </span>
            {currentLocale === locale && (
              <Check className="h-4 w-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
