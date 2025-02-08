'use client';

import { sendEmail } from '@/app/actions/sendEmail';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as amplitude from '@amplitude/analytics-browser';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useActionState, useState } from 'react';
import { FaBriefcase } from 'react-icons/fa6';
import { TbWorld } from 'react-icons/tb';
import { ContactModal } from '../ContactModal';

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
  hidden: { x: -50, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      duration: 0.8,
    },
  },
};

export default function Profile() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [state, action, isPending] = useActionState(sendEmail, null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    amplitude.track('Contact Modal Opened');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownloadCV = (language: string) => {
    if (language) {
      const filename = language === 'english'
        ? '/assets/docs/Diego_Montes_Novio_CV.pdf'
        : '/assets/docs/Diego_Montes_Novio_CV_ES.pdf';

      window.open(filename, '_blank');
      amplitude.track('CV Downloaded', { language });
    }
  };

  return (
    <section
      id="profile"
      className="flex min-h-screen snap-start items-center justify-center"
    >
      <motion.div
        className="container mx-auto px-4 pb-56 pt-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="relative mx-auto flex h-auto max-w-4xl flex-wrap items-center">
          {/* Mobile image */}
          <motion.div
            variants={itemVariants}
            className="relative z-20 mx-2 w-full sm:mx-6 lg:hidden"
          >
            <Image
              width={500}
              height={500}
              src="/assets/img/profile.jpeg"
              alt="Profile"
              className="mx-auto size-3/5 translate-y-2 rounded shadow-2xl md:translate-y-4 lg:hidden"
            />
          </motion.div>

          {/* Card */}
          <motion.div
            variants={itemVariants}
            className="z-10 w-full lg:w-3/5"
          >
            <Card className="mx-2 rounded-lg opacity-75 shadow-2xl backdrop-blur-sm sm:mx-6 lg:mx-0">
              <CardContent className="p-4 text-center md:p-12 lg:text-left">
                <h1 className="bg-text pt-8 text-3xl font-bold lg:pt-0">
                  Diego Montes Novio
                </h1>
                <p className="flex items-center justify-center pt-4 text-base lg:justify-start">
                  <FaBriefcase size={16} className="mr-2" />
                  Developer
                </p>
                <p className="flex items-center justify-center pt-1 text-base lg:justify-start">
                  <TbWorld size={16} className="mr-2" />
                  Santiago de Compostela
                </p>
                <p className="pt-8 text-sm">
                  Java backend developer trying to understand the world...
                </p>
                <p className="pt-2 text-sm">
                  I am a software developer with over 10 years of experience in the IT sector,
                  mainly focused on backend development with some experience in frontend.
                  I am passionate about technology, enjoy working in collaborative environments,
                  learning new things, and taking on challenges to keep improving my skills and knowledge.
                </p>
                <div className="flex flex-col items-start gap-2 pt-4 text-sm">
                  <span className="before:mr-2 before:content-['•']">Spanish (native)</span>
                  <span className="before:mr-2 before:content-['•']">Galician (native)</span>
                  <span className="before:mr-2 before:content-['•']">English (intermediate)</span>
                  <span className="before:mr-2 before:content-['•']">French (intermediate)</span>
                </div>
                <div className="flex flex-col justify-center gap-4 pt-8 sm:flex-row">
                  <Button onClick={handleOpenModal}>Get In Touch</Button>
                  <Select onValueChange={handleDownloadCV}>
                    <SelectTrigger className="w-full bg-secondary shadow-xl md:w-[160px]">
                      <SelectValue placeholder="Download CV" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Desktop image */}
          <motion.div
            variants={itemVariants}
            className="relative z-20 hidden w-full lg:block lg:w-2/5"
          >
            <Image
              width={500}
              height={500}
              src="/assets/img/profile.jpeg"
              alt="Profile"
              className="scale-105 rounded-none shadow-2xl lg:rounded"
            />
          </motion.div>
        </div>
      </motion.div>

      <ContactModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        action={async (_prevState, data) => {
          const formData = new FormData();
          formData.append('name', data.name);
          formData.append('email', data.email);
          formData.append('message', data.message);
          return await action(formData);
        }}
        isPending={isPending}
        state={state}
      />
    </section>
  );
}
