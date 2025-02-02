'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import * as amplitude from '@amplitude/analytics-browser';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup
  .object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    message: yup.string().required('Message is required'),
  })
  .required();

type FormData = yup.InferType<typeof schema>;

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  action: (prevState: { error?: string; success?: boolean }, formData: FormData) => Promise<void>;
  isPending: boolean;
  state: { error?: string; success?: boolean } | null;
};

export function ContactModal({ isOpen, onClose, action, isPending, state }: ContactModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await action({}, data);
      amplitude.track('Contact Form Submitted');
      reset();
      onClose();
    } catch (error) {
      console.error('Error submitting form:', error);
      amplitude.track('Contact Form Submission Error', { error: String(error) });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register('name')} placeholder="Name" />
            {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
          </div>
          <div>
            <Input {...register('email')} placeholder="Email" />
            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
          </div>
          <div>
            <Textarea {...register('message')} placeholder="Message" />
            {errors.message && <p className="text-sm text-red-500">{errors.message.message}</p>}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </form>
        {state && (
          <p className={state.error ? 'text-red-500' : 'text-green-500'}>
            {state.error ? state.error : 'Message sent successfully!'}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
