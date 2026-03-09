import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key',
});

const prisma = new PrismaClient();

export const generateAIResponse = async (
    businessId: string,
    userMessage: string,
    conversationHistory: any[]
): Promise<string> => {
    const business = await prisma.business.findUnique({
        where: { id: businessId },
    });

    if (!business) throw new Error('Business not found');

    const systemPrompt = `
You are an AI assistant for a business named "${business.name}".
Description: ${business.description || 'N/A'}
Products: ${business.products || 'N/A'}
FAQ: ${business.faq || 'N/A'}

Answer the customer's questions politely, accurately, and concisely based *only* on the provided information. 
Do not hallucinate products or policies. If you don't know the answer, politely ask them to wait for a human representative.
  `;

    const messages = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.map((m) => ({
            role: m.role === 'USER' ? 'user' : 'assistant',
            content: m.content
        })),
        // For OpenAI we remove the last duplicate if history includes the current message.
        // Since we saved User message first, we can just supply history directly.
    ];

    const completion = await openai.chat.completions.create({
        messages: messages as any,
        model: 'gpt-3.5-turbo',
    });

    return completion.choices[0].message?.content || 'Sorry, I am unable to process your request at the moment.';
};
