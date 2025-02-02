'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FaAws, FaDatabase, FaJava, FaNodeJs, FaPython, FaReact } from 'react-icons/fa';
import { SiDocker, SiGraphql, SiHibernate, SiSpring, SiSpringboot, SiTypescript } from 'react-icons/si';

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

const skills = [
  { name: 'React', level: 90, icon: FaReact },
  { name: 'Node.js', level: 85, icon: FaNodeJs },
  { name: 'TypeScript', level: 80, icon: SiTypescript },
  { name: 'Python', level: 75, icon: FaPython },
  { name: 'SQL', level: 85, icon: FaDatabase },
  { name: 'GraphQL', level: 70, icon: SiGraphql },
  { name: 'Docker', level: 65, icon: SiDocker },
  { name: 'AWS', level: 60, icon: FaAws },
  { name: 'Java', level: 80, icon: FaJava },
  { name: 'Spring Boot', level: 75, icon: SiSpringboot },
  { name: 'Spring MVC', level: 70, icon: SiSpring },
  { name: 'Spring Data JPA', level: 65, icon: SiHibernate },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="flex h-screen snap-start items-center bg-white/30 backdrop-blur-sm dark:bg-gray-900/30"
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
                      <skill.icon className="mr-4 size-8 text-blue-500" />
                      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">{skill.name}</h3>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-gray-200 dark:bg-gray-600">
                      <motion.div
                        className="h-2.5 rounded-full bg-blue-600"
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
