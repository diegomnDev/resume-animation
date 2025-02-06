'use client';

import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
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

export default function Skills() {
  const skills = siteConfig.skills;

  return (
    <section
      id="skills"
      className="flex h-screen snap-start items-center bg-white/30 dark:bg-gray-900/30"
    >
      <motion.div
        className="container mx-auto max-h-full overflow-y-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-center text-4xl font-bold text-transparent">
          Technical Skills
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill, index) => {
            const uniqueKey = `${skill.name}-${index}`;
            return (
              <motion.div key={uniqueKey} variants={itemVariants}>
                <Card className="bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800/80">
                  <CardContent className="p-6">
                    <div className="mb-4 flex items-center">
                      <skill.icon className="mr-4 size-8 " />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{skill.name}</h3>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-400 dark:bg-gray-600">
                      <motion.div
                        className="h-2.5 rounded-full bg-primary"
                        style={{ width: `${skill.level}%` }}
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                      />
                    </div>
                    <p className="mt-2 text-right text-sm text-gray-600 dark:text-gray-300">
                      {skill.level}
                      %
                    </p>
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
