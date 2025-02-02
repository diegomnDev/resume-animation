'use client';

import { sendEmail } from '@/app/actions/sendEmail';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import * as amplitude from '@amplitude/analytics-browser';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useActionState, useState } from 'react';
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
  const [selectedLanguage, setSelectedLanguage] = useState<string | undefined>(undefined);
  const [state, action, isPending] = useActionState(sendEmail, null);

  const handleOpenModal = () => {
    setIsModalOpen(true);
    amplitude.track('Contact Modal Opened');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDownloadCV = () => {
    if (selectedLanguage) {
      // Logic to download CV based on selected language
      // console.log(`Downloading CV in ${selectedLanguage}`);
      amplitude.track('CV Downloaded', { language: selectedLanguage });
    }
  };

  return (
    <section
      id="profile"
      className="flex h-screen snap-start items-center bg-gray-100/30 dark:bg-gray-800/30"
    >
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="mb-12 bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-center text-4xl font-bold text-transparent">
          About Me
        </h2>
        <div className="grid items-center md:grid-cols-2">
          <motion.div variants={itemVariants}>
            <Image
              width={500}
              height={500}
              src="/assets/img/profile.jpeg"
              alt="Profile"
              className="mx-auto size-80 rounded-full object-cover shadow-lg"
            />
          </motion.div>
          <motion.div variants={itemVariants}>
            <Card className="bg-white/80 shadow-xl backdrop-blur-sm dark:bg-gray-800/80">
              <CardContent className="p-6">
                <h3 className="mb-4 text-2xl font-bold text-blue-600 dark:text-blue-400">John Doe</h3>
                <p className="mb-2">
                  <strong>Email:</strong>
                  {' '}
                  john.doe@example.com
                </p>
                <p className="mb-2">
                  <strong>Location:</strong>
                  {' '}
                  New York, NY
                </p>
                <p className="mb-2">
                  <strong>Profession:</strong>
                  {' '}
                  Full Stack Developer
                </p>
                <p className="mb-6 mt-4">
                  <strong>Bio:</strong>
                  {' '}
                  Passionate about creating innovative web solutions and continuously learning new
                  technologies. With a keen eye for design and a love for clean code, I strive to build seamless user
                  experiences that make a difference.
                </p>
                <div className="flex flex-col gap-4 sm:flex-row">
                  <Button onClick={handleOpenModal}>Contact Me</Button>
                  <div className="flex items-center gap-2">
                    <Select onValueChange={setSelectedLanguage}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select Language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button onClick={handleDownloadCV} disabled={!selectedLanguage}>
                      Download CV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
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
