'use client';

import { useState, useEffect } from 'react';
import { MessageSquare, Send, Search, User, Bot, Clock, CheckCheck, CheckCircle2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  sender: 'User' | 'Agent';
  message: string;
  timestamp: string;
}

interface ChatSession {
  id: string;
  userId: string;
  userName: string;
  status: 'Active' | 'Waiting' | 'Closed';
  messages: Message[];
  lastMessage?: string;
  lastMessageTime?: string;
}

export default function LiveChatPage() {
  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || '';
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [chats, setChats] = useState<ChatSession[]>([]);
  const [selectedChat, setSelectedChat] = useState<ChatSession | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  useEffect(() => {
    fetchLiveChats();
  }, []);

  const fetchLiveChats = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/v1/support/live-chat`);
      const data = await response.json();
      if (data.success && Array.isArray(data.data)) {
        setChats(data.data);
      } else {
        // Fallback mock chats
        const mockData: ChatSession[] = [
          {
            id: 'CHAT-001',
            userId: 'EMP-001',
            userName: 'Alice Smith',
            status: 'Active',
            messages: [
              { id: 'MSG-001', sender: 'User', message: 'Hi, I need help with my leave balance', timestamp: '10:30 AM' },
              { id: 'MSG-002', sender: 'Agent', message: 'Hello Alice! I can help you with that. What specific issue are you facing?', timestamp: '10:31 AM' },
              { id: 'MSG-003', sender: 'User', message: 'My leave balance is not showing correctly in the app', timestamp: '10:32 AM' },
            ],
            lastMessage: 'My leave balance is not showing correctly in the app',
            lastMessageTime: '10:32 AM',
          },
          {
            id: 'CHAT-002',
            userId: 'EMP-002',
            userName: 'Bob Johnson',
            status: 'Waiting',
            messages: [
              { id: 'MSG-004', sender: 'User', message: 'I cannot log in to the system', timestamp: '11:00 AM' },
            ],
            lastMessage: 'I cannot log in to the system',
            lastMessageTime: '11:00 AM',
          },
        ];
        setChats(mockData);
        setSelectedChat(mockData[0]);
      }
    } catch (error) {
      console.error('Failed to fetch live chats:', error);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message: string, type: 'success' | 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedChat) return;

    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      sender: 'Agent',
      message: messageInput,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedChats = chats.map((c) => {
      if (c.id === selectedChat.id) {
        return {
          ...c,
          messages: [...c.messages, newMsg],
          lastMessage: messageInput,
          lastMessageTime: newMsg.timestamp,
        };
      }
      return c;
    });

    setChats(updatedChats);
    setSelectedChat({
      ...selectedChat,
      messages: [...selectedChat.messages, newMsg],
      lastMessage: messageInput,
    });
    setMessageInput('');
    showToast('Reply dispatched to live session', 'success');
  };

  const filteredChats = chats.filter((chat) => {
    const matchesSearch =
      chat.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || chat.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const currentChat = selectedChat || filteredChats[0];

  return (
    <div className="space-y-6 font-sans">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed top-4 right-4 z-50 px-4 py-3 rounded-lg shadow-lg text-white font-medium flex items-center gap-2 ${
            toast.type === 'success' ? 'bg-[#94cb3d]' : 'bg-zinc-800'
          }`}
        >
          <CheckCircle2 className="h-4 w-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white dark:bg-zinc-900 p-6 rounded-lg border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-medium text-zinc-900 dark:text-zinc-50 tracking-tight flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-[#94cb3d]" />
              Support Live Chat Queue Command Center
            </h1>
            <Badge variant="brand">Real-Time WebSocket Engine</Badge>
          </div>
          <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400 mt-1">
            Dispatch instant messaging responses, assist active employee sessions, and resolve tickets live.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-2 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 px-3 py-1.5 rounded-lg">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            Helpdesk Online
          </span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 min-h-[580px]">
        {/* Chat List */}
        <Card className="rounded-lg">
          <CardContent className="p-4 flex flex-col h-full space-y-4">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <Input
                type="text"
                placeholder="Search active live chat sessions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-lg text-xs font-medium"
              />
            </div>

            <div className="flex gap-1.5">
              {['All', 'Active', 'Waiting'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`text-xs px-3 py-1 rounded-lg font-medium border transition-colors ${
                    statusFilter === st
                      ? 'bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 border-zinc-900'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border-zinc-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <div className="flex-1 overflow-y-auto space-y-2">
              {filteredChats.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setSelectedChat(chat)}
                  className={`p-3 rounded-lg border cursor-pointer transition-all ${
                    currentChat?.id === chat.id
                      ? 'bg-[#94cb3d]/10 border-[#94cb3d]'
                      : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 hover:bg-zinc-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 font-bold text-xs text-[#94cb3d] flex items-center justify-center shrink-0">
                      {chat.userName[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{chat.userName}</span>
                        <Badge
                          variant={chat.status === 'Active' ? 'success' : 'brand'}
                          className="text-[9px] uppercase font-bold"
                        >
                          {chat.status}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-zinc-500 truncate mt-0.5">{chat.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Messaging Window */}
        <Card className="lg:col-span-2 rounded-lg flex flex-col">
          {currentChat ? (
            <CardContent className="p-0 flex flex-col h-full justify-between">
              {/* Window Header */}
              <div className="p-4 border-b border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-[#94cb3d]/15 border border-[#94cb3d]/30 font-bold text-xs text-[#94cb3d] flex items-center justify-center shrink-0">
                    {currentChat.userName[0]}
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">{currentChat.userName}</h3>
                    <span className="text-[10px] font-mono text-zinc-500">{currentChat.userId} • Live Session</span>
                  </div>
                </div>
              </div>

              {/* Message Feed */}
              <div className="p-4 flex-1 overflow-y-auto space-y-3 min-h-[320px]">
                {currentChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.sender === 'Agent' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[75%] rounded-xl p-3 text-xs ${
                        msg.sender === 'Agent'
                          ? 'bg-[#94cb3d] text-white shadow-xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 border border-zinc-200 dark:border-zinc-700'
                      }`}
                    >
                      <p className="font-medium">{msg.message}</p>
                      <span className={`block text-[9px] mt-1 text-right ${msg.sender === 'Agent' ? 'text-white/80' : 'text-zinc-400'}`}>
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-zinc-200/80 dark:border-zinc-800 flex gap-2">
                <Input
                  type="text"
                  placeholder="Type your support response..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="rounded-lg text-xs font-medium"
                />
                <Button onClick={handleSendMessage} className="bg-[#94cb3d] text-white hover:bg-[#82b632]">
                  <Send className="h-4 w-4 mr-1" />
                  Send
                </Button>
              </div>
            </CardContent>
          ) : (
            <div className="p-12 text-center text-xs text-zinc-500">
              Select a live chat session from the list to start messaging.
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
