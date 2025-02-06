'use client';

import { motion } from 'framer-motion';
import { Briefcase, Code, Folder, GraduationCap, Home, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const navItems = [
  { icon: Home, label: 'Home', href: '#home' },
  { icon: User, label: 'Profile', href: '#profile' },
  { icon: Briefcase, label: 'Experience', href: '#experience' },
  { icon: GraduationCap, label: 'Studies', href: '#studies' },
  { icon: Code, label: 'Skills', href: '#skills' },
  { icon: Folder, label: 'Projects', href: '#projects' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Side navigation for large screens */}
      <nav className="fixed right-8 top-1/2 z-50 hidden -translate-y-1/2 lg:block">
        <ul className="flex flex-col gap-4">
          {navItems.map(({ icon: Icon, label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={e => handleClick(e, href)}
                className={`block rounded-full p-2 transition-colors duration-300 ${
                  activeSection === href.slice(1)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 hover:scale-125 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
              >
                <Icon className="size-6" />
                <span className="sr-only">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mac-style dock for small screens */}
      <nav className="dock fixed bottom-4 left-1/2 z-50 -translate-x-1/2 rounded-full bg-white/20 p-2 shadow-lg backdrop-blur-sm dark:bg-gray-800/20 lg:hidden">
        <ul className="flex items-center space-x-4">
          {navItems.map(({ icon: Icon, label, href }) => (
            <li key={href}>
              <motion.a
                href={href}
                onClick={e => handleClick(e, href)}
                className={`block rounded-full p-2 transition-colors duration-300 ${
                  activeSection === href.slice(1)
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-200 hover:scale-125 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <Icon className="size-6" />
                <span className="sr-only">{label}</span>
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
