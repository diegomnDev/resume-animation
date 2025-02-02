'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { useEffect, useState } from 'react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      duration: 0.8,
    },
  },
};

const TypedText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setDisplayText(''); // Reset text before starting
    setIndex(0);

    const typingInterval = setInterval(() => {
      setIndex((prevIndex) => {
        if (prevIndex < text.length) {
          return prevIndex + 1; // Increment index
        } else {
          clearInterval(typingInterval);
          return prevIndex;
        }
      });
    }, 100);

    return () => clearInterval(typingInterval);
  }, [text]);

  useEffect(() => {
    setDisplayText(text.slice(0, index)); // Ensure correct slicing
  }, [index, text]);

  return <span>{displayText}</span>;
};

export default function Home() {
  return (
    <section
      id="home"
      className="flex h-screen snap-start items-center justify-center bg-white/10 dark:bg-gray-900/10"
    >
      <motion.div className="text-center" variants={containerVariants} initial="hidden" animate="visible">
        <motion.h1
          className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-5xl font-bold text-transparent md:text-7xl"
          variants={itemVariants}
        >
          <TypedText text="Welcome to My Resume" />
        </motion.h1>
        <motion.div
          className="mb-8 items-start font-mono text-xl text-gray-700 dark:text-gray-300 md:text-2xl"
          variants={itemVariants}
        >
          <TypedText text="function createImpression() {" />
          <br />
          <TypedText text="       return 'Crafting digital experiences';" />
          <br />
          <TypedText text="}" />
        </motion.div>
        <motion.div variants={itemVariants}>
          <a
            href="#profile"
            className="inline-flex size-12 items-center justify-center rounded-full bg-blue-500 text-white transition duration-300 ease-in-out hover:scale-105 hover:bg-blue-600"
          >
            <ArrowDown className="size-6 animate-bounce" />
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
