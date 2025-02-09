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
      className="fixed right-8 top-4 z-50 size-10 rounded-full p-2 opacity-75 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-150"
      aria-label="Toggle theme"
    >
      {theme === 'dark'
        ? <Sun className="size-5" />
        : <Moon className="size-5" />}
    </Button>
  );
}
