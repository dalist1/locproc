import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createGoogleGenerativeAI } from '@ai-sdk/google';

const systemPrompt = `You are a precise address extractor. From the provided transcripts, determine the street address of the university where Andrzej Maj lectures.
Output ONLY the complete street address with building number in, nothing else. Do not include city, state, or country.
Format example: "ul. Example Street 123" or "ul. University Avenue 45"
Do not include any explanations, context, or additional information.`;

export async function POST(request: Request) {
  const { content } = await request.json();
  
  try {
    const { text } = await generateText({
      model: createGoogleGenerativeAI({ apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY! })('gemini-exp-1121'),
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content }
      ],
      temperature: 0,
      maxTokens: 100,
      stopSequences: ['\n'],
    });

    return NextResponse.json({ text: text.trim() });
  } catch (error) {
    console.error('AI processing error:', error);
    return NextResponse.json({ error: 'AI processing failed' }, { status: 500 });
  }
}
