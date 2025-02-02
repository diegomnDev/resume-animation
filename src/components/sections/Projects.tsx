'use client';

import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { FaJava, FaNodeJs, FaPython, FaReact, FaStripe, FaVuejs } from 'react-icons/fa';
import {
  SiDocker,
  SiFastapi,
  SiFirebase,
  SiKubernetes,
  SiMongodb,
  SiPostgresql,
  SiSpringboot,
  SiTensorflow,
} from 'react-icons/si';

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

const projects = [
  {
    name: 'E-commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory management and payment integration.',
    technologies: [
      { name: 'React', icon: FaReact },
      { name: 'Node.js', icon: FaNodeJs },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'Stripe', icon: FaStripe },
    ],
  },
  {
    name: 'Task Management App',
    description: 'A collaborative task management application with real-time updates and team chat functionality.',
    technologies: [
      { name: 'Vue.js', icon: FaVuejs },
      { name: 'Firebase', icon: SiFirebase },
    ],
  },
  {
    name: 'AI-Powered News Aggregator',
    description:
      'An intelligent news aggregation platform that uses machine learning to personalize content for users.',
    technologies: [
      { name: 'Python', icon: FaPython },
      { name: 'TensorFlow', icon: SiTensorflow },
      { name: 'React', icon: FaReact },
      { name: 'FastAPI', icon: SiFastapi },
    ],
  },
  {
    name: 'Microservices-based Banking System',
    description:
      'A robust banking system built with Spring Boot microservices architecture, featuring account management, transactions, and reporting.',
    technologies: [
      { name: 'Java', icon: FaJava },
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Docker', icon: SiDocker },
      { name: 'Kubernetes', icon: SiKubernetes },
    ],
  },
  {
    name: 'Real-time Inventory Management System',
    description:
      'An efficient inventory management system using Spring Boot for backend services and React for the frontend, with real-time updates and analytics.',
    technologies: [
      { name: 'Java', icon: FaJava },
      { name: 'Spring Boot', icon: SiSpringboot },
      { name: 'React', icon: FaReact },
      { name: 'PostgreSQL', icon: SiPostgresql },
    ],
  },
];

export default function Projects() {
  return (
    <section
      id="projects"
      className="flex min-h-screen snap-start items-center bg-gray-100/30 backdrop-blur-sm dark:bg-gray-800/30"
    >
      <motion.div
        className="container mx-auto px-4 py-16"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-center text-4xl font-bold text-transparent">
          Featured Projects
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => {
            const uniqueKey = `${project.name}-${index}`;
            return (
              <motion.div key={uniqueKey} variants={itemVariants}>
                <Card className="bg-white/80 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl dark:bg-gray-800/80">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-2xl font-bold text-blue-600 dark:text-blue-400">{project.name}</h3>
                    <p className="mb-4 text-gray-600 dark:text-gray-300">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => {
                        const uniqueTechKey = `${tech.name}-${techIndex}`;
                        return (
                          <span
                            key={uniqueTechKey}
                            className="flex items-center rounded bg-gray-200 px-2 py-1 text-sm text-gray-700 dark:bg-gray-600 dark:text-gray-300"
                          >
                            <tech.icon className="mr-1 size-4" />
                            {tech.name}
                          </span>
                        );
                      })}
                    </div>
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
