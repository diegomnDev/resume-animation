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

const experiences = [
  {
    company: 'Tech Innovators Inc.',
    position: 'Senior Full Stack Developer',
    period: 'Jan 2020 - Present',
    description:
      'Led a team of developers in creating scalable web applications using React and Node.js. Implemented CI/CD pipelines and improved overall code quality.',
  },
  {
    company: 'Digital Solutions LLC',
    position: 'Full Stack Developer',
    period: 'Mar 2017 - Dec 2019',
    description:
      'Developed and maintained multiple client websites. Worked on both front-end and back-end technologies, including Angular and Django.',
  },
  {
    company: 'StartUp Ventures',
    position: 'Junior Web Developer',
    period: 'Jun 2015 - Feb 2017',
    description:
      'Assisted in the development of a SaaS platform. Gained experience in responsive design and RESTful API integration.',
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
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
          Professional Experience
        </h2>
        <div className="space-y-8">
          {experiences.map((exp, index) => {
            const uniqueKey = `${exp.company}-${index}`;
            return (
              <motion.div key={uniqueKey} variants={itemVariants}>
                <Card className="bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800/80">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{exp.position}</h3>
                    <h4 className="mb-2 text-xl text-gray-700 dark:text-gray-300">{exp.company}</h4>
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400">{exp.period}</p>
                    <p className="text-gray-600 dark:text-gray-300">{exp.description}</p>
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
