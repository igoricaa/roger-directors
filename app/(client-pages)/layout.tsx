import type { Metadata } from 'next';
import localFont from 'next/font/local';
import '../globals.css';
import Header from '../../components/Header';
import { Providers } from '@/components/Providers';
import { Footer } from '@/components/Footer';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import SplashScreen from '@/components/SplashScreen';

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
  metadataBase: new URL('https://roger.rs'),
  title: {
    default: 'Roger Directors',
    template: '%s | Roger Directors',
  },
  description: 'Official website of Roger Directors.',
  openGraph: {
    title: 'Roger Directors',
    description: 'Official website of Roger Directors.',
    url: 'https://roger.rs',
    siteName: 'Roger Directors',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    title: 'Roger Directors',
    card: 'summary_large_image',
  },
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
          <SplashScreen />
          <Header />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
      {/* <GoogleAnalytics gaId='G-S0L7XDFMYG' /> */}
    </html>
  );
}
