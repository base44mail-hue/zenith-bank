
import React, { useState, useRef, useEffect } from 'react';
import type { Transaction } from '../types';
import { analyzeTransactions } from '../services/geminiService';
import { AiAssistantIcon, SendIcon } from './icons/Icon';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

interface AiAssistantProps {
  transactions: Transaction[];
}

const ChatMessage: React.FC<{ message: Message }> = ({ message }) => {
  const isUser = message.sender === 'user';
  return (
    <div className={`flex items-start gap-3 my-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-10 h-10 flex-shrink-0 bg-primary rounded-full flex items-center justify-center">
          <AiAssistantIcon className="w-6 h-6 text-white" />
        </div>
      )}
      <div className={`px-4 py-3 rounded-2xl max-w-sm md:max-w-md ${isUser ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-dark rounded-bl-none'}`}>
        <p className="text-sm">{message.text}</p>
      </div>
    </div>
  );
};


export const AiAssistant: React.FC<AiAssistantProps> = ({ transactions }) => {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'ai', text: "Hello! I'm your financial assistant. How can I help you analyze your spending today? Try asking 'Summarize my spending last week' or 'How much did I spend on groceries?'" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (input.trim() === '' || isLoading) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const aiResponse = await analyzeTransactions(input, transactions);
      const aiMessage: Message = { text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = { text: "Sorry, I'm having trouble connecting. Please try again later.", sender: 'ai' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md h-[75vh] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-gray-800">AI Financial Assistant</h2>
        <p className="text-sm text-gray-500">Ask me anything about your transactions</p>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => <ChatMessage key={index} message={msg} />)}
        {isLoading && (
            <div className="flex items-start gap-3 my-4 justify-start">
                <div className="w-10 h-10 flex-shrink-0 bg-primary rounded-full flex items-center justify-center">
                    <AiAssistantIcon className="w-6 h-6 text-white" />
                </div>
                <div className="px-4 py-3 rounded-2xl max-w-sm md:max-w-md bg-gray-200 text-dark rounded-bl-none">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                    </div>
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="p-4 border-t bg-gray-50 rounded-b-xl">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your message..."
            className="w-full py-3 pl-4 pr-12 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary"
            disabled={isLoading}
          />
          <button onClick={handleSend} disabled={isLoading} className="absolute inset-y-0 right-0 flex items-center justify-center w-12 h-full text-white bg-primary rounded-r-full hover:bg-blue-900 disabled:bg-gray-400 transition-colors">
            <SendIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
