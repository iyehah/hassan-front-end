import { Message } from '../components/chat/MessageBubble';

const API_URL = `${import.meta.env.VITE_HF_API_PROXY_PATH}/${import.meta.env.VITE_HF_API_ENDPOINT}`;
const MODEL = import.meta.env.VITE_HF_MODEL || '';
const API_TOKEN = import.meta.env.VITE_HF_API_TOKEN;

export const generateAIResponse = async (messages: Message[], retries = 5, delay = 5000): Promise<string> => {
  try {
    if (!API_TOKEN) {
      throw new Error('API token is missing. Check VITE_HF_API_TOKEN in .env');
    }

    const prompt = messages
      .map((msg) => `${msg.sender === 'user' ? 'User' : 'Assistant'}: ${msg.content}`)
      .join('\n') + '\nAssistant:';

    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(API_URL, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${API_TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: MODEL,
            inputs: prompt,
            parameters: {
              max_new_tokens: 500,
              temperature: 0.7,
              return_full_text: false,
            },
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          if (response.status === 503 && attempt < retries) {
            console.warn(`Attempt ${attempt} failed with 503, retrying after ${delay}ms...`);
            await new Promise((resolve) => setTimeout(resolve, delay));
            continue;
          }
          throw new Error(`API request failed: ${response.status} ${response.statusText} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();

        // Hugging Face API typically returns an array of generated texts
        const result = Array.isArray(data) && data.length > 0 ? data[0].generated_text : data.generated_text || '';

        // Log the raw result for debugging
        console.log('Raw AI Response:', JSON.stringify(result));

        // Trim the result to remove leading/trailing whitespace
        const trimmedResult = result.trim();

        // Log the trimmed result for comparison
        console.log('Trimmed AI Response:', JSON.stringify(trimmedResult));

        return trimmedResult;
      } catch (error) {
        if (attempt === retries) {
          throw error;
        }
      }
    }
    throw new Error('Max retries reached');
  } catch (error) {
    console.error('Detailed error in generateAIResponse:', error);
    throw error;
  }
};