"use client";

import React from 'react';
import { Locale } from '@/i18n';

// Minimal inline SVG flags for reliable cross-platform rendering
// Size: 16x12 (keeps it crisp at small sizes)

type Props = { locale: Locale; className?: string; title?: string };

export function FlagIcon({ locale, className = 'h-4 w-5 rounded-[2px] overflow-hidden', title }: Props) {
  switch (locale) {
    case 'en':
      return (
        <svg viewBox="0 0 19 10" className={className} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <defs>
            <clipPath id="a"><path d="M0 0h19v10H0z"></path></clipPath>
          </defs>
          <g clipPath="url(#a)">
            <path fill="#b22234" d="M0 0h19v10H0z"/>
            <path stroke="#fff" strokeWidth="1.2" d="M0 1.25h19M0 3.75h19M0 6.25h19M0 8.75h19"/>
            <path fill="#3c3b6e" d="M0 0h7.6v5.6H0z"/>
            {Array.from({ length: 9 }).map((_, i) => (
              <g key={i} transform={`translate(${(i%2)*0.42} ${(Math.floor(i/2))*0.62})`}>
                {Array.from({ length: 6 }).map((__, j) => (
                  <circle key={j} cx={0.7 + j*1.25} cy={0.55 + (i%2?0.31:0)} r={0.09} fill="#fff" />
                ))}
              </g>
            ))}
          </g>
        </svg>
      );
    case 'fr':
      return (
        <svg viewBox="0 0 3 2" className={className} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <rect width="1" height="2" x="0" fill="#0055A4"/>
          <rect width="1" height="2" x="1" fill="#fff"/>
          <rect width="1" height="2" x="2" fill="#EF4135"/>
        </svg>
      );
    case 'it':
      return (
        <svg viewBox="0 0 3 2" className={className} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <rect width="1" height="2" x="0" fill="#009246"/>
          <rect width="1" height="2" x="1" fill="#fff"/>
          <rect width="1" height="2" x="2" fill="#CE2B37"/>
        </svg>
      );
    case 'es':
      return (
        <svg viewBox="0 0 3 2" className={className} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <rect width="3" height="2" fill="#C60B1E"/>
          <rect y="0.5" width="3" height="1" fill="#FFC400"/>
        </svg>
      );
    case 'id':
      return (
        <svg viewBox="0 0 3 2" className={className} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <rect width="3" height="1" y="0" fill="#CE1126"/>
          <rect width="3" height="1" y="1" fill="#fff"/>
        </svg>
      );
    case 'de':
      return (
        <svg viewBox="0 0 3 2" className={className} aria-hidden={!title} role={title ? 'img' : 'presentation'}>
          {title ? <title>{title}</title> : null}
          <rect width="3" height="0.666" y="0" fill="#000"/>
          <rect width="3" height="0.666" y="0.666" fill="#dd0000"/>
          <rect width="3" height="0.668" y="1.332" fill="#ffce00"/>
        </svg>
      );
    default:
      return null;
  }
}
