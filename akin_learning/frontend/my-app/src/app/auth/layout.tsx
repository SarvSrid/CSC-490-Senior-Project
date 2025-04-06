'use client';

import { ReactNode } from 'react';
import '@/app/ui/globals.css';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}