'use client';

import { useTheme } from 'next-themes';
import { ToggleSwitch } from './ToggleSwitch';

export const ThemeChanger = () => {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleSwitch
      isChecked={theme === 'dark'}
      handleChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    />
  );
};
