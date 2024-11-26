import { Resend } from "resend";

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

interface EmailDetails {
  mood: string;
  activity: string;
  cuisine?: string;
  dateTime: string;
}

interface SendEmailProps {
  to: string[];
  subject: string;
  details: EmailDetails;
}

export const sendEmail = async ({ to, subject, details }: SendEmailProps) => {
  const [dateStr, timeStr] = details.dateTime.split("|");
  const date = new Date(dateStr);

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
      <h1 style="color: #333; text-align: center;">Your Date is Confirmed! 🎉</h1>
      
      <div style="background: #f9f9f9; padding: 20px; border-radius: 10px; margin: 20px 0;">
        <h2 style="color: #666;">Date Details:</h2>
        <ul style="list-style: none; padding: 0;">
          <li style="margin: 10px 0;">
            <strong>Mood:</strong> ${details.mood}
          </li>
          <li style="margin: 10px 0;">
            <strong>Activity:</strong> ${details.activity}
          </li>
          ${details.cuisine ? `
          <li style="margin: 10px 0;">
            <strong>Cuisine:</strong> ${details.cuisine}
          </li>
          ` : ''}
          <li style="margin: 10px 0;">
            <strong>Date & Time:</strong> ${date.toLocaleDateString()} at ${timeStr}
          </li>
        </ul>
      </div>
      
      <p style="color: #666; text-align: center;">
        We hope you have a wonderful time! 💖
      </p>
    </div>
  `;

  try {
    await resend.emails.send({
      from: "Date Scheduler <onboarding@resend.dev>",
      to,
      subject,
      html,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
    throw error;
  }
};