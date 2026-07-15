import type { ContactFormData } from "@/types/contact";

export interface ContactServiceResult {
  success: boolean;
  message: string;
}

/**
 * Sends a contact form submission.
 * Currently uses Formspree as a zero-config backend.
 * Replace FORMSPREE_ID with your actual Formspree form ID,
 * or swap this function for any other email service (Resend, SendGrid, etc.)
 */
export async function submitContactForm(
  data: ContactFormData,
): Promise<ContactServiceResult> {
  const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID ?? "YOUR_FORM_ID";

  try {
    const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message,
        _subject: `Portfolio Contact: ${data.subject}`,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    return { success: true, message: "Message sent successfully! I'll get back to you soon." };
  } catch {
    return {
      success: false,
      message: "Failed to send message. Please try emailing me directly.",
    };
  }
}
