# My-Portfolio

Portfolio of Umar Muhammad Muhammad, Full Stack Developer based in Kano State, Nigeria.

This project showcases my work, including the PowerSense project, and provides a way to get in touch with me.

EmailJS setup
---------------

1. Copy `My-Portfolio/.env.example` to `My-Portfolio/.env`.
2. Fill the `VITE_EMAILJS_*` variables for the features you need (contact, ai, collab).
3. Restart the dev server so Vite picks up the environment variables.

Notes:
- Each feature uses an explicit `service_id`, `template_id`, and `public_key`.
- The code intentionally prefers feature-scoped variables (e.g. `VITE_EMAILJS_CONTACT_SERVICE_ID`).
- If you previously used a single `VITE_EMAILJS_SERVICE_ID` it will still be used as a fallback.

