import { Analytics } from '@/components/Analytics';
import Background from '@/components/Background';
import Navigation from '@/components/Navigation';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { ThemeProvider } from '@/providers/ThemeProvider';
import { Fira_Code } from 'next/font/google';
import './globals.css';

const firaCode = Fira_Code({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${firaCode.className} overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="flex">
            <main className="smooth-scroll h-screen grow snap-y snap-mandatory overflow-y-scroll">{children}</main>
            <Navigation />
            <ThemeSwitcher />
          </div>
          <Background />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
