import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  Bot, 
  User, 
  Trash2, 
  ExternalLink, 
  ArrowUpRight, 
  Copy, 
  Check, 
  RotateCcw,
  Zap,
  TrendingUp,
  Mail,
  Phone,
  Calendar,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { NavPage } from '../../types/portfolio';
import { ThemeMode, ColorThemeId } from '../../types/theme';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AiChatbotProps {
  onNavigate?: (page: NavPage) => void;
  themeMode?: ThemeMode;
  currentTheme?: ColorThemeId;
}

const SUGGESTED_PROMPTS = [
  { label: '📈 Scale E-commerce ROAS', prompt: 'How do you scale e-commerce ROAS to 4x+ with Meta and Google Ads?' },
  { label: '💼 Services & Pricing', prompt: 'What services and pricing packages do you offer?' },
  { label: '🏆 View Case Studies', prompt: 'Can you show me your top client case studies and revenue results?' },
  { label: '📅 Book Consultation', prompt: 'How can I schedule a strategy consultation with Sayed?' },
  { label: '🎯 Conversion Rate Audit', prompt: 'What is included in your $450 one-time growth audit?' }
];

export const AiChatbot: React.FC<AiChatbotProps> = ({ onNavigate, themeMode = 'dark' }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [inputText, setInputText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  const initialGreeting: Message = {
    id: 'msg-init',
    role: 'model',
    text: `👋 **Hi there! I'm Sayed's AI Marketing Assistant.**\n\nI can help answer questions about **Sayed Ahmed Sijan's** performance marketing services, 4.2x+ ROAS case studies, pricing packages, or help you book a 1-on-1 strategy call.\n\nHow can I help grow your brand today?`,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState<Message[]>(() => {
    try {
      const saved = localStorage.getItem('portfolio_chat_messages');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return [initialGreeting];
  });

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Auto-scroll when messages change or while loading
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
    }
  }, [messages, isLoading, isOpen, isMinimized]);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('portfolio_chat_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 150);
    }
  }, [isOpen, isMinimized]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputText).trim();
    if (!text || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      // Build history for backend
      const history = messages
        .filter(m => m.id !== 'msg-init')
        .map(m => ({
          role: m.role,
          text: m.text
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history })
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || "I'm here to assist you with Sayed's services. How can I help further?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages([...newMessages, botMessage]);
    } catch (err) {
      console.error('Failed to query chatbot API:', err);
      // Fallback local response
      const fallbackMessage: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: `Thank you for your message! You can reach Sayed directly at **${PERSONAL_INFO.email}** or on WhatsApp at **[${PERSONAL_INFO.phone}](${PERSONAL_INFO.whatsappUrl})** to discuss your project in detail.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages([...newMessages, fallbackMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([initialGreeting]);
    try {
      localStorage.removeItem('portfolio_chat_messages');
    } catch {
      // ignore
    }
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Simple Markdown link and bold formatter
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');

    return lines.map((line, lineIdx) => {
      // Parse markdown bold **text** and [link](url)
      const parts = [];
      let remaining = line;
      let key = 0;

      // Regular expression for bold and links
      const tokenRegex = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
      const tokens = remaining.split(tokenRegex);

      return (
        <div key={lineIdx} className={line.trim() === '' ? 'h-2' : 'min-h-[1.25rem]'}>
          {tokens.map((token, tIdx) => {
            if (token.startsWith('**') && token.endsWith('**')) {
              return <strong key={tIdx} className="font-bold text-white dark:text-white">{token.slice(2, -2)}</strong>;
            } else if (token.startsWith('[') && token.includes('](') && token.endsWith(')')) {
              const match = token.match(/\[([^\]]+)\]\(([^)]+)\)/);
              if (match) {
                const [, linkText, url] = match;
                return (
                  <a
                    key={tIdx}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-0.5 text-cyan-400 hover:text-cyan-300 underline font-semibold transition-colors"
                  >
                    {linkText}
                    <ArrowUpRight className="w-3 h-3 inline" />
                  </a>
                );
              }
            } else if (token.startsWith('- ') || token.startsWith('* ')) {
              return (
                <span key={tIdx} className="inline-flex items-start gap-1.5 pl-1">
                  <span className="text-[#e7040f] font-bold">•</span>
                  <span>{token.slice(2)}</span>
                </span>
              );
            }
            return <span key={tIdx}>{token}</span>;
          })}
        </div>
      );
    });
  };

  return (
    <div id="ai-chatbot-root" className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Chat Trigger Button when closed */}
      {!isOpen && (
        <div className="relative group">
          {/* Tooltip badge */}
          <div className="absolute right-0 bottom-full mb-3 hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#141414] border border-[#e7040f]/40 text-[#ffffff] text-xs font-semibold shadow-xl whitespace-nowrap pointer-events-none group-hover:scale-105 transition-all shadow-black/80">
            <Sparkles className="w-3.5 h-3.5 text-[#e7040f] animate-spin" />
            <span>Chat with Sayed AI</span>
            <span className="w-2 h-2 rounded-full bg-[#e7040f] animate-pulse" />
          </div>

          <button
            id="open-ai-chat-btn"
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-2.5 p-3 sm:px-4 sm:py-3 rounded-full bg-[#141414] text-[#ffffff] font-bold shadow-2xl shadow-black hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-[#e7040f] cursor-pointer hover:shadow-[#e7040f]/40 hover:bg-[#1f1f1f]"
            aria-label="Open AI Chatbot"
          >
            {/* Live pulsing ring in #e7040f */}
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e7040f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#e7040f] border-2 border-[#000000]"></span>
            </span>

            {/* Avatar thumbnail */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#ffffff]/30 shrink-0">
              <img 
                src={PERSONAL_INFO.avatar} 
                alt="Sayed Ahmed Sijan" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="hidden sm:flex flex-col text-left">
              <span className="text-xs font-bold leading-tight flex items-center gap-1 text-[#ffffff]">
                Sayed AI <Sparkles className="w-3 h-3 text-[#e7040f]" />
              </span>
              <span className="text-[10px] text-[#e7040f] font-semibold">Online Assistant</span>
            </div>

            <MessageSquare className="w-5 h-5 sm:hidden text-[#e7040f]" />
          </button>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          id="ai-chatbot-window"
          className={`w-[calc(100vw-2rem)] sm:w-[420px] max-w-full bg-[#000000] border-2 border-[#e7040f]/60 rounded-3xl shadow-2xl shadow-black flex flex-col overflow-hidden transition-all duration-300 ${
            isMinimized ? 'h-16' : 'h-[580px] max-h-[82vh]'
          }`}
        >
          {/* Header */}
          <div className="px-4 py-3.5 bg-[#141414] border-b border-[#e7040f]/30 flex items-center justify-between shrink-0 select-none">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#e7040f] shadow-md shadow-[#e7040f]/20">
                  <img 
                    src={PERSONAL_INFO.avatar} 
                    alt="Sayed Ahmed Sijan" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#e7040f] border-2 border-[#141414]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-[#ffffff] tracking-tight">Sayed AI Assistant</h3>
                  <span className="px-1.5 py-0.5 rounded bg-[#e7040f]/20 border border-[#e7040f]/50 text-[9px] font-mono font-bold text-[#e7040f]">
                    GEMINI
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#e7040f] animate-pulse" />
                  <span>Online • Digital Marketer AI</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ffffff] hover:bg-[#ffffff]/10 transition-colors cursor-pointer"
                title="Clear Conversation"
                aria-label="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ffffff] hover:bg-[#ffffff]/10 transition-colors cursor-pointer"
                title={isMinimized ? "Expand" : "Minimize"}
                aria-label="Toggle minimize"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-[#ffffff] hover:bg-[#ffffff]/10 transition-colors cursor-pointer"
                title="Close Chat"
                aria-label="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs bg-[#000000]">
                {messages.map((msg) => {
                  const isUser = msg.role === 'user';
                  return (
                    <div
                      key={msg.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <div className="w-7 h-7 rounded-full bg-[#141414] border border-[#e7040f]/60 flex items-center justify-center shrink-0 mt-0.5">
                          <Bot className="w-4 h-4 text-[#e7040f]" />
                        </div>
                      )}

                      <div className={`flex flex-col max-w-[85%] ${isUser ? 'items-end' : 'items-start'}`}>
                        <div
                          className={`p-3.5 rounded-2xl relative group ${
                            isUser
                              ? 'bg-[#e7040f] text-[#ffffff] rounded-br-none shadow-md shadow-[#e7040f]/30 font-medium'
                              : 'bg-[#141414] border border-white/10 text-zinc-200 rounded-bl-none shadow-lg'
                          }`}
                        >
                          <div className="leading-relaxed whitespace-pre-wrap">
                            {renderFormattedText(msg.text)}
                          </div>

                          {/* Copy button on hover */}
                          <button
                            onClick={() => handleCopy(msg.id, msg.text)}
                            className="absolute top-2 right-2 p-1 rounded bg-[#000000]/60 text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-[#ffffff]"
                            title="Copy message"
                          >
                            {copiedId === msg.id ? <Check className="w-3 h-3 text-[#e7040f]" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                        <span className="text-[10px] text-zinc-500 mt-1 px-1">{msg.timestamp}</span>
                      </div>

                      {isUser && (
                        <div className="w-7 h-7 rounded-full bg-[#141414] border border-zinc-700 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-4 h-4 text-zinc-300" />
                        </div>
                      )}
                    </div>
                  );
                })}

                {isLoading && (
                  <div className="flex gap-2.5 justify-start items-center">
                    <div className="w-7 h-7 rounded-full bg-[#141414] border border-[#e7040f]/60 flex items-center justify-center shrink-0">
                      <Bot className="w-4 h-4 text-[#e7040f]" />
                    </div>
                    <div className="p-3.5 rounded-2xl bg-[#141414] border border-white/10 text-zinc-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#e7040f] animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-[#e7040f]/70 animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-[#e7040f]/40 animate-bounce [animation-delay:0.4s]" />
                      <span className="text-[11px] text-zinc-400 ml-1">Sayed AI is thinking...</span>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Quick Prompts */}
              {messages.length <= 2 && (
                <div className="px-3 py-2 border-t border-white/10 bg-[#141414] overflow-x-auto">
                  <p className="text-[10px] font-mono uppercase text-[#ffffff] font-semibold mb-1.5 px-1 flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-[#e7040f]" /> Quick Questions:
                  </p>
                  <div className="flex gap-1.5 whitespace-nowrap overflow-x-auto pb-1 scrollbar-none">
                    {SUGGESTED_PROMPTS.map((item, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(item.prompt)}
                        className="px-2.5 py-1.5 rounded-xl bg-[#000000] hover:bg-[#1a1a1a] border border-white/15 hover:border-[#e7040f] text-[11px] text-zinc-300 hover:text-[#ffffff] transition-all cursor-pointer shrink-0"
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Contact Action Bar */}
              <div className="px-3 py-2 bg-[#141414] border-t border-white/10 flex items-center justify-between text-[11px] text-zinc-400">
                <span className="hidden sm:inline text-zinc-400">Direct Contact:</span>
                <div className="flex items-center gap-2 ml-auto">
                  <a
                    href={PERSONAL_INFO.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-[#ffffff] hover:text-[#e7040f] transition-colors font-semibold"
                  >
                    <Phone className="w-3 h-3 text-[#e7040f]" /> WhatsApp
                  </a>
                  <span className="text-zinc-600">•</span>
                  <a
                    href={`mailto:${PERSONAL_INFO.email}`}
                    className="flex items-center gap-1 text-[#ffffff] hover:text-[#e7040f] transition-colors font-semibold"
                  >
                    <Mail className="w-3 h-3 text-[#e7040f]" /> Email
                  </a>
                  {onNavigate && (
                    <>
                      <span className="text-zinc-600">•</span>
                      <button
                        onClick={() => {
                          onNavigate('contact');
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-1 text-[#e7040f] hover:text-[#ffffff] transition-colors font-semibold cursor-pointer"
                      >
                        <Calendar className="w-3 h-3 text-[#e7040f]" /> Book Call
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Input Footer */}
              <div className="p-3 bg-[#141414] border-t border-white/10">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex items-center gap-2"
                >
                  <textarea
                    ref={inputRef}
                    rows={1}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about marketing, ROAS audits, pricing..."
                    className="flex-1 bg-[#000000] border border-white/20 rounded-xl px-3.5 py-2.5 text-xs text-[#ffffff] placeholder:text-zinc-500 focus:outline-none focus:border-[#e7040f] focus:ring-1 focus:ring-[#e7040f] resize-none max-h-24 transition-all"
                  />
                  <button
                    type="submit"
                    disabled={!inputText.trim() || isLoading}
                    className="p-2.5 rounded-xl bg-[#e7040f] hover:bg-[#ff1a26] text-[#ffffff] disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-[#e7040f]/40 active:scale-95 transition-all cursor-pointer shrink-0"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4 text-[#ffffff]" />
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
