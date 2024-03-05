import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Header from '../components/Header';
import { Providers } from '@/components/Providers';
import { Footer } from '@/components/Footer';

const mont = localFont({
  src: [
    {
      path: './fonts/Mont-Regular.woff2',
      weight: '400',
    },
    {
      path: './fonts/Mont-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-mont',
});

export const metadata: Metadata = {
  title: 'Roger Directors',
  description: 'Official website of Roger Directors',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang='en'>
      <head></head>
      <body className={`${mont.variable}`}>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
