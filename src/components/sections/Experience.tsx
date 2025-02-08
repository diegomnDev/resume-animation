'use client';

import { Card, CardContent } from '@/components/ui/card';
import { siteConfig } from '@/config/site';
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

export default function Experience() {
  const experiences = siteConfig.experiences;

  return (
    <section id="experience" className="flex min-h-screen snap-start items-center">
      <motion.div
        className="container mx-auto max-h-full overflow-y-auto pb-56 pt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="bg-text mb-12 bg-clip-text text-center text-4xl font-bold text-transparent">
          Professional Experience
        </h2>

        <div className="relative mx-auto max-w-4xl">
          <div className="space-y-6 border-l-2 border-dashed border-primary/30">
            {experiences.map((experience, index) => {
              const uniqueKey = `${experience.position}-${index}`;
              return (
                <motion.div
                  key={uniqueKey}
                  variants={itemVariants}
                  className="relative w-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="absolute -top-0.5 z-10 -ml-3.5 size-7 rounded-full bg-secondary"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                      clipRule="evenodd"
                    />
                  </svg>

                  <div className="ml-6">
                    <Card className="w-full opacity-75 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
                      <CardContent className="p-6">
                        <div className="flex justify-between">
                          <h3 className="font-bold text-primary">{experience.position}</h3>
                          <span className="text-sm font-semibold text-primary/70">
                            {experience.company}
                          </span>
                        </div>

                        <p className="mt-2 max-w-screen-sm text-sm text-primary/60">
                          {experience.description}
                        </p>

                        <ul className="mt-2 max-w-screen-sm list-inside list-disc text-sm text-primary/60">
                          {experience.details.map((detail, idx) => {
                            const uniqueDetailKey = `${detail}-${idx}`;
                            return (
                              <li key={uniqueDetailKey}>{detail}</li>
                            );
                          })}
                        </ul>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {experience.technologies.map((tech, idx) => {
                            const uniqueTechKey = `${tech.name}-${idx}`;
                            return (
                              <div
                                key={uniqueTechKey}
                                className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                              >
                                {tech.icon && <tech.icon className="size-4" />}
                                <span>{tech.name}</span>
                              </div>
                            );
                          })}
                        </div>

                        <span className="mt-4 block text-sm font-semibold text-primary">
                          {experience.period}
                        </span>
                      </CardContent>
                    </Card>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
