import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function MessageComponents() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  // Mock conversation data
  const conversations = [
    { id: 1, name: 'Sarah Chen', initials: 'SC', lastMessage: 'Hey! I saw your AI project...', timestamp: '2m ago', unread: 2, online: true },
    { id: 2, name: 'Michael Rodriguez', initials: 'MR', lastMessage: 'Would love to collaborate...', timestamp: '15m ago', unread: 0, online: true },
    { id: 3, name: 'Emily Watson', initials: 'EW', lastMessage: 'Thanks for the feedback!', timestamp: '1h ago', unread: 1, online: false },
  ];

  const mockMessages = {
    1: [
      { id: 1, sender: 'Sarah Chen', content: 'Hey! I saw your AI project, looks interesting!', timestamp: '10:30 AM', isMe: false },
      { id: 2, sender: 'You', content: 'Thanks! Are you interested in joining?', timestamp: '10:32 AM', isMe: true },
    ],
    // ... add others as needed
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      setMessageInput('');
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col lg:p-6"
      style={{ background: "linear-gradient(180deg, #ffffff 50%, #887cd0 100%)" }}
    >
      <div className="max-w-7xl mx-auto w-full h-full bg-white/70 backdrop-blur-xl lg:rounded-[2.5rem] lg:shadow-2xl lg:border border-white/40 overflow-hidden flex">
        
        {/* --- SIDEBAR: List of Conversations --- */}
        {/* Hidden on mobile when a chat is selected */}
        <div className={`${selectedChat ? 'hidden' : 'flex'} lg:flex w-full lg:w-96 flex-col border-r border-gray-100 bg-white/50`}>
          <div className="p-6">
            <h1 className="text-2xl font-black text-gray-900 mb-6 tracking-tight">Messages</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100/50 border-none rounded-2xl px-5 py-3 focus:ring-2 focus:ring-[#887cd0]/20 transition-all"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-2 pb-20 lg:pb-0">
            {conversations.map((conv) => (
              <button
                key={conv.id}
                onClick={() => setSelectedChat(conv.id)}
                className={`w-full p-4 flex items-center gap-4 rounded-3xl transition-all duration-300 mb-1 ${
                  selectedChat === conv.id ? 'bg-[#887cd0] text-white shadow-lg' : 'hover:bg-gray-100 text-gray-900'
                }`}
              >
                <div className="relative flex-shrink-0">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg ${
                    selectedChat === conv.id ? 'bg-white/20' : 'bg-gradient-to-tr from-[#887cd0] to-[#a396e0] text-white'
                  }`}>
                    {conv.initials}
                  </div>
                  {conv.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-4 border-white"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0 text-left">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold truncate">{conv.name}</h3>
                    <span className={`text-[10px] uppercase font-black opacity-60 ${selectedChat === conv.id ? 'text-white' : 'text-gray-400'}`}>
                      {conv.timestamp}
                    </span>
                  </div>
                  <p className={`text-sm truncate opacity-80 ${selectedChat === conv.id ? 'text-white' : 'text-gray-500'}`}>
                    {conv.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* --- MAIN CHAT AREA --- */}
        {/* Full width on mobile when selected */}
        <div className={`${!selectedChat ? 'hidden' : 'flex'} lg:flex flex-1 flex-col bg-white/30`}>
          {selectedChat ? (
            <>
              {/* Chat Header */}
              <div className="p-4 lg:p-6 border-b border-gray-100 bg-white/80 backdrop-blur-md flex items-center gap-4">
                <button onClick={() => setSelectedChat(null)} className="lg:hidden p-2 -ml-2">
                  <svg className="w-6 h-6 text-[#887cd0]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white font-black text-sm">
                  {conversations.find(c => c.id === selectedChat)?.initials}
                </div>
                <div className="flex-1">
                  <h2 className="font-black text-gray-900 leading-none">
                    {conversations.find(c => c.id === selectedChat)?.name}
                  </h2>
                  <span className="text-[10px] font-bold text-green-500 uppercase tracking-widest">Online</span>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {mockMessages[selectedChat]?.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2`}>
                    <div className={`max-w-[85%] sm:max-w-[70%] p-4 rounded-[1.5rem] shadow-sm ${
                      msg.isMe ? 'bg-[#887cd0] text-white rounded-tr-none' : 'bg-white text-gray-900 rounded-tl-none border border-gray-100'
                    }`}>
                      <p className="text-sm font-medium leading-relaxed">{msg.content}</p>
                      <p className={`text-[9px] mt-2 font-black uppercase opacity-50 ${msg.isMe ? 'text-white' : 'text-gray-400'}`}>
                        {msg.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="p-4 lg:p-6 bg-white/80 backdrop-blur-md border-t border-gray-100">
                <div className="flex items-center gap-3 bg-gray-100 rounded-[2rem] p-2 pl-5 transition-all focus-within:ring-2 focus-within:ring-[#887cd0]/20">
                  <input
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 bg-transparent border-none focus:ring-0 text-sm py-2"
                  />
                  <button onClick={handleSendMessage} className="bg-[#887cd0] hover:bg-gray-900 text-white p-3 rounded-full transition-all active:scale-90">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden lg:flex flex-1 items-center justify-center text-center">
              <div>
                <div className="w-20 h-20 bg-gray-100 rounded-[2rem] flex items-center justify-center mx-auto mb-4 text-[#887cd0]">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-black text-gray-900">Select a connection</h2>
                <p className="text-gray-400 text-sm">Pick a collaborator to start syncing skills.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}