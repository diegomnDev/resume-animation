'use client';

import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLink } from 'react-icons/fa6';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
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

export default function Projects() {
  const projects = siteConfig.projects;

  return (
    <section
      id="projects"
      className="flex min-h-screen snap-start items-center justify-center bg-white/30 dark:bg-gray-900/30"
    >
      <motion.div
        className="container mx-auto max-h-[80vh] overflow-y-auto px-4 py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-center text-4xl font-bold text-transparent">
          Featured Projects
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => {
            const uniqueKey = `${project.name}-${index}`;
            return (
              <motion.div key={uniqueKey} variants={itemVariants}>
                <Card className="bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800/80">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{project.name}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">
                      Status:
                      {' '}
                      <span className="text-blue-600 dark:text-blue-400">{project.status}</span>
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => {
                        const uniqueTechKey = `${tech.name}-${techIndex}`;
                        return (
                          <span
                            key={uniqueTechKey}
                            className="flex items-center rounded bg-gray-200 px-2 py-1 text-sm text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                          >
                            {tech.icon && <tech.icon className="mr-1 size-4" />}
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>
                    {project.url && (
                      <Link
                        href={project.url}
                        className="mt-4 flex items-center gap-2 text-blue-600 hover:underline dark:text-blue-400"
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <FaLink className="size-4" />
                        View Project
                      </Link>
                    )}
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
