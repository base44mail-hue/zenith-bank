
import { GoogleGenAI } from "@google/genai";
import type { Transaction } from '../types';

if (!process.env.API_KEY) {
    console.warn("API_KEY environment variable not set. AI Assistant will not work.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

export const analyzeTransactions = async (query: string, transactions: Transaction[]): Promise<string> => {
  if (!process.env.API_KEY) {
    return "The AI Assistant is currently unavailable because the API key is not configured.";
  }

  const model = 'gemini-2.5-flash';
  
  const transactionData = JSON.stringify(transactions.map(t => ({
      date: t.date,
      description: t.description,
      amount: t.amount,
      category: t.category,
    })), null, 2);

  const systemInstruction = `You are a friendly and helpful bank AI assistant for Zenith Bank. Your goal is to analyze a user's transaction data to answer their questions about their finances. The user's transaction history is provided below in JSON format. Use this data to answer the user's query. Be concise, helpful, and present data in a clear, easy-to-understand format. If the user asks a question not related to their banking data, politely decline and steer the conversation back to their finances. Today's date is ${new Date().toLocaleDateString()}.

Transaction Data:
${transactionData}`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: query,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "Sorry, I encountered an error while analyzing your request. Please try again later.";
  }
};
