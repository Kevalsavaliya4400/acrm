import React, { useState } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function AIAssistant() {
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'assistant', content: 'Hello! I\'m your AI assistant. I can help you analyze leads, suggest follow-ups, and provide insights. How can I help you today?' }
  ]);
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { type: 'user', content: input }]);
    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'assistant', 
        content: 'I\'m analyzing your request. This is a placeholder response - in a real implementation, this would be connected to an AI service.' 
      }]);
    }, 1000);
    setInput('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-white">AI Assistant</h3>
        </div>
        <button
          onClick={() => setIsMinimized(!isMinimized)}
          className="text-white/80 hover:text-white"
        >
          {isMinimized ? <Bot className="w-5 h-5" /> : <X className="w-5 h-5" />}
        </button>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}