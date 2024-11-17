import resend from '../config/resend';
import { EMAIL_SENDER, NODE_ENV } from '../constants/env';

type EmailParams = {
  to: string;
  subject: string;
  text: string;
  html: string;
};

const getFromEmail = () => {
    return NODE_ENV === 'development' ? 'onboarding@resend.dev' : EMAIL_SENDER;
}

const getToEmail = (to: string) => {
    return NODE_ENV === 'development' ? 'delivered@resend.dev' : to;
}

export const sendEmail = async ({ to, subject, text, html }: EmailParams) => {
  return await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
};
