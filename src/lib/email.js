import emailjs from '@emailjs/browser';

/**
 * Low-level utility to send an email via EmailJS.
 * Ensures that serviceId is not "default_service" to prevent fallback to dashboard defaults.
 */
async function sendEmail({ serviceId, templateId, templateParams = {}, publicKey }) {
  // Guard against missing credentials
  if (!serviceId || !templateId || !publicKey) {
    const missing = [];
    if (!serviceId) missing.push('serviceId');
    if (!templateId) missing.push('templateId');
    if (!publicKey) missing.push('publicKey');
    throw new Error(`Missing EmailJS configuration: ${missing.join(', ')}`);
  }

  // Explicitly prevent using the "default_service" string, forcing explicit service selection
  if (serviceId.trim() === 'default_service') {
    throw new Error('EmailJS "default_service" keyword is blocked to prevent sending via unintended default Gmail account.');
  }

  try {
    console.info(`[EmailJS] Initiating send request for service: ${serviceId}, template: ${templateId}`);
    const res = await emailjs.send(serviceId, templateId, templateParams, { publicKey });
    console.info(`[EmailJS] Email sent successfully. Status: ${res.status}, Text: ${res.text}`);
    return res;
  } catch (err) {
    console.error(`[EmailJS] Failed to send email for service: ${serviceId}, template: ${templateId}. Error:`, err);
    throw err;
  }
}

/**
 * Sends an email for the Portfolio Contact Form.
 * Strictly uses contact-scoped environment variables.
 */
export async function sendContactEmail(templateParams) {
  const serviceId = import.meta.env.VITE_EMAILJS_CONTACT_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_CONTACT_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Contact Form EmailJS credentials are not configured. Please define VITE_EMAILJS_CONTACT_SERVICE_ID, VITE_EMAILJS_CONTACT_TEMPLATE_ID, and VITE_EMAILJS_CONTACT_PUBLIC_KEY in your environment.');
  }

  return sendEmail({ serviceId, templateId, templateParams, publicKey });
}

/**
 * Sends an email for the AI Assistant notifications.
 * Strictly uses AI-scoped environment variables.
 */
export async function sendAIEmail(templateParams) {
  const serviceId = import.meta.env.VITE_EMAILJS_AI_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_AI_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_AI_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('AI Assistant EmailJS credentials are not configured. Please define VITE_EMAILJS_AI_SERVICE_ID, VITE_EMAILJS_AI_TEMPLATE_ID, and VITE_EMAILJS_AI_PUBLIC_KEY in your environment.');
  }

  return sendEmail({ serviceId, templateId, templateParams, publicKey });
}

/**
 * Sends an email for future Collaboration Inquiries.
 * Strictly uses collaboration-scoped environment variables.
 */
export async function sendCollabEmail(templateParams) {
  const serviceId = import.meta.env.VITE_EMAILJS_COLLAB_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_COLLAB_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_COLLAB_PUBLIC_KEY;

  if (!serviceId || !templateId || !publicKey) {
    throw new Error('Collaboration Inquiries EmailJS credentials are not configured. Please define VITE_EMAILJS_COLLAB_SERVICE_ID, VITE_EMAILJS_COLLAB_TEMPLATE_ID, and VITE_EMAILJS_COLLAB_PUBLIC_KEY in your environment.');
  }

  return sendEmail({ serviceId, templateId, templateParams, publicKey });
}

export default { sendEmail, sendContactEmail, sendAIEmail, sendCollabEmail };
