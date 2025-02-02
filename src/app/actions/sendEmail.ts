'use server';

import { z } from 'zod';

const schema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  message: z.string().min(1, { message: 'Message is required' }),
});

export async function sendEmail(_: any, formData: FormData) {
  const validatedFields = schema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return { error: 'Invalid form data' };
  }

  const { name, email, message } = validatedFields.data;

  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error('SENDGRID_API_KEY is not set');
    return { error: 'Configuration error' };
  }

  const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalizations: [{ to: [{ email: 'your-email@example.com' }] }],
      from: { email: 'your-sender@example.com' },
      subject: 'New contact form submission',
      content: [
        {
          type: 'text/plain',
          value: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        },
      ],
    }),
  });

  if (response.ok) {
    return { success: true };
  } else {
    console.error('SendGrid API error:', await response.text());
    return { error: 'Failed to send email' };
  }
}
