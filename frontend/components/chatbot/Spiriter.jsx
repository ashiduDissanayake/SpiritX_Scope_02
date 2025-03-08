"use client";
import { useState, useRef, useEffect } from "react";
import { chatbotService } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";
import styles from "./Spiriter.module.css";

export default function Spiriter() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm Spiriter, your cricket fantasy assistant. How can I help you?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();
  const messagesEndRef = useRef(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Parse text to render bold sections
  const parseMessageText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        const boldText = part.slice(2, -2);
        return <strong key={index}>{boldText}</strong>;
      }
      return part;
    });
  };

  // Handle sending messages
  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!input.trim() || loading || !isAuthenticated) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");
    setLoading(true);

    try {
      const response = await chatbotService.sendQuery(input);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: response.message },
      ]);
    } catch (error) {
      console.error("Error getting chatbot response:", error);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "I don't have enough knowledge to answer that question.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <button className={styles.chatbotToggle} onClick={toggleChatbot}>
        {isOpen ? "Close Spiriter" : "Ask Spiriter"}
      </button>

      {isOpen && (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatbotHeader}>
            <h3 className={styles.headerTitle}>Spiriter - Cricket Assistant</h3>
            <button className={styles.closeButton} onClick={toggleChatbot}>
              X
            </button>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[msg.sender]}`}
              >
                {parseMessageText(msg.text)}
              </div>
            ))}

            {loading && (
              <div className={`${styles.message} ${styles.bot}`}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <form className={styles.inputContainer} onSubmit={handleSendMessage}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about players or team suggestions..."
              disabled={loading || !isAuthenticated}
            />
            <button
              type="submit"
              disabled={loading || !input.trim() || !isAuthenticated}
            >
              Send
            </button>
          </form>

          {!isAuthenticated && (
            <div className={styles.authMessage}>
              Please login to use Spiriter
            </div>
          )}
        </div>
      )}
    </>
  );
}