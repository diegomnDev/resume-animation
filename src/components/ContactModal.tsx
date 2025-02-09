// ContactModal.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import * as amplitude from '@amplitude/analytics-browser';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
}).required();

type FormData = yup.InferType<typeof schema>;

type ContactModalProps = {
  isOpen: boolean;
  onClose: () => void;
  action: (formData: FormData) => Promise<{ success?: boolean; error?: string }>;
  isPending: boolean;
};

export function ContactModal({ isOpen, onClose, action, isPending }: ContactModalProps) {
  const { toast } = useToast();
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
      toast({
        title: 'Sending message...',
        description: 'Please wait while we process your request.',
      });

      const result = await action(data);

      if (result.success) {
        toast({
          title: 'Success!',
          description: 'Your message has been sent successfully.',
          variant: 'default',
        });
        amplitude.track('Contact Form Submitted');
        reset();
        onClose();
      } else {
        toast({
          title: 'Error',
          description: result.error || 'Something went wrong. Please try again.',
          variant: 'destructive',
        });
        amplitude.track('Contact Form Submission Error', { error: result.error });
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
      console.error('Error submitting form:', error);
      amplitude.track('Contact Form Submission Error', { error: String(error) });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Contact Me</DialogTitle>
          <div className="my-3 w-full border-b-2 border-primary opacity-25">
            Fill out the form below to get in touch.
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input {...register('name')} placeholder="Name" />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <Input {...register('email')} placeholder="Email" />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div>
            <Textarea {...register('message')} placeholder="Message" />
            {errors.message && (
              <p className="text-sm text-red-500">{errors.message.message}</p>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending ? 'Sending...' : 'Send'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
