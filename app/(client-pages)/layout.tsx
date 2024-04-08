import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import Header from '../../components/Header';
import { Providers } from '@/components/Providers';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';

const mont = localFont({
  src: [
    {
      path: '../fonts/Mont-Regular.woff2',
      weight: '400',
    },
    {
      path: '../fonts/Mont-Bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-mont',
});

const montBook = localFont({
  src: [
    {
      path: '../fonts/Mont-Book.woff2',
      weight: '300',
    },
  ],
  variable: '--font-mont-book',
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
      <body className={[`${mont.variable}`, `${montBook.variable}`].join(' ')}>
        <Providers>
          <Header />
          {children}
          <Footer />
          <SpeedInsights />
          <Analytics />
        </Providers>
      </body>
      {/* <GoogleAnalytics gaId='G-S0L7XDFMYG' /> */}
    </html>
  );
}
