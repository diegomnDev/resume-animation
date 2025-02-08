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
      className="flex min-h-screen snap-start items-center justify-center"
    >
      <motion.div
        className="container mx-auto max-h-[80vh] overflow-y-auto pb-56 pt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="bg-text mb-12 bg-clip-text text-center text-4xl font-bold text-transparent">
          Featured Projects
        </h2>
        <div className="flex flex-col gap-8">
          {projects.map((project, index) => {
            const uniqueKey = `${project.name}-${index}`;
            const isEven = index % 2 === 1;
            return (
              <motion.div
                key={uniqueKey}
                variants={itemVariants}
                className={`flex ${isEven ? 'lg:justify-end' : 'lg:justify-start'}`}
              >
                <div className="w-full lg:w-2/3">
                  <Card className="opacity-75 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
                    <CardContent className={`p-6 ${isEven ? 'text-right' : ''}`}>
                      <h3 className="mb-2 text-2xl font-bold">{project.name}</h3>
                      <p className="mb-4 text-sm">{project.description}</p>
                      <p className="mb-4 text-sm">
                        Status:
                        {' '}
                        <span className="font-bold text-primary/70">{project.status}</span>
                      </p>
                      <div className={`flex flex-wrap gap-2 ${isEven ? 'justify-end' : ''}`}>
                        {project.technologies.map((tech, techIndex) => {
                          const uniqueTechKey = `${tech.name}-${techIndex}`;
                          return (
                            <span
                              key={uniqueTechKey}
                              className="flex items-center rounded px-2 py-1 text-sm"
                            >
                              {tech.icon && <tech.icon className={`${isEven ? 'ml-1' : 'mr-1'} size-4`} />}
                              {tech.name}
                            </span>
                          );
                        })}
                      </div>
                      {project.url && (
                        <Link
                          href={project.url}
                          className={`mt-4 flex items-center gap-2 hover:underline ${isEven ? 'justify-end' : ''}`}
                          rel="noopener noreferrer"
                          target="_blank"
                        >
                          {isEven && 'View Project'}
                          <FaLink className="size-4" />
                          {!isEven && 'View Project'}
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
