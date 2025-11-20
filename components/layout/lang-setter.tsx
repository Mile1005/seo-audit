'use client';

import { useLayoutEffect } from 'react';

interface LangSetterProps {
  lang: string;
}

export function LangSetter({ lang }: LangSetterProps) {
  useLayoutEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang = '${lang}';`
      }}
    />
  );
}