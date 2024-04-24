'use client';

import { ThemeProvider } from 'next-themes';
import { TransitionProvider } from './context/TransitionProvider';

export function Providers({ children }: any) {
  return (
    <ThemeProvider enableSystem={false} defaultTheme='dark'>
      <TransitionProvider>{children}</TransitionProvider>
    </ThemeProvider>
  );
}
