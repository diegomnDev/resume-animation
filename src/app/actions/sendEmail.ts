'use server';

import sgMail from '@sendgrid/mail';
import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

const apiKey = process.env.SENDGRID_API_KEY;
const verifiedSender = process.env.SENDGRID_VERIFIED_SENDER;

if (!apiKey) {
  console.error('SENDGRID_API_KEY is not set');
}

if (!verifiedSender) {
  console.error('SENDGRID_VERIFIED_SENDER is not set');
}

sgMail.setApiKey(apiKey!);

export async function sendEmail(formData: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    const validatedFields = schema.safeParse(formData);

    if (!validatedFields.success) {
      return {
        error: 'Invalid form data',
      };
    }

    const { name, email, message } = validatedFields.data;

    await sgMail.send({
      to: email,
      from: verifiedSender!,
      replyTo: verifiedSender,
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return { success: true };
  } catch (error: any) {
    console.error('SendGrid API error:', error.response?.body || error.message);
    return {
      error: 'Failed to send email. Please try again later.',
    };
  }
}
