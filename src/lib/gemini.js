import { GoogleGenerativeAI } from "@google/generative-ai";

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
  return import.meta.env.VITE_GEMINI_API_KEY || "";
};

export const getGeminiResponse = async (history, message) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not configured in environment variables.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

  // Robust model selection with fallback chain:
  // gemini-3-flash-preview -> gemini-3.1-flash-lite -> gemini-flash-lite-latest
  const models = [
    "gemini-3-flash-preview",
    "gemini-3.1-flash-lite",
    "gemini-flash-lite-latest"
  ];

  let lastError = null;

  for (const modelName of models) {
    try {
      const model = genAI.getGenerativeModel({
        model: modelName,
        systemInstruction: SYSTEM_INSTRUCTION,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 800,
        }
      });

      // Ensure the history starts with a 'user' message as required by the Gemini SDK.
      const firstUserIdx = history.findIndex(msg => msg.sender === "user");
      const relevantHistory = firstUserIdx !== -1 ? history.slice(firstUserIdx) : [];

      // Format history to match Gemini SDK expectations:
      // { role: "user" | "model", parts: [{ text: string }] }
      const formattedHistory = relevantHistory.map(msg => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }]
      }));

      const chat = model.startChat({
        history: formattedHistory,
      });

      const result = await chat.sendMessage(message);
      const responseText = result.response.text();

      if (responseText) {
        return responseText;
      }
    } catch (err) {
      console.warn(`Model ${modelName} failed or rate limited:`, err);
      lastError = err;
      // Continue to fallback model
    }
  }

  // Handle specific rate limit or other error messages
  if (lastError && lastError.message) {
    if (lastError.message.includes("quota") || lastError.message.includes("429")) {
      throw new Error("The AI Assistant is currently experiencing high demand. Please try again in a few seconds.");
    }
  }

  throw lastError || new Error("Failed to get response from Gemini API.");
};
