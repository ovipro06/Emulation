import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  MessageSquare,
  Search,
  MoreVertical,
  Camera,
  Phone,
  Video,
  Send,
  Paperclip,
  Smile,
  Mic,
  CheckCheck,
  ArrowLeft,
  User,
  Users,
  Clock,
  Sparkles,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'me' | 'them';
  text: string;
  time: string;
}

interface ChatThread {
  id: string;
  name: string;
  avatarBg: string;
  isGroup?: boolean;
  lastMessage: string;
  time: string;
  unreadCount?: number;
  online: boolean;
  messages: ChatMessage[];
}

export const WhatsAppApp: React.FC = () => {
  const { showToast, addLogcat } = useEmulator();

  const [activeTab, setActiveTab] = useState<'chats' | 'status' | 'calls'>('chats');
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [inputText, setInputText] = useState<string>('');

  const [threads, setThreads] = useState<ChatThread[]>([
    {
      id: 'group_android',
      name: 'Android 14 Kernel Lab',
      avatarBg: 'from-emerald-600 to-teal-800',
      isGroup: true,
      lastMessage: 'Magisk v27.0 with Zygisk is running with Play Integrity Pass!',
      time: '11:42 AM',
      unreadCount: 2,
      online: true,
      messages: [
        {
          id: '1',
          sender: 'them',
          text: 'Has anyone flashed the latest Android 14 kernel on the Pixel 8 Pro?',
          time: '11:38 AM',
        },
        {
          id: '2',
          sender: 'them',
          text: 'Magisk v27.0 with Zygisk is running with Play Integrity Pass!',
          time: '11:42 AM',
        },
      ],
    },
    {
      id: 'user_alex',
      name: 'Alex (Kernel Dev)',
      avatarBg: 'from-blue-600 to-indigo-800',
      lastMessage: 'Testing the new Franco governor values right now.',
      time: '10:15 AM',
      online: true,
      messages: [
        {
          id: '1',
          sender: 'them',
          text: 'Hey! Did you check out the new Geekbench scores on your emulator?',
          time: '10:14 AM',
        },
        {
          id: '2',
          sender: 'them',
          text: 'Testing the new Franco governor values right now.',
          time: '10:15 AM',
        },
      ],
    },
    {
      id: 'user_sarah',
      name: 'Sarah Jenkins',
      avatarBg: 'from-purple-600 to-pink-700',
      lastMessage: 'See you at the Google I/O watch party tomorrow!',
      time: 'Yesterday',
      online: false,
      messages: [
        {
          id: '1',
          sender: 'them',
          text: 'Are you coming to the developer summit?',
          time: 'Yesterday',
        },
        {
          id: '2',
          sender: 'them',
          text: 'See you at the Google I/O watch party tomorrow!',
          time: 'Yesterday',
        },
      ],
    },
  ]);

  const activeChat = threads.find((t) => t.id === selectedChatId);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !selectedChatId) return;

    const newMsgText = inputText.trim();
    setInputText('');

    const newMsg: ChatMessage = {
      id: String(Date.now()),
      sender: 'me',
      text: newMsgText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setThreads((prev) =>
      prev.map((t) => {
        if (t.id === selectedChatId) {
          return {
            ...t,
            lastMessage: newMsgText,
            time: 'Just now',
            messages: [...t.messages, newMsg],
          };
        }
        return t;
      })
    );

    addLogcat('I', 'WhatsApp', `Outgoing message to ${activeChat?.name}: "${newMsgText}"`);

    // Simulated quick reply after 1.4s
    setTimeout(() => {
      const replyTexts = [
        'Awesome, testing it right now!',
        'Got it! That looks super clean on Android 14.',
        'Play Protect passed with zero issues.',
        'Nice! Thanks for the update.',
      ];
      const randomReply = replyTexts[Math.floor(Math.random() * replyTexts.length)];

      const incomingMsg: ChatMessage = {
        id: String(Date.now() + 1),
        sender: 'them',
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setThreads((prev) =>
        prev.map((t) => {
          if (t.id === selectedChatId) {
            return {
              ...t,
              lastMessage: randomReply,
              time: 'Just now',
              messages: [...t.messages, incomingMsg],
            };
          }
          return t;
        })
      );
      showToast(`New message from ${activeChat?.name}`);
    }, 1400);
  };

  return (
    <div className="w-full h-full bg-slate-950 text-white flex flex-col font-sans select-none overflow-hidden">
      {/* CONVERSATION VIEW */}
      {selectedChatId && activeChat ? (
        <div className="flex-1 flex flex-col h-full bg-[#0b141a]">
          {/* Chat Header */}
          <div className="bg-[#202c33] px-3 py-2.5 flex items-center justify-between shadow border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSelectedChatId(null)}
                className="p-1 -ml-1 text-slate-300 hover:text-white"
              >
                <ArrowLeft size={18} />
              </button>
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-tr ${activeChat.avatarBg} flex items-center justify-center text-white text-xs font-bold shadow`}
              >
                {activeChat.isGroup ? <Users size={16} /> : activeChat.name[0]}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white truncate max-w-[150px]">
                  {activeChat.name}
                </h3>
                <span className="text-[10px] text-emerald-400 block">
                  {activeChat.online ? 'online' : 'last seen recently'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 text-slate-300">
              <button onClick={() => showToast(`Calling ${activeChat.name}...`)}>
                <Phone size={16} />
              </button>
              <button onClick={() => showToast(`Starting video call with ${activeChat.name}...`)}>
                <Video size={17} />
              </button>
              <MoreVertical size={16} />
            </div>
          </div>

          {/* Messages Area */}
          <div
            className="flex-1 overflow-y-auto p-4 space-y-2.5 scrollbar-none"
            style={{
              backgroundImage: `radial-gradient(#1f2c34 1px, transparent 1px)`,
              backgroundSize: '16px 16px',
            }}
          >
            <div className="text-center my-2">
              <span className="text-[10px] bg-[#182229] text-slate-400 px-3 py-1 rounded-lg shadow">
                🔒 Messages are end-to-end encrypted
              </span>
            </div>

            {activeChat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-3.5 py-2 text-xs shadow-md ${
                    msg.sender === 'me'
                      ? 'bg-[#005c4b] text-white rounded-tr-none'
                      : 'bg-[#202c33] text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="break-words leading-relaxed">{msg.text}</p>
                  <div className="flex items-center justify-end gap-1 mt-1 text-[9px] text-slate-300">
                    <span>{msg.time}</span>
                    {msg.sender === 'me' && (
                      <CheckCheck size={12} className="text-sky-400 inline" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-2 bg-[#202c33] flex items-center gap-2 border-t border-white/5"
          >
            <div className="flex-1 flex items-center gap-2 bg-[#2a3942] rounded-full px-3 py-2 text-white">
              <Smile size={18} className="text-slate-400 cursor-pointer" />
              <input
                type="text"
                placeholder="Message"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none w-full"
              />
              <Paperclip size={16} className="text-slate-400 cursor-pointer" />
              <Camera size={16} className="text-slate-400 cursor-pointer" />
            </div>

            <button
              type="submit"
              className="w-10 h-10 rounded-full bg-[#00a884] text-white flex items-center justify-center shadow hover:scale-105 transition-transform"
            >
              {inputText.trim() ? <Send size={16} className="ml-0.5" /> : <Mic size={18} />}
            </button>
          </form>
        </div>
      ) : (
        /* CHATS LIST VIEW */
        <div className="flex-1 flex flex-col h-full bg-[#111b21]">
          {/* Main Top Header */}
          <div className="bg-[#202c33] px-4 pt-3 pb-2 space-y-3 shadow">
            <div className="flex items-center justify-between">
              <h1 className="text-lg font-bold text-white tracking-tight">WhatsApp</h1>
              <div className="flex items-center gap-4 text-slate-300">
                <Camera size={18} />
                <Search size={18} />
                <MoreVertical size={18} />
              </div>
            </div>

            {/* Top Sub-tabs */}
            <div className="flex border-b border-white/10 text-xs font-bold text-slate-400">
              <button
                onClick={() => setActiveTab('chats')}
                className={`flex-1 pb-2 flex items-center justify-center gap-1.5 border-b-2 ${
                  activeTab === 'chats'
                    ? 'border-[#00a884] text-[#00a884]'
                    : 'border-transparent hover:text-white'
                }`}
              >
                <span>Chats</span>
                <span className="bg-[#00a884] text-black text-[10px] font-black rounded-full px-1.5 py-0.2">
                  2
                </span>
              </button>
              <button
                onClick={() => setActiveTab('status')}
                className={`flex-1 pb-2 flex items-center justify-center border-b-2 ${
                  activeTab === 'status'
                    ? 'border-[#00a884] text-[#00a884]'
                    : 'border-transparent hover:text-white'
                }`}
              >
                <span>Updates</span>
              </button>
              <button
                onClick={() => setActiveTab('calls')}
                className={`flex-1 pb-2 flex items-center justify-center border-b-2 ${
                  activeTab === 'calls'
                    ? 'border-[#00a884] text-[#00a884]'
                    : 'border-transparent hover:text-white'
                }`}
              >
                <span>Calls</span>
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto scrollbar-none">
            {activeTab === 'chats' && (
              <div className="divide-y divide-white/5">
                {threads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => {
                      setSelectedChatId(thread.id);
                      // Clear unread
                      setThreads((prev) =>
                        prev.map((t) => (t.id === thread.id ? { ...t, unreadCount: 0 } : t))
                      );
                    }}
                    className="p-3.5 flex items-center justify-between gap-3 hover:bg-[#202c33]/50 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-12 h-12 rounded-full bg-gradient-to-tr ${thread.avatarBg} flex items-center justify-center text-white text-base font-bold shrink-0 shadow`}
                      >
                        {thread.isGroup ? <Users size={20} /> : thread.name[0]}
                      </div>
                      <div className="overflow-hidden">
                        <h3 className="text-xs font-bold text-white truncate">{thread.name}</h3>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">
                          {thread.lastMessage}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[10px] text-slate-500 font-mono">{thread.time}</span>
                      {Boolean(thread.unreadCount) && (
                        <span className="w-4 h-4 rounded-full bg-[#00a884] text-black font-bold text-[9px] flex items-center justify-center shadow">
                          {thread.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'status' && (
              <div className="p-4 space-y-4 text-xs">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center text-white border-2 border-dashed border-emerald-500">
                    <User size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">My status</h4>
                    <span className="text-slate-400 text-[11px]">Tap to add status update</span>
                  </div>
                </div>

                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block pt-2">
                  Recent updates
                </span>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-600 p-0.5">
                    <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Alex (Kernel Dev)</h4>
                    <span className="text-slate-400 text-[11px]">34 minutes ago</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'calls' && (
              <div className="p-4 space-y-3 text-xs">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Recent Calls
                </span>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                      A
                    </div>
                    <div>
                      <h4 className="font-bold text-white">Alex (Kernel Dev)</h4>
                      <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                        Incoming • Today at 10:12 AM
                      </span>
                    </div>
                  </div>
                  <Phone size={16} className="text-emerald-400 cursor-pointer" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
