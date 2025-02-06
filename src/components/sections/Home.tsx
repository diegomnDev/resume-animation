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
      <motion.div className="row-start-2 flex flex-col items-center justify-center gap-4" variants={containerVariants} initial="hidden" animate="visible">
        <motion.div className="rounded-md bg-black/50 p-4 dark:bg-white/50" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div className="mx-auto flex h-full w-4/5 items-center justify-between" variants={containerVariants} initial="hidden" animate="visible">
            <motion.div className="flex size-full flex-col justify-center gap-2 text-white dark:text-black" variants={containerVariants} initial="hidden" animate="visible">
              <motion.h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl xl:text-7xl">
                <TypedText text="Hi there, I am'" />
              </motion.h1>
              <motion.h1 className="bg-text text-4xl font-semibold md:text-5xl lg:text-6xl xl:text-7xl">
                <TypedText text="Diego MN!" />
              </motion.h1>
              <motion.p className="my-2 text-lg sm:text-xl lg:my-6 lg:text-3xl">
                <TypedText text="Developer | Passionate about coding and solving complex problems." />
              </motion.p>

              <motion.div variants={itemVariants} className="mx-auto flex items-center justify-center">
                <a
                  href="#profile"
                  className="inline-flex size-12 items-center justify-center rounded-full bg-primary text-white transition duration-300 ease-in-out hover:scale-105 dark:text-black"
                >
                  <ArrowDown className="size-6 animate-bounce" />
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
