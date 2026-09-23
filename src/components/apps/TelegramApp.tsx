import React, { useState } from 'react';
import { useEmulator } from '../../context/EmulatorContext';
import {
  Send,
  Search,
  Menu,
  MoreVertical,
  Paperclip,
  Smile,
  ArrowLeft,
  CheckCheck,
  Radio,
  Sparkles,
} from 'lucide-react';

export const TelegramApp: React.FC = () => {
  const { showToast, addLogcat } = useEmulator();

  const [selectedChannel, setSelectedChannel] = useState<string | null>(null);
  const [msgInput, setMsgInput] = useState<string>('');

  const [channels, setChannels] = useState([
    {
      id: 'magisk_channel',
      name: 'Magisk Official Updates',
      avatarBg: 'from-amber-500 to-red-600',
      subs: '450,210 subscribers',
      lastMsg: 'Magisk v27.0 release candidate is now available for Android 14 API 34!',
      time: '12:04 PM',
      messages: [
        {
          id: '1',
          sender: 'channel',
          text: 'Magisk v27.0 release candidate is now available for Android 14 API 34! Full Zygisk support and 16KB page alignment included.',
          time: '12:04 PM',
        },
      ],
    },
    {
      id: 'android_dev',
      name: 'Android 14 Power Users',
      avatarBg: 'from-sky-500 to-blue-700',
      subs: '128,400 members',
      lastMsg: 'Check out the new Play Integrity bypass modules for Magisk.',
      time: '10:30 AM',
      messages: [
        {
          id: '1',
          sender: 'channel',
          text: 'Check out the new Play Integrity bypass modules for Magisk.',
          time: '10:30 AM',
        },
      ],
    },
  ]);

  const activeChannel = channels.find((c) => c.id === selectedChannel);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!msgInput.trim() || !selectedChannel) return;

    const text = msgInput.trim();
    setMsgInput('');

    const newMsg = {
      id: String(Date.now()),
      sender: 'me',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChannels((prev) =>
      prev.map((c) => {
        if (c.id === selectedChannel) {
          return {
            ...c,
            lastMsg: text,
            messages: [...c.messages, newMsg],
          };
        }
        return c;
      })
    );

    addLogcat('I', 'Telegram', `Sent message to ${activeChannel?.name}: "${text}"`);
    showToast('Message sent');
  };

  return (
    <div className="w-full h-full bg-[#17212b] text-white flex flex-col font-sans select-none overflow-hidden">
      {selectedChannel && activeChannel ? (
        <div className="flex-1 flex flex-col h-full bg-[#0e1621]">
          {/* Channel Header */}
          <div className="bg-[#17212b] px-3 py-2.5 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setSelectedChannel(null)}
                className="p-1 -ml-1 text-slate-300 hover:text-white"
              >
                <ArrowLeft size={18} />
              </button>
              <div
                className={`w-9 h-9 rounded-full bg-gradient-to-tr ${activeChannel.avatarBg} flex items-center justify-center font-bold text-xs shadow`}
              >
                {activeChannel.name[0]}
              </div>
              <div>
                <h3 className="text-xs font-bold text-white truncate max-w-[170px]">
                  {activeChannel.name}
                </h3>
                <span className="text-[10px] text-sky-400 block">{activeChannel.subs}</span>
              </div>
            </div>
            <MoreVertical size={18} className="text-slate-400" />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-none">
            {activeChannel.messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'me' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-xs shadow ${
                    m.sender === 'me' ? 'bg-[#2b5278] text-white' : 'bg-[#182533] text-slate-200'
                  }`}
                >
                  <p className="leading-relaxed">{m.text}</p>
                  <div className="flex justify-end gap-1 mt-1 text-[9px] text-slate-400">
                    <span>{m.time}</span>
                    {m.sender === 'me' && <CheckCheck size={12} className="text-sky-400 inline" />}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Message Bar */}
          <form
            onSubmit={handleSend}
            className="p-2 bg-[#17212b] flex items-center gap-2 border-t border-white/5"
          >
            <Smile size={18} className="text-slate-400 cursor-pointer" />
            <input
              type="text"
              placeholder="Broadcast or comment..."
              value={msgInput}
              onChange={(e) => setMsgInput(e.target.value)}
              className="bg-transparent text-xs text-white placeholder-slate-400 focus:outline-none flex-1"
            />
            <Paperclip size={18} className="text-slate-400 cursor-pointer" />
            <button
              type="submit"
              className="w-8 h-8 rounded-full bg-sky-500 text-white flex items-center justify-center hover:bg-sky-400"
            >
              <Send size={14} className="-ml-0.5" />
            </button>
          </form>
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full">
          {/* Header */}
          <div className="bg-[#17212b] px-4 py-3 flex items-center justify-between border-b border-white/5">
            <div className="flex items-center gap-3">
              <Menu size={18} className="text-slate-300" />
              <h1 className="text-sm font-bold text-white tracking-wide">Telegram</h1>
            </div>
            <Search size={18} className="text-slate-300" />
          </div>

          {/* Channels List */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-none">
            {channels.map((chan) => (
              <div
                key={chan.id}
                onClick={() => setSelectedChannel(chan.id)}
                className="p-3.5 flex items-center gap-3 hover:bg-[#202b36] cursor-pointer transition-colors"
              >
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-tr ${chan.avatarBg} flex items-center justify-center font-bold text-white text-base shadow shrink-0`}
                >
                  {chan.name[0]}
                </div>
                <div className="overflow-hidden flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-white truncate">{chan.name}</h3>
                    <span className="text-[10px] text-slate-500 font-mono">{chan.time}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{chan.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
