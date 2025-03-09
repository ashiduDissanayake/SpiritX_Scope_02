'use client';
import { useState, useRef, useEffect } from 'react';
import { chatbotService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function Spiriter() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hi! I'm Spiriter, your cricket fantasy assistant. How can I help you?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const messagesEndRef = useRef(null);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // Handle sending messages
  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim() || loading || !isAuthenticated) return;
    
    // Add user message
    const userMessage = { sender: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and set loading
    setInput('');
    setLoading(true);
    
    try {
      // Send query to chatbot API
      const response = await chatbotService.sendQuery(input);
      
      // Add bot response
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: response.message 
      }]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      
      // Add error message
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I don't have enough knowledge to answer that question."
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };
  
  return (
    <>
      {/* Chatbot toggle button */}
      <button 
        className="fixed bottom-6 right-6 z-40 bg-gradient-to-r from-primary to-primary-dark text-light py-3 px-6 rounded-full shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2 group"
        onClick={toggleChatbot}
      >
        {isOpen ? (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Close Spiriter
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
              <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
            </svg>
            <span>Ask Spiriter</span>
            <span className="absolute right-0 top-0 w-3 h-3 bg-boundary rounded-full animate-ping opacity-75"></span>
          </>
        )}
      </button>
      
      {/* Chatbot dialog */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-full max-w-sm bg-dark-lighter border border-dark-lightest rounded-xl shadow-2xl z-50 overflow-hidden animate-slide-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary-dark to-primary px-4 py-3 flex justify-between items-center">
            <h3 className="text-light font-medium flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 3.5a1.5 1.5 0 013 0V4a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-.5a1.5 1.5 0 000 3h.5a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-.5a1.5 1.5 0 00-3 0v.5a1 1 0 01-1 1H6a1 1 0 01-1-1v-3a1 1 0 00-1-1h-.5a1.5 1.5 0 010-3H4a1 1 0 001-1V6a1 1 0 011-1h3a1 1 0 001-1v-.5z" />
              </svg>
              Spiriter - Cricket Assistant
            </h3>
            <button 
              className="text-light/80 hover:text-light transition-colors"
              onClick={toggleChatbot}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 bg-dark">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`mb-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
              >
                <div className={`rounded-lg px-4 py-2 inline-block ${
                  msg.sender === 'user' 
                    ? 'bg-primary text-light rounded-tr-none' 
                    : 'bg-dark-lighter text-light rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="mb-3 max-w-[85%] mr-auto">
                <div className="rounded-lg px-4 py-3 bg-dark-lighter text-light rounded-tl-none inline-block">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-light-darkest animate-bounce"></div>
                    <div className="w-2 h-2 rounded-full bg-light-darkest animate-bounce" style={{ animationDelay: "0.15s" }}></div>
                    <div className="w-2 h-2 rounded-full bg-light-darkest animate-bounce" style={{ animationDelay: "0.3s" }}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Input area */}
          <form 
            className="p-3 border-t border-dark-lightest flex gap-2"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about players or team suggestions..."
              disabled={loading || !isAuthenticated}
              className="flex-1 bg-dark-lightest text-light px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/60 disabled:opacity-70"
            />
            <button 
              type="submit"
              disabled={loading || !input.trim() || !isAuthenticated}
              className="bg-primary hover:bg-primary-dark disabled:bg-primary/50 text-light px-4 py-2 rounded-lg transition-colors disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </form>
          
          {!isAuthenticated && (
            <div className="px-3 py-2 bg-boundary/10 text-boundary text-center text-sm">
              Please login to use Spiriter
            </div>
          )}
        </div>
      )}
    </>
  );
}