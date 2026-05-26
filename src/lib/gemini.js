export const getGeminiResponse = async (history, message, opts = {}) => {
  const controller = new AbortController();
  const timeoutMs = typeof opts.timeout === 'number' ? opts.timeout : 16000;

  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch('/api/ai/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, message }),
      signal: controller.signal,
    });

    // Read raw text first to handle invalid JSON or empty responses
    const text = await response.text();

    if (!text || text.trim() === '') {
      throw new Error('Empty response from server');
    }

    let data;
    try {
      data = JSON.parse(text);
    } catch (parseErr) {
      console.error('Invalid JSON from AI API:', parseErr, 'raw:', text);
      throw new Error('Invalid JSON response from server');
    }

    // Expected structure: { success: boolean, message: string }
    if (typeof data !== 'object' || data === null || typeof data.success !== 'boolean' || typeof data.message !== 'string') {
      console.error('Unexpected API response shape:', data);
      throw new Error('Unexpected API response');
    }

    if (!response.ok || data.success === false) {
      const clientMsg = data.message || 'AI request failed';
      throw new Error(clientMsg);
    }

    return data.message;
  } catch (err) {
    if (err.name === 'AbortError') {
      console.error('AI request aborted due to timeout');
      throw new Error('AI request timed out');
    }
    console.error('AI Assistant API Error:', err);
    throw err;
  } finally {
    clearTimeout(timeout);
  }
};
