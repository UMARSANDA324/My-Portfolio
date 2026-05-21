import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, 
  MessageSquare, 
  X, 
  Sparkles, 
  CornerDownLeft, 
  AlertCircle, 
  ArrowRight,
  Bot,
  User,
  RefreshCw
} from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { getGeminiResponse } from '../lib/gemini';

// Helper to format markdown bold, links, code, and lists
const formatMessageText = (text) => {
  if (!text) return "";
  
  const lines = text.split("\n");
  
  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();
    const isBullet = trimmed.startsWith("- ") || trimmed.startsWith("* ");
    const content = isBullet ? trimmed.substring(2) : line;
    
    // Parse inline tokens: bold, code, links
    const parseInline = (str) => {
      const tokens = [];
      let currentStr = str;
      const regex = /(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g;
      let match;
      let lastIndex = 0;
      
      while ((match = regex.exec(currentStr)) !== null) {
        const index = match.index;
        const matchStr = match[0];
        
        if (index > lastIndex) {
          tokens.push({ type: "text", content: currentStr.substring(lastIndex, index) });
        }
        
        if (matchStr.startsWith("**") && matchStr.endsWith("**")) {
          tokens.push({ type: "bold", content: matchStr.slice(2, -2) });
        } else if (matchStr.startsWith("`") && matchStr.endsWith("`")) {
          tokens.push({ type: "code", content: matchStr.slice(1, -1) });
        } else if (matchStr.startsWith("[") && matchStr.includes("](")) {
          const closeLabelIdx = matchStr.indexOf("]");
          const label = matchStr.slice(1, closeLabelIdx);
          const url = matchStr.slice(closeLabelIdx + 2, -1);
          tokens.push({ type: "link", label, url });
        }
        
        lastIndex = regex.lastIndex;
      }
      
      if (lastIndex < currentStr.length) {
        tokens.push({ type: "text", content: currentStr.substring(lastIndex) });
      }
      
      if (tokens.length === 0) {
        return str;
      }
      
      return tokens.map((token, idx) => {
        switch (token.type) {
          case "bold":
            return <strong key={idx} className="font-bold text-white">{token.content}</strong>;
          case "code":
            return <code key={idx} className="bg-slate-900/80 border border-white/5 text-blue-300 font-mono text-xs px-1.5 py-0.5 rounded">{token.content}</code>;
          case "link":
            return (
              <a 
                key={idx} 
                href={token.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-primary hover:underline font-semibold inline-flex items-center gap-0.5"
              >
                {token.label}
              </a>
            );
          default:
            return token.content;
        }
      });
    };
    
    const parsedLine = parseInline(content);
    
    if (isBullet) {
      return (
        <li key={lineIdx} className="ml-4 list-disc pl-1 mb-1 text-gray-300">
          {parsedLine}
        </li>
      );
    }
    
    return (
      <p key={lineIdx} className={line.trim() === "" ? "h-2" : "mb-2 text-gray-300 leading-relaxed"}>
        {parsedLine}
      </p>
    );
  });
};

// Word-by-word typing simulator for model messages
const SimulatedTypingMessage = ({ text, onComplete }) => {
  const [displayedText, setDisplayedText] = useState("");
  const textRef = useRef(text);
  
  useEffect(() => {
    textRef.current = text;
    const words = text.split(" ");
    let currentWordIndex = 0;
    setDisplayedText("");
    
    const interval = setInterval(() => {
      if (currentWordIndex < words.length) {
        setDisplayedText(prev => {
          return prev ? prev + " " + words[currentWordIndex] : words[currentWordIndex];
        });
        currentWordIndex++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 25);
    
    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <>{formatMessageText(displayedText)}</>;
};

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Load initial messages from sessionStorage if available, otherwise set default greeting
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("portfolio_chat_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved chat history", e);
      }
    }
    return [
      {
        id: "welcome",
        sender: "model",
        text: "Hi there! 👋 I am Umar Sanda's AI. Ask me anything about my projects, experience, skills, or how to contact me!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFinishedTyping: true // Don't animate typing for the initial welcome message
      }
    ];
  });

  const messagesEndRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Suggested prompts
  const suggestedQuestions = [
    { text: "What is Umar's tech stack?", label: "Tech Stack" },
    { text: "Tell me about PowerSense.", label: "PowerSense" },
    { text: "Show me AHASAS Construction site.", label: "AHASAS Construction" },
    { text: "How can I contact Umar?", label: "Contact Info" }
  ];

  // Save messages to sessionStorage on update
  useEffect(() => {
    sessionStorage.setItem("portfolio_chat_history", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom helper
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend) => {
    const messageText = textToSend || input.trim();
    if (!messageText) return;

    setError(null);
    if (!textToSend) setInput("");

    // Add user message
    const userMsgId = `user-${Date.now()}`;
    const userMsg = {
      id: userMsgId,
      sender: "user",
      text: messageText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isFinishedTyping: true
    };

    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      // Exclude current/future unfinished messages from the API history
      const historyForAPI = messages.filter(m => m.isFinishedTyping);
      
      const reply = await getGeminiResponse(historyForAPI, messageText);
      
      const aiMsg = {
        id: `ai-${Date.now()}`,
        sender: "model",
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFinishedTyping: false
      };
      
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to connect to the Gemini API.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const markMessageAsTyped = (msgId) => {
    setMessages(prev => 
      prev.map(m => m.id === msgId ? { ...m, isFinishedTyping: true } : m)
    );
  };

  const clearChat = () => {
    const initialGreeting = [
      {
        id: "welcome",
        sender: "model",
        text: "Hi there! 👋 I am Umar Sanda's AI. Ask me anything about my projects, experience, skills, or how to contact me!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isFinishedTyping: true
      }
    ];
    setMessages(initialGreeting);
    setError(null);
    sessionStorage.removeItem("portfolio_chat_history");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {/* Chat window modal */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 25 }}
            className="absolute bottom-16 right-0 w-[92vw] sm:w-[420px] h-[580px] bg-slate-900/95 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-5 py-4 bg-slate-800/80 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-yellow-400 flex items-center justify-center shadow-lg border border-white/10 shadow-primary/20">
                    <span className="font-bold text-sm tracking-wider text-black select-none">US</span>
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm sm:text-base flex items-center gap-1.5">
                    Umar Sanda's AI
                  </h4>
                  <p className="text-xs text-green-400 font-medium">online now</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button 
                  onClick={clearChat}
                  title="Clear Conversation"
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>
            </div>

            {/* Chat Body */}
            <div 
              ref={chatContainerRef}
              className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
              style={{ scrollbarWidth: 'thin' }}
            >
              {messages.map((msg, index) => {
                const isModel = msg.sender === "model";
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {isModel && (
                      <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-primary flex-shrink-0">
                        <Bot className="w-4 h-4" />
                      </div>
                    )}
                    
                    <div className="flex flex-col max-w-[80%]">
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-md ${
                        msg.sender === "user" 
                          ? "bg-primary text-white rounded-tr-none self-end"
                          : "bg-slate-800/80 border border-white/5 text-gray-150 rounded-tl-none"
                      }`}>
                        {isModel && !msg.isFinishedTyping ? (
                          <SimulatedTypingMessage 
                            text={msg.text} 
                            onComplete={() => markMessageAsTyped(msg.id)} 
                          />
                        ) : (
                          formatMessageText(msg.text)
                        )}
                      </div>
                      <span className={`text-[10px] text-gray-500 mt-1 ${
                        msg.sender === "user" ? "text-right mr-1" : "text-left ml-1"
                      }`}>
                        {msg.timestamp}
                      </span>
                    </div>

                    {!isModel && (
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                );
              })}

              {/* Loading Indicator */}
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center text-primary flex-shrink-0">
                    <Bot className="w-4 h-4 animate-bounce" />
                  </div>
                  <div className="flex flex-col">
                    <div className="px-4 py-3 bg-slate-800/80 border border-white/5 rounded-2xl rounded-tl-none flex items-center space-x-1.5 h-10">
                      <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2.5 h-2.5 bg-primary/60 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-xs rounded-xl"
                >
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <p className="flex-1">{error}</p>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies */}
            <div className="px-4 pb-2 pt-1 flex flex-wrap gap-2 overflow-x-auto no-scrollbar border-t border-white/5 bg-slate-900/40">
              {suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  disabled={isLoading}
                  className="px-3 py-1.5 text-xs font-medium rounded-full bg-slate-800 hover:bg-slate-700 text-gray-300 hover:text-white border border-white/5 transition-all flex items-center gap-1.5 hover:border-primary/30 disabled:opacity-50 disabled:pointer-events-none"
                >
                  {q.label} <ArrowRight className="w-3 h-3 text-primary" />
                </button>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-3 bg-slate-800/50 border-t border-white/5 flex items-center gap-2">
              <div className="relative flex-1">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="w-full bg-slate-900 border-white/10 text-white rounded-xl placeholder:text-gray-500 pr-10 focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:flex items-center text-[10px] text-gray-500 pointer-events-none">
                  <span className="border border-white/15 px-1 py-0.5 rounded mr-1">Enter</span>
                  <CornerDownLeft className="w-2.5 h-2.5" />
                </div>
              </div>
              <Button
                onClick={() => handleSend()}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="bg-primary hover:bg-primary/90 text-white rounded-xl flex-shrink-0 h-10 w-10 shadow-lg shadow-primary/20"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Chat Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 rounded-full bg-gradient-to-tr from-primary to-yellow-500 text-white flex items-center justify-center shadow-xl shadow-primary/30 relative border border-white/10 hover:shadow-primary/50 transition-shadow duration-300"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <MessageSquare className="w-6 h-6" />
              {/* Pulse effect */}
              <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse flex items-center justify-center" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AIAssistant;
