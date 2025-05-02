import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Initialize OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Define the model to use
const MODEL = 'gpt-4o-mini';

export async function POST(request: Request) {
  try {
    // Check if API key is set
    if (!process.env.OPENAI_API_KEY) {
      console.error('Missing OpenAI API key');
      return NextResponse.json(
        { error: 'OpenAI API key is not configured' },
        { status: 500 }
      );
    }

    // Parse the request body
    const body = await request.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format. Messages array is required.' },
        { status: 400 }
      );
    }

    // Log request for debugging (remove sensitive info in production)
    console.log('Making OpenAI request with model:', MODEL);
    console.log('Messages count:', messages.length);

    // Call OpenAI API
    try {
      const completion = await openai.chat.completions.create({
        model: MODEL,
        messages: messages,
        temperature: 0.7,
        max_tokens: 800,
      });

      // Extract the response content
      const content = completion.choices[0]?.message?.content ?? '';
      
      // Return the AI response
      return NextResponse.json({ content });
    } catch (openaiError: any) {
      console.error('OpenAI API Error:', openaiError.message);
      console.error('Status:', openaiError.status);
      console.error('Type:', openaiError.type);
      
      // Return a more specific error with details
      return NextResponse.json(
        { 
          error: 'Failed to get AI response',
          details: openaiError.message,
          status: openaiError.status,
          type: openaiError.type
        },
        { status: openaiError.status || 500 }
      );
    }
  } catch (error: any) {
    // Handle any unexpected errors
    console.error('Unexpected error in chat API route:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred', details: error.message },
      { status: 500 }
    );
  }
}
