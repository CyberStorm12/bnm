import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'BD Ecommerce - Bangladesh Multivendor Marketplace',
  description:
    'Premium multivendor ecommerce marketplace for Bangladesh. Shop from trusted vendors, secure payments, fast delivery.',
  keywords: ['ecommerce', 'shopping', 'marketplace', 'Bangladesh', 'online store'],
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'BD Ecommerce',
    description: 'Bangladesh Multivendor Marketplace',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
