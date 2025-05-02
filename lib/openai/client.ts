// Check if OpenAI API key exists
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.warn('Missing OpenAI API key. ChatGPT integration will not work.');
}

// Define the model to use (now handled server-side)
export const MODEL = 'gpt-4o-mini'; 

/**
 * Helper function to create a chat completion by calling our secure API route
 */
export async function createChatCompletion(messages: Array<{ role: string, content: string }>) {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error ?? 'Failed to generate AI response');
    }

    const data = await response.json();
    return data.content;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate AI response');
  }
}
