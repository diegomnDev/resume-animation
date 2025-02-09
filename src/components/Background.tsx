'use client';

import type React from 'react';
import { useEffect, useState } from 'react';

const symbols = [
  '{ }',
  '[ ]',
  '( )',
  '</ >',
  '//',
  '/* */',
  '=>',
  '&&',
  '||',
  '!=',
  '==',
  '--',
  '?.',
  '??',
  '?.[]',
  '?.()',
  '??=',
  '?.=',
  ':=',
  '#',
  '|>',
  '!!',
  '?:',
  '&&=',
  '||=',
  '<=>',
];

const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)];

const Background: React.FC = () => {
  const [floatingSymbols, setFloatingSymbols] = useState<
    { id: number; left: string; top: string; delay: string }[]
  >([]);

  useEffect(() => {
    const symbolsArray = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
    }));
    setFloatingSymbols(symbolsArray);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 " />

      {/* Subtle Grid Overlay */}
      <div className="absolute inset-0 bg-slate-200 opacity-5 dark:bg-slate-50" />

      {/* Floating Developer Symbols */}
      <div className="absolute inset-0">
        {floatingSymbols.map(({ id, left, top, delay }) => (
          <div
            key={id}
            className="animate-fade absolute text-gray-400 opacity-10 dark:text-gray-900 sm:text-sm md:text-base"
            style={{
              left,
              top,
              animationDelay: delay,
            }}
          >
            {getRandomSymbol()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Background;
