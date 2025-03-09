'use client';

import { useState, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { chatbotService } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useTeam } from '@/context/TeamContext';
import ReactMarkdown from 'react-markdown';

export default function Spiriter() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hi! I'm Spiriter, your cricket fantasy assistant. How can I help you?",
      formatted: false 
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const { team } = useTeam();
  const pathname = usePathname();
  const messagesEndRef = useRef(null);
  
  // Determine current page context
  const getCurrentPageContext = () => {
    if (pathname?.includes('/select-team')) return 'select-team';
    if (pathname?.includes('/my-team')) return 'my-team';
    return null;
  };
  
  // Prepare team data for chatbot
  const getTeamContextData = () => {
    if (!team || !team.teamId) return null;
    
    return {
      teamId: team.teamId,
      budget: {
        total: 9000000,
        remaining: team.remainingBudget
      },
      teamComposition: {
        totalPlayers: team.totalPlayers,
        batsmen: team.players.filter(p => p.category === 'Batsman').length,
        bowlers: team.players.filter(p => p.category === 'Bowler').length,
        allRounders: team.players.filter(p => p.category === 'All-rounder').length
      },
      players: team.players.map(p => ({
        id: p.id,
        name: p.name,
        university: p.university,
        category: p.category,
        isCaptain: p.isCaptain,
        isViceCaptain: p.isViceCaptain
      }))
    };
  };
  
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
    const userMessage = { sender: 'user', text: input, formatted: false };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and set loading
    setInput('');
    setLoading(true);
    
    try {
      // Get current page information
      const currentPage = getCurrentPageContext();
      
      // Send query to chatbot API with context
      const response = await chatbotService.sendQuery(input, {
        currentPage,
        teamContext: getTeamContextData()
      });
      
      // Add bot response
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: response.message,
        formatted: response.formatted || false
      }]);
    } catch (error) {
      console.error('Error getting chatbot response:', error);
      
      // Add error message
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "I don't have enough knowledge to answer that question.",
        formatted: false
      }]);
    } finally {
      setLoading(false);
    }
  };
  
  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen(prev => !prev);
  };
  
  // Render message with or without formatting
  const renderMessage = (message) => {
    if (message.formatted) {
      return (
        <div className="prose prose-sm max-w-none prose-headings:text-indigo-700 prose-strong:text-blue-600 prose-strong:font-bold prose-a:text-blue-600 prose-li:my-1">
          <ReactMarkdown>{message.text}</ReactMarkdown>
        </div>
      );
    }
    return message.text;
  };
  
  return (
    <>
      {/* Chatbot toggle button */}
      <button 
        className={`fixed bottom-5 right-5 px-5 py-3 rounded-full font-bold shadow-lg transition-all duration-300 transform hover:scale-105 z-50
          ${isOpen ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-indigo-600 hover:bg-indigo-700 text-white'}`}
        onClick={toggleChatbot}
        aria-label={isOpen ? 'Close Spiriter' : 'Open Spiriter'}
      >
        {isOpen ? 'Close Spiriter' : 'Ask Spiriter'}
      </button>
      
      {/* Chatbot dialog */}
      {isOpen && (
        <div className="fixed bottom-20 right-5 w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col z-50 overflow-hidden animate-chatbot-slide-in">
          <div className="flex justify-between items-center px-4 py-3 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
            <h3 className="text-lg font-semibold">Spiriter - Cricket Assistant</h3>
            <button 
              className="text-white hover:text-indigo-200 transition-colors"
              onClick={toggleChatbot}
              aria-label="Close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 bg-slate-50">
            {messages.map((msg, index) => (
              <div 
                key={index}
                className={`mb-3 p-3 rounded-lg max-w-[80%] break-words leading-relaxed
                  ${msg.sender === 'user' 
                    ? 'ml-auto bg-indigo-600 text-white rounded-br-sm' 
                    : 'mr-auto bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm'}`}
              >
                {renderMessage(msg)}
              </div>
            ))}
            
            {loading && (
              <div className="mb-3 p-3 rounded-lg max-w-[80%] mr-auto bg-white text-gray-800 border border-gray-200 rounded-bl-sm shadow-sm">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-chatbot-pulse" style={{ animationDelay: '0s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-chatbot-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 rounded-full bg-indigo-400 animate-chatbot-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <form 
            className="flex p-3 border-t border-gray-200 bg-white"
            onSubmit={handleSendMessage}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={getCurrentPageContext() ? "Ask about your team..." : "Ask about players or team suggestions..."}
              disabled={loading || !isAuthenticated}
              aria-label="Chat message input"
              className="flex-1 px-4 py-2 border text-slate-600 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
            <button 
              type="submit"
              disabled={loading || !input.trim() || !isAuthenticated}
              aria-label="Send message"
              className="ml-2 p-2 bg-indigo-600 text-white rounded-full font-medium disabled:bg-gray-400 disabled:cursor-not-allowed hover:bg-indigo-700 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
          
          {!isAuthenticated && (
            <div className="text-center text-red-600 p-2 text-sm font-medium bg-red-50 border-t border-red-200">
              Please login to use Spiriter
            </div>
          )}

          {getCurrentPageContext() && team && team.teamId && (
            <div className="flex items-center justify-center p-2 bg-emerald-50 border-t border-emerald-200 text-xs font-medium text-emerald-700">
              <svg className="w-4 h-4 mr-1 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Team context enabled
            </div>
          )}
        </div>
      )}

      {/* Add animation keyframes */}
      <style jsx global>{`
        @keyframes chatbot-slide-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-chatbot-slide-in {
          animation: chatbot-slide-in 0.3s forwards ease-out;
        }
        
        .animate-chatbot-pulse {
          animation: chatbot-pulse 1.5s infinite;
        }
        
        @keyframes chatbot-pulse {
          0%, 100% {
            opacity: 0.4;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }
      `}</style>
    </>
  );
}