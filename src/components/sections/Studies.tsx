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

export default function Studies() {
  const studies = siteConfig.education;

  return (
    <section
      id="studies"
      className="flex h-screen snap-start items-center"
    >
      <motion.div
        className="container mx-auto max-h-full overflow-y-auto pb-56 pt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="bg-text mb-12 bg-clip-text text-center text-4xl font-bold text-transparent">
          Educational Background
        </h2>
        <div className="space-y-8">
          {studies.map((study, index) => {
            const uniqueKey = `${study.degree}-${index}`;
            return (
              <motion.div key={uniqueKey} variants={itemVariants} className="flex w-full justify-center">
                <Card className="w-full opacity-75 shadow-lg backdrop-blur-sm transition-shadow duration-300 hover:shadow-xl">
                  <CardContent className="p-6 text-primary">
                    <h3 className="mb-2 text-2xl font-bold">{study.degree}</h3>
                    <h4 className="mb-2 text-xl text-primary/80 ">{study.institution}</h4>
                    <p className="mb-4 text-sm text-primary/50">{study.period}</p>
                    <p className="text-primary/70">{study.description}</p>
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
