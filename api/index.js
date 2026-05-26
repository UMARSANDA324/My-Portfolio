import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { GoogleGenerativeAI } from '@google/generative-ai';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables from various possible directories to handle different runner contexts
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// Global safety handlers to log unhandled rejections and uncaught exceptions
process.on('unhandledRejection', (reason, promise) => {
  console.error('[Backend] Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
  console.error('[Backend] Uncaught Exception:', err);
});

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const SYSTEM_INSTRUCTION = `You are the AI portfolio concierge/assistant for Umar Muhammad Muhammad, a professional Full Stack Developer.
Your goal is to answer questions about Umar sanda, his skills, his projects, his experience, and his services, and help users get in touch with him.

About Umar sanda:
- Name: Umar Muhammad Muhammad
- Role: Full Stack Developer (MERN / Full Stack React Developer)
- Experience: 2+ years of professional software development experience, specializing in solving real-world problems.
- Location: Kano State, Nigeria
- Email: um218194@gmail.com
- Phone / Call: 09048166185
- WhatsApp: 09039133907

Technical Skills:
- Frontend: JavaScript (ES6+), React.js, Vite, Tailwind CSS, HTML5, CSS3, shadcn/ui, Framer Motion
- Backend & Databases: Node.js, Express.js, MongoDB, Firebase
- Tools & Devops: Git, GitHub, REST APIs, Automation, Cloud Deployment (Render, Netlify, Vercel), AI Integration

Key Projects:
1. PowerSense: Real-time electricity monitoring platform built to solve electricity uncertainty in local communities.
   - Key Features: Outage reporting, real-time power tracking, maintenance tracking, push notifications.
   - Tech Stack: React, Node.js, Express, MongoDB, Tailwind CSS
   - Live Demo: https://powersense-2.onrender.com
   - GitHub: https://github.com/UMARSANDA324

2. AHASAS Construction Ventures Limited: A premium corporate website engineered for a leading Nigerian construction and infrastructure company.
   - Key Features: Dynamic projects showcase, official Company Profile presentation system (embedded PDF viewer), management presentation, contact system.
   - Tech Stack: React, Tailwind CSS, shadcn/ui, Framer Motion, EmailJS
   - Live Website: http://ahasasconstructionventureslimited.com.ng

3. Auta Tajiri Real Estate: A premium real estate landing page and property business showcase designed for Abdulshahid Abdullahi (Auta Tajiri).
   - Key Features: High-ticket land sales, house acquisitions, and property rentals in Kano State, Nigeria. Focuses on customer engagement.
   - Tech Stack: React, Vite, Tailwind CSS, shadcn/ui, Framer Motion
   - Live Demo: https://autatajiri.netlify.app
   - GitHub: https://github.com/UMARSANDA324

Services Provided:
- Full-Stack Web Development (MERN Stack)
- Custom Web Applications & Responsive UI/UX
- Real-Time Applications & Database Architectures
- AI Assistant Integration (such as Gemini API, OpenAI API)
- E-commerce & Real Estate Platform Development
- REST API Design & Third-party Service Integration (Payment Gateways, EmailJS, maps, etc.)

Contact Information:
- Email: um218194@gmail.com
- WhatsApp: 09039133907
- Phone: 09048166185
- GitHub: https://github.com/UMARSANDA324

Personality and Behavior Guidelines:
- Sound professional, intelligent, friendly, and helpful.
- Behave like a premium portfolio AI assistant.
- Answer briefly but clearly. Avoid long paragraphs; use formatting (bullet points, bold text, markdown) to keep it clean and readable.
- If asked about contact details, provide links/buttons if appropriate or write them clearly.
- If asked about projects, mention the relevant details and link them.
- If asked about something completely unrelated to Umar's portfolio, politely redirect the conversation to Umar's services, skills, or projects. Keep the focus on Umar Muhammad Muhammad.
`;

const getApiKey = () => {
  return process.env.GEMINI_API_KEY;
};

app.post('/api/ai/chat', async (req, res) => {
  // Ensure we always send a JSON response and never leave the request hanging.
  const safeJson = (obj, status = 200) => {
    try {
      res.status(status).json(obj);
    } catch (e) {
      console.error('[Backend] Failed to send JSON response:', e);
      // Fallback minimal JSON
      try { res.status(500).json({ success: false, message: 'Internal server error' }); } catch (__) {}
    }
  };

  try {
    const { history, message } = req.body || {};

    if (!message || typeof message !== 'string' || message.trim() === '') {
      return safeJson({ success: false, message: 'Message is required' }, 400);
    }

    const apiKey = getApiKey();
    const isMissing = !apiKey || apiKey.trim() === '';
    const isPlaceholder = apiKey === 'your_new_secure_key';

    const fallbacks = [
      "Hi there! I am having some technical difficulties connecting to my AI brain (Gemini API) at the moment. However, I can tell you that Umar Muhammad Muhammad is a skilled Full Stack Developer based in Kano State, Nigeria. He has 2+ years of experience specializing in Node.js, React, Express, and MongoDB. You can contact him at um218194@gmail.com or via WhatsApp at 09039133907!",
      "Hello! It looks like I am currently offline from the Gemini network. Here is what you need to know about Umar Muhammad Muhammad: He is a MERN Stack Developer who built PowerSense (https://powersense-2.onrender.com). If you have any inquiries, you can reach out directly to him at um218194@gmail.com or call 09048166185.",
      "Apologies, but my AI connection is currently experiencing high demand or network issues. Let me assist you by providing Umar's details: Umar Sanda is a Full Stack React Developer from Kano, Nigeria. You can view his projects (like AHASAS Construction and Auta Tajiri Real Estate) or contact him via email at um218194@gmail.com."
    ];

    if (isMissing || isPlaceholder) {
      const msg = '[Backend Error] GEMINI_API_KEY is not configured properly.' + (isPlaceholder ? " using placeholder key." : "");
      console.error(msg);
      const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
      return safeJson({ success: true, message: fallback });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const models = [
      'gemini-2.5-flash',
      'gemini-1.5-flash',
      'gemini-1.5-pro',
      'gemini-2.0-flash-exp'
    ];

    let lastError = null;

    // Helper to call model with timeout
    const callModelWithTimeout = async (model, userMessage, formattedHistory, timeoutMs = 15000) => {
      const chat = model.startChat({ history: formattedHistory });

      const promise = (async () => {
        const result = await chat.sendMessage(userMessage);
        const text = result && result.response && typeof result.response.text === 'function' ? result.response.text() : null;
        return text;
      })();

      const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('Model request timed out')), timeoutMs));

      return Promise.race([promise, timeout]);
    };

    for (const modelName of models) {
      try {
        const model = genAI.getGenerativeModel({
          model: modelName,
          systemInstruction: SYSTEM_INSTRUCTION,
          generationConfig: { temperature: 0.7, maxOutputTokens: 800 }
        });

        const firstUserIdx = (history || []).findIndex(msg => msg && msg.sender === 'user');
        const relevantHistory = firstUserIdx !== -1 ? history.slice(firstUserIdx) : [];

        const formattedHistory = relevantHistory.map(msg => ({ role: msg.sender === 'user' ? 'user' : 'model', parts: [{ text: msg.text || '' }] }));

        const responseText = await callModelWithTimeout(model, message, formattedHistory, 15000);

        if (responseText && responseText.trim() !== '') {
          return safeJson({ success: true, message: responseText });
        }
      } catch (err) {
        const errMsg = err && err.message ? err.message : String(err);
        console.warn(`[Backend] Model ${modelName} failed or rate limited:`, errMsg);
        lastError = errMsg;

        // Break early for authentication errors
        const lower = errMsg.toLowerCase();
        if (lower.includes('api key not valid') || lower.includes('invalid key') || lower.includes('403') || lower.includes('forbidden') || lower.includes('api_key_invalid')) {
          break;
        }
      }
    }

    console.error('[Backend] All AI models failed. Last error:', lastError);
    const fallback = fallbacks[Math.floor(Math.random() * fallbacks.length)];
    return safeJson({ success: true, message: fallback });
  } catch (err) {
    const msg = err && err.message ? err.message : 'Unknown server error';
    console.error('[Backend] Unhandled exception in /api/ai/chat:', err);
    try { res.status(500).json({ success: false, message: 'AI request failed' }); } catch (e) {}
  }
});

if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Backend server listening at http://localhost:${port}`);
  });
}

export default app;
