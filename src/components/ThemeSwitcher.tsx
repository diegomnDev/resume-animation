'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <Button
      type="button"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="fixed right-8 top-4 z-50 rounded-full bg-white/20 p-2 text-gray-800 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-150 dark:bg-gray-800/20 dark:text-gray-200"
    >
      {theme === 'dark' ? <Sun className="size-6" /> : <Moon className="size-6" />}
    </Button>
  );
}
