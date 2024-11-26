import emailjs from "@emailjs/browser";

// Initialize EmailJS with your User ID
emailjs.init(import.meta.env.VITE_EMAILJS_USER_ID);

interface DateDetails {
  mood: string;
  activity: string;
  cuisine?: string;
  dateTime: string;
}

export const sendEmail = async (
  email: string,
  partnerEmail: string,
  details: DateDetails
) => {
  const [dateStr, timeStr] = details.dateTime.split("|");
  const formattedDate = new Date(dateStr).toLocaleDateString();

  try {
    // Send to user
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: email,
        from_email: "dateplannerapp@example.com", // Add a from email
        from_name: "Date Planner App", // Add a from name
        partner_email: partnerEmail,
        mood: details.mood,
        activity: details.activity,
        cuisine: details.cuisine || "Not specified",
        date: formattedDate,
        time: timeStr,
        reply_to: email, // Add reply-to email
      }
    );

    // Send to partner
    await emailjs.send(
      import.meta.env.VITE_EMAILJS_SERVICE_ID,
      import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      {
        to_email: partnerEmail,
        from_email: "dateplannerapp@example.com", // Add a from email
        from_name: "Date Planner App", // Add a from name
        partner_email: email,
        mood: details.mood,
        activity: details.activity,
        cuisine: details.cuisine || "Not specified",
        date: formattedDate,
        time: timeStr,
        reply_to: partnerEmail, // Add reply-to email
      }
    );

    return true;
  } catch (error) {
    console.error("Email sending failed:", error);
    return false;
  }
};
