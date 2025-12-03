import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function MessageComponents() {
  const { user } = useAuth();
  const [selectedChat, setSelectedChat] = useState(null);
  const [messageInput, setMessageInput] = useState('');

  // Mock conversation data
  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      initials: 'SC',
      lastMessage: 'Hey! I saw your AI project, looks interesting!',
      timestamp: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      initials: 'MR',
      lastMessage: 'Would love to collaborate on the mobile app',
      timestamp: '15m ago',
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: 'Emily Watson',
      initials: 'EW',
      lastMessage: 'Thanks for the feedback on my blockchain project!',
      timestamp: '1h ago',
      unread: 1,
      online: false
    },
    {
      id: 4,
      name: 'Alex Johnson',
      initials: 'AJ',
      lastMessage: 'Let\'s schedule a meeting to discuss the requirements',
      timestamp: '3h ago',
      unread: 0,
      online: false
    },
    {
      id: 5,
      name: 'Jordan Lee',
      initials: 'JL',
      lastMessage: 'I can help with the backend development',
      timestamp: '1d ago',
      unread: 0,
      online: false
    }
  ];

  // Mock messages for selected chat
  const mockMessages = {
    1: [
      { id: 1, sender: 'Sarah Chen', content: 'Hey! I saw your AI project, looks interesting!', timestamp: '10:30 AM', isMe: false },
      { id: 2, sender: 'You', content: 'Thanks! Are you interested in joining?', timestamp: '10:32 AM', isMe: true },
      { id: 3, sender: 'Sarah Chen', content: 'Yes! I have experience with TensorFlow and would love to contribute', timestamp: '10:35 AM', isMe: false },
      { id: 4, sender: 'You', content: 'That\'s perfect! Let me share the project details with you', timestamp: '10:37 AM', isMe: true },
    ],
    2: [
      { id: 1, sender: 'Michael Rodriguez', content: 'Would love to collaborate on the mobile app', timestamp: '9:45 AM', isMe: false },
      { id: 2, sender: 'You', content: 'Great! What\'s your experience with React Native?', timestamp: '9:50 AM', isMe: true },
    ],
    3: [
      { id: 1, sender: 'Emily Watson', content: 'Thanks for the feedback on my blockchain project!', timestamp: 'Yesterday', isMe: false },
    ],
    4: [
      { id: 1, sender: 'Alex Johnson', content: 'Let\'s schedule a meeting to discuss the requirements', timestamp: 'Yesterday', isMe: false },
    ],
    5: [
      { id: 1, sender: 'Jordan Lee', content: 'I can help with the backend development', timestamp: '2 days ago', isMe: false },
    ]
  };

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedChat) {
      // Handle send message logic here
      console.log('Sending message:', messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] bg-gray-50"
    style={{
        background: "linear-gradient(180deg,rgb(255, 255, 255) 50%, #887cd0 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto h-full">
        <div className="flex h-full">
          {/* Sidebar - Conversations List */}
          <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search conversations..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#887cd0] focus:border-transparent"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {conversations.map((conversation) => (
                <button
                  key={conversation.id}
                  onClick={() => setSelectedChat(conversation.id)}
                  className={`w-full p-4 flex items-start gap-3 hover:bg-gray-50 transition-colors border-b border-gray-100 ${
                    selectedChat === conversation.id ? 'bg-purple-50' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white font-semibold">
                      {conversation.initials}
                    </div>
                    {conversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  {/* Conversation Info */}
                  <div className="flex-1 min-w-0 text-left">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {conversation.name}
                      </h3>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {conversation.timestamp}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-gray-600 truncate">
                        {conversation.lastMessage}
                      </p>
                      {conversation.unread > 0 && (
                        <span className="flex-shrink-0 ml-2 w-5 h-5 bg-[#887cd0] text-white text-xs rounded-full flex items-center justify-center">
                          {conversation.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col bg-gray-50">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="bg-white border-b border-gray-200 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#887cd0] to-[#a396e0] flex items-center justify-center text-white font-semibold">
                          {conversations.find(c => c.id === selectedChat)?.initials}
                        </div>
                        {conversations.find(c => c.id === selectedChat)?.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div>
                        <h2 className="font-semibold text-gray-900">
                          {conversations.find(c => c.id === selectedChat)?.name}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {conversations.find(c => c.id === selectedChat)?.online ? 'Online' : 'Offline'}
                        </p>
                      </div>
                    </div>
                    <button className="text-gray-400 hover:text-gray-600">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {mockMessages[selectedChat]?.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isMe ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] ${
                          message.isMe
                            ? 'bg-[#887cd0] text-white'
                            : 'bg-white text-gray-900'
                        } rounded-lg p-3 shadow-sm`}
                      >
                        {!message.isMe && (
                          <p className="text-xs font-semibold mb-1 text-[#887cd0]">
                            {message.sender}
                          </p>
                        )}
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.isMe ? 'text-white/70' : 'text-gray-500'
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="bg-white border-t border-gray-200 p-4">
                  <div className="flex items-end gap-2">
                    <div className="flex-1">
                      <textarea
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type a message..."
                        rows="1"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#887cd0] focus:border-transparent resize-none"
                      />
                    </div>
                    <button
                      onClick={handleSendMessage}
                      disabled={!messageInput.trim()}
                      className="bg-[#887cd0] hover:bg-[#a396e0] text-white p-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-r from-[#887cd0] to-[#a396e0] rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-gray-600">
                    Choose a conversation from the sidebar to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
