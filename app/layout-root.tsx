import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

// Root layout without locale - just passes through to [locale] layout
// This is required for next-intl to work properly
export default function RootLayout({ children }: Props) {
  return children;
}
