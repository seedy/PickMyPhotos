import { createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { env } from "@/env.mjs";

const TRANSPORT: SMTPTransport.Options = {
	auth: {
		pass: env.MAILER_PASSWORD,
		user: env.MAILER_USER,
	},
	host: env.MAILER_HOST,
	port: Number(env.MAILER_PORT),
	secure: true,
};

interface sendEmailProps {
	to: string;
	subject: string;
	html: string;
}
export const sendEmail = async ({ to, subject, html }: sendEmailProps) => {
	const transporter = await createTransport(TRANSPORT);
	return transporter.sendMail({
		from: env.MAILER_USER,
		to,
		subject,
		html,
	});
};

interface sendMagicLinkProps {
	to: string;
	url: string;
}
export const sendMagicLink = async ({ to, url }: sendMagicLinkProps) => {
	return sendEmail({
		to,
		subject: "Your access link",
		html: `
            <p>Click the link below to sign in. It expires in 10 minutes.</p>
            <a href="${url}">Sign in</a>
          `,
	});
};
