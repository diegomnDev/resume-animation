'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
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
      stiffness: 100,
    },
  },
};

const studies = [
  {
    degree: 'Master of Science in Computer Science',
    institution: 'Tech University',
    period: '2013 - 2015',
    description:
      'Specialized in Machine Learning and Artificial Intelligence. Thesis on "Implementing Neural Networks for Natural Language Processing".',
  },
  {
    degree: 'Bachelor of Science in Software Engineering',
    institution: 'State University',
    period: '2009 - 2013',
    description: 'Focused on software development methodologies and data structures. Graduated with honors.',
  },
  {
    degree: 'Full Stack Web Development Bootcamp',
    institution: 'Code Academy',
    period: '2015 (3 months intensive)',
    description: 'Intensive program covering modern web technologies including React, Node.js, and MongoDB.',
  },
];

export default function Studies() {
  return (
    <section
      id="studies"
      className="flex h-screen snap-start items-center bg-gray-100/30 backdrop-blur-sm dark:bg-gray-800/30"
    >
      <motion.div
        className="container mx-auto max-h-full overflow-y-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-center text-4xl font-bold text-transparent">
          Educational Background
        </h2>
        <div className="space-y-8">
          {studies.map((study, index) => {
            const uniqueKey = `${study.degree}-${index}`;
            return (
              <motion.div key={uniqueKey} variants={itemVariants}>
                <Card className="bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800/80">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{study.degree}</h3>
                    <h4 className="mb-2 text-xl text-gray-700 dark:text-gray-300">{study.institution}</h4>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{study.period}</p>
                    <p className="text-gray-600 dark:text-gray-300">{study.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
