import { EmailTemplate } from '../../../components/EmailTemplate';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    debugger;
    const data = await resend.emails.send({
      from: `Kontakt forma <contact@roger.rs>`,
      to: ['olga.wood@roger.rs'],
      subject: 'cf roger.rs',
      react: EmailTemplate({ email }),
    });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error });
  }
}
